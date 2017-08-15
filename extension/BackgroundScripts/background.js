const createGroceryList = (recipe, ingredients) => {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/api/recipes/',
    data: {
      isFromChromeExt: true,
      user: { name: 'tim', email: 'tim@tim.com', password: 'tim' },
      recipe,
      ingredients,
    },
  });
};

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'createGroceryList') {
    createGroceryList(request.recipe, request.ingredients);
  }
});
