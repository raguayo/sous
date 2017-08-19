const createGroceryList = (recipe, ingredients, inGroceryList) => {
  console.log('Background: ', inGroceryList)
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/api/recipes/',
    data: {
      isFromChromeExt: true,
      inGroceryList,
      recipe,
      ingredients,
    },
  });
  // error handling
};

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'createGroceryList') {
    createGroceryList(request.recipe, request.dbIngredients, request.inGroceryList);
    // send response back to popup if successful
    // error handling
  }
});
