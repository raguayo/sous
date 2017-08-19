const styles = {
  headerStyle: {
    marginTop: '0.857143em',
    marginLeft: '0.857143em',
  },
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;
  chrome.tabs.sendMessage(tabId, { greeting: 'Yo!' }, (response) => {
    let htmlString = `<div class="my-container">
    <div class="topnav" id="myTopnav">
      <p id="logo">sous</p>
    </div>
    <h3 style="margin: 0.857143em 0.857143em">Recipe Details:</h3>
    <table class="ui definition table unstackable">
    <tbody>
      <tr>
        <td class="four wide">Title:</td>
        <td>${response.recipe.title}</td>
      </tr>
      <tr>
        <td class="four wide">Author:</td>
        <td>${response.recipe.author}</td>
      </tr>
      <tr>
        <td class="four wide">Servings:</td>
        <td>${response.recipe.numServings}</td>
      </tr>
  </tbody>
  </table>
  <h3 style="margin: 0.857143em 0.857143em">Ingredients:</h3>
  <table class="ui table unstackable">
    <thead>
      <tr>
        <th colspan="2">Quantity</th>
        <th class="eight wide">Name</th>
      </tr>
    </thead>
    <tbody>`;

    const errorArr = [];

    response.userIngredients.forEach((ingObj) => {
      if (ingObj.name) {
        const ingHTML = `<tr>
        <td class="one wide">${ingObj.quantity}</td>
        <td class="one wide">${ingObj.unit}</td>
        <td>${ingObj.name}</td>
      </tr>`;
        htmlString += ingHTML;
      } else {
        errorArr.push(ingObj.sentence);
      }
    });

    htmlString += '</tbody></table>';

    if (errorArr.length) {
      htmlString += `<h5 style="margin: 0.857143em 0.857143em">We couldn't find these items in our databse:</h5>
      <table class="ui table unstackable">
      <thead>
      <tr>
        <th colspan="2" class="center aligned">Quantity</th>
        <th class="eight wide">Name</th>
      </tr>
      </thead>
      <tbody>`;
      errorArr.forEach((errorObj) => htmlString += `<tr>
        <td class="one wide">${errorObj.quantity}</td>
        <td class="one wide">${errorObj.unit}</td>
        <td>${errorObj.name}</td>
      </tr>`);
      htmlString += '</tbody></table>';
    }

    // const buttonHtml = '<button style="margin: 0.857143em 0.857143em" type="button" id="btnSendRecipe" name="btnSendRecipe">Send Recipe to Sous</button></table>';
    const buttonHtml = `<div id="button-footer">
    <div class="ui buttons">
      <button class="ui button" id="my-button">Save Recipe</button>
      <div class="or"></div>
      <button class="ui button" id="my-button">Add It To Your Grocery List</button>
    </div>
  </div>`;


    htmlString += buttonHtml;

    htmlString += '</div>';

    $('body').append(htmlString);

    $('#btnSendRecipe').click(() => {
      response.msg = 'createGroceryList';
      chrome.extension.sendMessage(response);
    });
  });
});
