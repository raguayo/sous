/* global chrome $ */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'createGroceryList') {
    // $.ajax('https://drsous.herokuapp.com/api/recipes/chrome', {
    $.ajax('http://localhost:8080/api/recipes/chrome', {
      type: 'POST',
      data: {
        isFromChromeExt: true,
        inGroceryList: request.inGroceryList,
        recipe: request.recipe,
        ingredients: request.recipe.extendedIngredients,
      },
    })
      .done((response) => {
        chrome.tabs.query({ title: 'Sous' }, (tab) => {
          chrome.tabs.reload(tab[0].id, () => sendResponse(response));
        });
      })
      .fail((response) => {
        sendResponse(response);
      });
    return true;
  } else if (request.msg === 'getRecipeDetails') {
    const formattedUrl = request.recipeUrl.replace(':', '%3A').split('/').join('%2F');
    // $.ajax(`https://drsous.herokuapp.com/api/recipes/${formattedUrl}`, {
    $.ajax(`http://localhost:8080/api/recipes/${formattedUrl}`, {
      method: 'GET',
    })
      .done((response) => {
        sendResponse(response);
      })
      .fail((response) => {
        sendResponse(response);
      });
    return true;
  }
});
