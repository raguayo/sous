const styles = {
  headerStyle: {
    marginTop: '0.857143em',
    marginLeft: '0.857143em',
  },
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const recipeUrl = tabs[0].url;
  chrome.runtime.sendMessage({ recipeUrl, msg: 'getRecipeDetails' }, (recipe) => {
    let htmlString = '';
    if (recipe.extendedIngredients) {
      htmlString = `
      <h3 style="margin: 0.857143em 0.857143em">Recipe Details:</h3>
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
    <h3 style="margin: 0.857143em 0.857143em">Ingredients:</h3>
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
    } else {
      htmlString = `
      <h3 style="margin: 0.857143em 0.857143em">Recipe Details:</h3>
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
    <h3 style="margin: 0.857143em 0.857143em">Ingredients:</h3>
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
      $('#ingredients-table').after(`<div class="ui segment" id="submit-loader">
              <div class="ui active inverted dimmer">
                <div class="ui text loader">Loading</div>
              </div>
            </div>`);
      chrome.extension.sendMessage({ msg: 'createGroceryList', recipe, inGroceryList: false }, (response) => {
        $('#submit-loader').hide();
        if (response.status === 'Created') $('#ingredients-table').after('<div class="ui message" display="block"><h5>Your recipe was saved!</h5></div>');
        else $('#ingredients-table').after('<div class="ui message" display="block"><h5>Well, this is embarassing. Something went wrong when trying to save your recipe!</h5></div>');
      });
    });

    $('#glistBtn').click(() => {
      $('#ingredients-table').after(`<div class="ui segment" id="submit-loader">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
      </div>`);
      chrome.extension.sendMessage({ msg: 'createGroceryList', recipe, inGroceryList: true }, (response) => {
        $('#submit-loader').hide();
        if (response.status === 'Created') $('#ingredients-table').after('<div class="ui message" display="block"><h5>Your recipe was added!</h5></div>');
        else $('#ingredients-table').after('<div class="ui message" display="block"><h5>Well, this is embarassing. Something went wrong when trying to add your recipe!</h5></div>');
      });
    });
    // wait to close the popup until recieves a success response
    // handle error
  });
});
