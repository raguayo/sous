const createGroceryList = (recipe, ingredients) => {
  console.log('createGroceryList in background.js - recipe: ', recipe);
  console.log('createGroceryList in background.js - ingredients: ', ingredients);
  // alert('Success - in createGroceryList function on background.js!');
  // ../../server/api/
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/api/recipes/',
    data: {
      isFromChromeExt: true,
      user: { name: 'tim', email: 'tim@tim.tim', password: 'tim' },
      recipe,
      ingredients,
    },
  });
};

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'createGroceryList') {
    // console.log('in onMessage addListener of background.js - request: ', request);
    createGroceryList(request.recipe, request.ingredients);
  }
});
