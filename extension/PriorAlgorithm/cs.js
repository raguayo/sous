// console.log('content script ran')

// document.addEventListener('DOMContentLoaded', () => {
//   const author = document.getElementsByClassName('submitter__name')[0].textContent;
//   const title = document.getElementsByClassName('recipe-summary__h1')[0].textContent;
//   const recipeUrl = document.URL;
//   const imageUrl = document.getElementsByClassName('rec-photo')[0].currentSrc;
//   const siteName = 'All Recipes';
//   const ingredientElements = document.getElementsByClassName('recipe-ingred_txt');
//   const [dbIngredients, userIngredients ] = parseIngredientElements(ingredientElements);

//   const servingsEl = document.querySelector('[ng-bind="adjustedServings"]');
//   const observer = new MutationObserver((mutations) => {
//     const numServings = +document.querySelector('[ng-bind="adjustedServings"]').textContent;
//     const recipeObj = {
//       title, author, recipeUrl, imageUrl, siteName, numServings,
//     };
//     chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
//       sendResponse({ recipe: recipeObj, dbIngredients, userIngredients });
//     });
//   });
//   const config = { attributes: true, childList: true, characterData: true };
//   observer.observe(servingsEl, config);
// })
