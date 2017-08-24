// const createGroceryList = (recipe, ingredients, inGroceryList) => {
//   console.log('In create groc list')
//   return $.ajax({
//     type: 'POST',
//     url: 'http://localhost:8080/api/recipes/',
//     data: {
//       isFromChromeExt: true,
//       inGroceryList,
//       recipe,
//       ingredients,
//     },
//   })
//   .done(res => res)
//   .fail(console.error);
//   // error handling
// };

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'createGroceryList') {
    // const message = createGroceryList(request.recipe, request.recipe.extendedIngredients, request.inGroceryList);
    // send response back to popup if successful
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/recipes/',
      data: {
        isFromChromeExt: true,
        inGroceryList: request.inGroceryList,
        recipe: request.recipe,
        ingredients: request.recipe.extendedIngredients,
      },
    })
      .done((response) => {
        chrome.tabs.query({ title: 'Raww' }, function (tab) {
          console.log('Tabs: ', tab)
          chrome.tabs.reload(tab[0].id, () => sendResponse({ status: response }));
        });
      })
      .fail((response) => {
        sendResponse(response);
      });
    return true;
  } else if (request.msg === 'getRecipeDetails') {
    const formattedUrl = request.recipeUrl.replace(':', '%3A').split('/').join('%2F');
    $.ajax({
      method: 'GET',
      url: `http://localhost:8080/api/recipes/${formattedUrl}`,
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
