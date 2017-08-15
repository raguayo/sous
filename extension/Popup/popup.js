chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const tabId = tabs[0].id;
  chrome.tabs.sendMessage(tabId, { greeting: "hello" }, response => {
    let htmlString = `<h5>Recipe Details:</h5>
      <div class="ui grid">
        <div class="row">
          <div class="eight wide column"><p>Title:</p></div>
          <div class="eight wide column"><p>${response.recipe.title}</p></div>
        </div>
        <div class="row">
          <div class="eight wide column"><p>Author:</p></div>
          <div class="eight wide column"><p>${response.recipe.author}</p></div>
        </div>
        <div class="row">
          <div class="eight wide column"><p>Recipe Url:</p></div>
          <div class="eight wide column"><p>${response.recipe.recipeUrl}</p></div>
        </div>
        <div class="row">
          <div class="eight wide column"><p>Number of Servings:</p></div>
          <div class="eight wide column"><p>${response.recipe.numServings}</p></div>
        </div>
      </div>
      <h5>Ingredients:</h5>
      <div class="ui grid">
        <div class="row">
          <div class="six wide column"><p>Ingredient Name</p></div>
          <div class="four wide column"><p>Quantity</p></div>
          <div class="four wide column"><p>Unit</p></div>
        </div>`;

    response.ingredients.forEach((ingObj) => {
      const ingHTML = `<div class="row">
          <div class="six wide column"><p>${ingObj.name}</p></div>
          <div class="four wide column"><p>${ingObj.quantity}</p></div>
          <div class="four wide column"><p>${ingObj.unit}</p></div>
          <div class="two wide column"><i class="remove icon"></i></div>
        </div>`;
      htmlString += ingHTML;
    });

    // const buttonHtml = '<button type"button">Send Recipe to Sous</button>';
    const buttonHtml = '<button type="button" id="btnSendRecipe" name="btnSendRecipe">Send Recipe to Sous</button></div>';
    htmlString += buttonHtml;

    htmlString += '</div>';

    $('body').append(htmlString);

    $('#btnSendRecipe').click(() => {
      response.msg = 'createGroceryList';
      chrome.extension.sendMessage(response);
    });
  });
});
