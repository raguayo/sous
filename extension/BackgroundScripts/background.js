const createGroceryList = (recipe, ingredients, inGroceryList) => {
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'createGroceryList') {
    createGroceryList(request.recipe, request.dbIngredients, request.inGroceryList);
    // send response back to popup if successful
    // error handling
  } else if (request.msg === 'getRecipeDetails') {
    const formattedUrl = request.recipeUrl.replace(':', '%3A').replace('/', '%2F');
    $.ajax({
      method: 'GET',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=false&url=${formattedUrl}`,
      headers: { 'X-Mashape-Key': 'YyZySSmshzmshUvFJgXCNd0oeM57p11ZPWNjsns9qV945YLMWs' },
    })
    .done((response) => {
      sendResponse(response);
    })
    .fail((response) => {
      console.log('In fail', response);
      sendResponse(response);
    });
    return true;
  }
});
