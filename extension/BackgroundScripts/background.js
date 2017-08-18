const createGroceryList = (recipe, ingredients) => {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/api/recipes/',
    data: {
      isFromChromeExt: true,
      recipe,
      ingredients,
    },
  });
  // error handling
};

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'createGroceryList') {
    createGroceryList(request.recipe, request.dbIngredients);
  }
});
