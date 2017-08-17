const styles = {
  headerStyle: {
    marginTop: '0.857143em',
    marginLeft: '0.857143em',
  },
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;
  chrome.tabs.sendMessage(tabId, { greeting: 'Yo!' }, (response) => {
    let htmlString = `<div>
      <h3 style="margin: 0.857143em 0.857143em">Recipe Details:</h3>
      <table class="ui table" style="table-layout: fixed">
        <tr>
          <td >Title: &emsp;${response.recipe.title}</td>
        </tr>
        <tr>
          <td>Author: &emsp;${response.recipe.author}</td>
        </tr>
         <tr>
          <td>Number of Servings: &emsp;${response.recipe.numServings}</td>
        </tr>
      </table>
      <h3 style="margin: 0.857143em 0.857143em">Ingredients:</h3>
      <table class="ui grid altrowstable" id="alternatecolor" style="margin: 0.857143em 0.857143em; box-shadow: 1px 1px 1px #999;">
        <thead style="display:table-header-group">
          <tr>
            <th style="padding:1em; width='100%';align:'center';"><p>Ingredient Name</p></th>
            <th style="padding:1em; width='100%'; align:'center';"><p>Quantity</p></th>
            <th style="padding:1em; width='100%'; align:'center';"><p>Unit</p></th>
          </tr>
        </thead>
        <tbody>`;

    response.ingredients.forEach((ingObj) => {
      const ingHTML = `<tr style="margin: 0.857143em 0.857143em">
          <td style="padding:1em; width='100%'; align='center';"><p>${ingObj.name}</p></td>
          <td style="padding:1em; width='100%'; align='center';"><p>${ingObj.quantity}</p></td>
          <td style="padding:1em; width='100%'; align='center';"><p>${ingObj.unit}</p></td>
        </tr>`;
      htmlString += ingHTML;
    });

    htmlString += '</tbody></table>';

    // const buttonHtml = '<button type"button">Send Recipe to Sous</button>';
    const buttonHtml = '<button style="margin: 0.857143em 0.857143em" type="button" id="btnSendRecipe" name="btnSendRecipe">Send Recipe to Sous</button></table>';
    htmlString += buttonHtml;

    htmlString += '</div>';

    $('body').append(htmlString);

    $('#btnSendRecipe').click(() => {
      response.msg = 'createGroceryList';
      chrome.extension.sendMessage(response);
    });

    // $(document).ready(() => {
    //   $('tr:odd').css('background-color', '#E5E7E9');
    // });
  });
});
