const styles = {
  headerStyle: {
    marginTop: '0.857143em',
    marginLeft: '0.857143em',
  },
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;
  chrome.tabs.sendMessage(tabId, { greeting: 'Yo!' }, (response) => {
    let htmlString = `
      <h3 style="margin: 0.857143em 0.857143em">Recipe Details:</h3>
      <table class="ui table" style="table-layout: fixed">
        <tr>
          <td>Title: &emsp;${response.recipe.title}</td>
        </tr>
        <tr>
          <td>Author: &emsp;${response.recipe.author}</td>
        </tr>
         <tr>
          <td>Number of Servings: &emsp;${response.recipe.numServings}</td>
        </tr>
      </table>
      <h3 style="margin: 0.857143em 0.857143em">Ingredients:</h3>
      <div class="ui grid" style="margin: 0.857143em 0.857143em">
        <div class="row" style="margin: 0.857143em 0.857143em">
          <div class="six wide column"><p>Ingredient Name</p></div>
          <div class="four wide column"><p>Quantity</p></div>
          <div class="four wide column"><p>Unit</p></div>
        </div>`;

    response.ingredients.forEach((ingObj) => {
      const ingHTML = `<div class="row" style="margin: 0.857143em 0.857143em">
          <div class="six wide column"><p>${ingObj.name}</p></div>
          <div class="four wide column"><p>${ingObj.quantity}</p></div>
          <div class="four wide column"><p>${ingObj.unit}</p></div>
        </div>`;
      htmlString += ingHTML;
    });

    // const buttonHtml = '<button type"button">Send Recipe to Sous</button>';
    const buttonHtml = '<button style="margin: 0.857143em 0.857143em" type="button" id="btnSendRecipe" name="btnSendRecipe">Send Recipe to Sous</button></div>';
    htmlString += buttonHtml;

    htmlString += '</div>';

    $('body').append(htmlString);

    $('#btnSendRecipe').click(() => {
      response.msg = 'createGroceryList';
      chrome.extension.sendMessage(response);
    });
  });
});
