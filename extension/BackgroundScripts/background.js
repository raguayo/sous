const createGroceryList = (recipes, ingredients) => {
  console.log('recipes: ', recipes);
  console.log('ingredients: ', ingredients);
  alert('Success - in createGroceryList function on background.js!');
};

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'createGroceryList') {
    console.log('request: ', request);
    createGroceryList(request.recipes, request.ingredients);
  }
});
