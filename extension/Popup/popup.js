// import { Container, Grid, Header, Segment, Button, Icon, Input, Form } from 'semantic-ui-react';

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;
  chrome.tabs.sendMessage(tabId, { greeting: 'hello' }, (response) => {
    let htmlString =
     `
     <h5>Recipe Details:</h5>
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

      <h5>Recipe Details:</h5>

      <h5>Ingredients:</h5>

      <table class="ui table">
        <thead>
          <tr>
            <th>Ingredient Name</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>


    response.ingredients.forEach((ingObj) => {
      const ingHTML = `
          <div>
            <tbody>
              <td>${ingObj.name}</td>
              <td>${ingObj.quantity}</td>
              <td>${ingObj.unit}</td>
              <td><i class="remove icon"></i></td>
            </tbody>
          </div>`;

      htmlString += ingHTML + '</table>';
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
