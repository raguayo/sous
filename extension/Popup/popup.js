const styles = {
  headerStyle: {
    marginTop: '0.857143em',
    marginLeft: '0.857143em',
  },
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const recipeUrl = tabs[0].url;
  chrome.runtime.sendMessage({ recipeUrl, msg: 'getRecipeDetails' }, (recipe) => {
    let htmlString = `<div class="my-container">
    <div class="topnav" id="myTopnav">
      <p id="logo">sous</p>
    </div>
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
  <table class="ui table unstackable">
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

    htmlString += '</tbody></table>';

    const buttonHtml = `<div id="button-footer">
    <div class="ui buttons my-button-wrapper">
      <button class="ui button my-button" id="saveBtn">Save Recipe</button>
      <div class="or"></div>
      <button class="ui button my-button" id="glistBtn">Add It To Your Grocery List</button>
    </div>
  </div>`;


    htmlString += buttonHtml;

    htmlString += '</div>';

    $('body').append(htmlString);

    $('#saveBtn').click(() => {
      chrome.extension.sendMessage({ msg: 'createGroceryList', recipe, inGroceryList: false });
      window.close();
    });

    $('#glistBtn').click(() => {
      chrome.extension.sendMessage({ msg: 'createGroceryList', recipe, inGroceryList: true });
      window.close();
    });
    // wait to close the popup until recieves a success response
    // handle error
  });
});
