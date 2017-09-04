/* global chrome $ */

function handlePostResponse(response) {
  $('#submit-loader').hide();
  let htmlString = '<div class="ui message result-message">';
  if (response.groceryListRecipe) htmlString += '<h5>Your recipe was added!</h5>';
  else if (response.savedRecipe) htmlString += '<h5>Your recipe was saved!</h5>';
  else if (response.responseText === 'Validation error') htmlString += '<h5>You\'ve already added this recipe. Go to your profile page on Sous to add it to your grocery list.</h5>';
  else htmlString += '<h5>Well, this is embarassing. Something went wrong when trying to add your recipe!</h5>';
  htmlString += '</div>';
  $('#ingredients-table').after(htmlString);
}

function submitRecipe(recipe, inGroceryList) {
  $('#ingredients-table').after(`<div class="ui segment" id="submit-loader">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
      </div>`);
  chrome.extension.sendMessage({ msg: 'createGroceryList', recipe, inGroceryList }, (response) => {
    handlePostResponse(response);
  });
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const recipeUrl = tabs[0].url;
  chrome.runtime.sendMessage({ recipeUrl, msg: 'getRecipeDetails' }, (recipe) => {
    let htmlString = '';
    if (recipe && recipe.extendedIngredients && recipe.extendedIngredients.length) {
      htmlString = `
      <h3 class="myheader">Recipe Details:</h3>
      <table class="ui definition table unstackable">
      <tbody>
        <tr>
          <td class="four wide">Title:</td>
          <td>${recipe.title}</td>
        </tr>
        <tr>
          <td class="four wide">Servings:</td>
          <td>${recipe.servings}</td>
        </tr>
    </tbody>
    </table>
    <h3 class="myheader">Ingredients:</h3>
    <table class="ui table unstackable" id="ingredients-table">
      <thead>
        <tr>
          <th>Quantity</th>
          <th class="eight wide">Name</th>
        </tr>
      </thead>
      <tbody>`;

      recipe.extendedIngredients.forEach((ingObj) => {
        const ingHTML = `<tr>
          <td class="two wide">${ingObj.amount} ${ingObj.unit}</td>
          <td>${ingObj.name}</td>
        </tr>`;
        htmlString += ingHTML;
      });
    } else if (recipe && recipe.ingredients && recipe.ingredients.length) {
      htmlString = `
      <h3 class="myheader">Recipe Details:</h3>
      <table class="ui definition table unstackable">
      <tbody>
        <tr>
          <td class="four wide">Title:</td>
          <td>${recipe.title}</td>
        </tr>
        <tr>
          <td class="four wide">Servings:</td>
          <td>${recipe.numServings}</td>
        </tr>
    </tbody>
    </table>
    <h3 class="myheader">Ingredients:</h3>
    <table class="ui table unstackable" id="ingredients-table">
      <thead>
        <tr>
          <th>Quantity</th>
          <th class="eight wide">Name</th>
        </tr>
      </thead>
      <tbody>`;

      recipe.ingredients.forEach((ingObj) => {
        const ingHTML = `<tr>
          <td class="two wide">${ingObj.ingredientQuantity.quantity} ${ingObj.unitMeasure}</td>
          <td>${ingObj.name}</td>
        </tr>`;
        htmlString += ingHTML;
      });
    } else {
      $('#loader').hide();
      $('#wrapper').append('<h3 class="myheader">Woops! We couldn\'t scrape a recipe from this webpage. Please find a different recipe or re-open the popup to try again.</h3>');
      return;
    }

    htmlString += '</tbody></table>';

    const buttonHtml = `<div id="button-footer">
      <div class="ui buttons my-button-wrapper">
        <button class="ui button my-button" id="saveBtn">Save Recipe</button>
        <div class="or"></div>
        <button class="ui button my-button" id="glistBtn">Add It To Your Grocery List</button>
      </div>
    </div>`;


    htmlString += buttonHtml;

    $('#loader').hide();
    $('#wrapper').append(htmlString);

    $('#saveBtn').click(() => {
      submitRecipe(recipe, false);
    });

    $('#glistBtn').click(() => {
      submitRecipe(recipe, true);
    });
  });
});
