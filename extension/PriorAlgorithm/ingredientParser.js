// function findDatabaseMatch(searchTerm, dictionaryArr) {
//   const bestMatch = {
//     obj: null,
//     rating: 0,
//   };
//   for (let i = 0; i < dictionaryArr.length; i++) {
//     const currDBCandidate = dictionaryArr[i]
//     const dbWordArr = currDBCandidate.name.split(' ');
//     const recipeWordArr = searchTerm.split(' ');
//     let rating = 0;
//     dbWordArr.forEach((dbWord) => {
//       let anyMatches = false;
//       recipeWordArr.forEach((recipeWord) => {
//         const wordSimilarityScore = distance(dbWord, recipeWord)
//         if (wordSimilarityScore > 0.87) {
//           rating += wordSimilarityScore;
//           anyMatches = true;
//         }
//       });
//       if (!anyMatches) rating -= 0.5;
//     });
//     if (rating > bestMatch.rating) {
//       bestMatch.rating = rating;
//       bestMatch.obj = currDBCandidate;
//     }
//   }
//   if (bestMatch.rating < 0.51) {
//     return null;
//   }
//   return bestMatch.obj;
// }

// function parseIngredientElements(ingElementArr) {
//   const ingSentenceArr = [...ingElementArr].map((ingNode) => {
//     const ingText = ingNode.textContent;
//     if (ingText && ingText !== 'Add all ingredients to list') return ingText;
//     return null;
//   }).filter(text => !!text);

//   const userIngredients = [];
//   const dbIngredients = ingSentenceArr.map((sentence) => {
//     const wordArr = sentence.split(' ');
//     let quantity;
//     let unit;
//     let name;

//     // find the unit word in the sentence
//     const splitIdx = wordArr.findIndex(word => word.search(unitRegex) !== -1);
//     // split on that unit word to separate the name and the quantity
//     const unitAndQuantityArr = wordArr.slice(0, splitIdx + 1);
//     if (!unitAndQuantityArr.length && !Number.isNaN(wordArr[0])) {
//       quantity = wordArr.shift();
//     } else {
//       unit = unitAndQuantityArr.pop();
//       quantity = unitAndQuantityArr.join(' ');
//     }
//     // get the ingredient description slice of the sentence
//     let recipeName = wordArr.slice(splitIdx + 1).join(' ').toLowerCase();
//     // handle if the recipe says 'to taste' rather than provide a unit
//     if (recipeName.indexOf('to taste') !== -1) {
//       unit = 'pinch';
//       quantity = '1';
//       recipeName = recipeName.slice(0, recipeName.indexOf('to taste'));
//     }
//     // find the db match
//     const dbMatch = findDatabaseMatch(recipeName, ingredientsFromDBArr);

//     // check if it has other units in parens e.g. '1 (10 oz) package'
//     let newUnit = quantity.match(/\(.+\)/i);
//     if (newUnit && !newUnit[0].includes('inch')) {
//       quantity = +quantity.slice(0, quantity.indexOf('(') - 1);
//       const newUnitArr = newUnit[0].slice(1, -1).split(' ');
//       quantity *= +newUnitArr[0];
//       unit = newUnitArr.slice(1).join(' ');
//     }
//     // check if it has other units in parens in the ingredient name
//     if (!newUnit) newUnit = recipeName.match(/\(.+\)/i);
//     if (newUnit && newUnit.index === 0 && !newUnit[0].includes('inch')) {
//       const newUnitArr = newUnit[0].slice(1, -1).split(' ');
//       quantity *= +newUnitArr[0];
//       unit = newUnitArr.slice(1).join(' ');
//     }
//     // if the ing description lacks a unit word, then assume it means count
//     if (!unit) unit = 'count';
//     quantity = convertQuantityToNumber(quantity);

//     let dbUnit;
//     let dbQuant;
//     let inDb;
//     // if no db match, send the original ingredient description to popup
//     if (dbMatch) {
//       [dbUnit, dbQuant] = mapUnitToDB(unit, quantity, dbMatch);
//       name = dbMatch.name;
//       inDb = true;
//     } else {
//       inDb = false;
//       dbUnit = unit;
//       dbQuant = quantity;
//       name = recipeName;
//     }

//     const userIngredient = {
//       inDb,
//       quantity: Math.round(quantity * 100) / 100,
//       unit,
//       name,
//     };

//     const dbIngredient = {
//       quantity: dbQuant,
//       unit: dbUnit,
//       name,
//     };

//     userIngredients.push(userIngredient)
//     return dbIngredient;
//   });

//   return [dbIngredients, userIngredients];
// }
