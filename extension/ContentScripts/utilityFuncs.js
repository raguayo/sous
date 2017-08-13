const unitArr = ['tablespoon', 'teaspoon', 'cup', 'clove', 'package', 'can', 'pound', 'cube', 'bottle', 'pinch', 'square', 'fluid ounce', 'ounce'];

const unitRegex = new RegExp("^(" + unitArr.join("|") + ")(s?)$");

function convertQuantityToNumber(quantity) {
  if (typeof quantity === 'string') {
    const index = quantity.indexOf('/');
    if (index === 1) {
      quantity = +quantity[index - 1] / +quantity[index + 1];
    } else if (index === -1) {
      quantity = Number.parseFloat(quantity);
    } else {
      quantity = Number.parseFloat(quantity) + (+quantity[index - 1] / +quantity[index + 1]);
    }
  }
  return quantity;
}

function findDatabaseMatch(ingDescription) {
  console.log('Input: ', ingDescription)
  const bestMatch = {
    name: null,
    rating: 0,
  };
  for (let i = 0; i < ingredientsFromDBArr.length; i++) {
    const currDBCandidate = ingredientsFromDBArr[i]
    const dbWordArr = currDBCandidate.name.split(' ');
    const recipeWordArr = ingDescription.split(' ');
    let rating = 0;
    dbWordArr.forEach((dbWord) => {
      let anyMatches = false;
      recipeWordArr.forEach((recipeWord) => {
        const wordSimilarityScore = distance(dbWord, recipeWord)
        if (wordSimilarityScore > 0.87) {
          rating += wordSimilarityScore;
          anyMatches = true;
        }
      });
      if (!anyMatches) rating -= 0.5;
    });
    if (rating > bestMatch.rating) {
      bestMatch.rating = rating;
      bestMatch.name = currDBCandidate.name;
    }
  }
  if (!bestMatch.name) console.log('No match!!!!!')
  console.log('Output: ', bestMatch.name)
  return bestMatch.name;
}

function parseIngredientElements(ingElementArr) {
  const ingSentenceArr = [...ingElementArr].map((ingNode) => {
    const ingText = ingNode.textContent;
    if (ingText && ingText !== 'Add all ingredients to list') return ingText;
    return null;
  }).filter(text => !!text);

  const ingObjArr = ingSentenceArr.map((sentence) => {
    const wordArr = sentence.split(' ');
    let quantity;
    let unit;

    // find the unit word in the sentence
    const splitIdx = wordArr.findIndex(word => word.search(unitRegex) !== -1);
    // split on that unit word to separate the name and the quantity
    const unitAndQuantityArr = wordArr.slice(0, splitIdx + 1);
    if (!unitAndQuantityArr.length) {
      quantity = wordArr.shift();
    } else {
      unit = unitAndQuantityArr.pop();
      quantity = unitAndQuantityArr.join(' ');
    }
    // convert recipe name to database name
    const recipeName = wordArr.slice(splitIdx + 1).join(' ');
    const name = findDatabaseMatch(recipeName)

    // check if it has other units in parens e.g. '1 (10 oz) package'
    const newUnit = quantity.match(/\(.+\)/i)
    if (newUnit) {
      quantity = +quantity.slice(0, quantity.indexOf('(') - 1);
      const newUnitArr = newUnit[0].slice(1, -1).split(' ');
      quantity *= +newUnitArr[0];
      unit = newUnitArr.slice(1).join(' ');
    }

    const ingObj = {
      quantity: convertQuantityToNumber(quantity),
      unit: unit ? unit : 'count',
      name,
    };

    return ingObj;
  });

  return ingObjArr;
}
