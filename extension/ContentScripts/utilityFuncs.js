const unitArr = [
  'tablespoon',
  'teaspoon',
  'cup',
  'clove',
  'package',
  'can',
  'pound',
  'cube',
  'bottle',
  'pinch',
  'square',
  'fluid ounce',
  'ounce',
];

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

const hashRecipeUnitToDBUnit = {
  'tablespoon': {
    conversion: 0.5,
    dbUnit: 'OZ',
  },
  'teaspoon': {
    conversion: 0.2,
    dbUnit: 'OZ',
  },
  'tablespoons': {
    conversion: 0.5,
    dbUnit: 'OZ',
  },
  'teaspoons': {
    conversion: 0.2,
    dbUnit: 'OZ',
  },
  'cup': {
    conversion: 8,
    dbUnit: 'OZ',
  },
  'cups': {
    conversion: 8,
    dbUnit: 'OZ',
  },
  'cloves': {
    conversion: 0.2,
    dbUnit: 'OZ',
  },
  // 'package': {
  //   conversion: '?',
  //   dbUnit: '?',
  // },
  // 'can': {
  //   conversion: '?',
  //   dbUnit: '?',
  // },
  'pound': {
    conversion: 16,
    dbUnit: 'OZ',
  },
  'pounds': {
    conversion: 16,
    dbUnit: 'OZ',
  },
  'cubes': {
    conversion: 1,
    dbUnit: 'CT',
  },
  // 'bottle': {
  //   conversion: '?',
  //   dbUnit: '?',
  // },
  'pinch': {
    conversion: 0.1,
    dbUnit: 'OZ',
  },
  // 'square': {
  //   conversion: '?',
  //   dbUnit: '?',
  // },
  'fluid ounce': {
    conversion: 1,
    dbUnit: 'OZ',
  },
  'ounce': {
    conversion: 1,
    dbUnit: 'OZ',
  },
  'count': {
    conversion: 1,
    dbUnit: 'CT',
  }
}

const unitConversionHash = {
  'OZ': {
    'ML': 29.57,
    'LB': 0.0625,
    'EA': 0.125,
  },
  'CT': {
    'EA': 1,
    'DOZ': 0.833,
    'OZ': 6, // for pie crust
  },
};

function mapUnitToDB(recipeUnit, recipeQuantity, dbObj) {
  const recipeToDBObj = hashRecipeUnitToDBUnit[recipeUnit];
  if (!recipeToDBObj) {
    console.log('Error: Unit not found in DB ' + recipeUnit)
    return [null, null]; // hanlde this error better
  }
  let newUnit = recipeToDBObj.dbUnit;
  let newQuantity = recipeQuantity * recipeToDBObj.conversion;
  if (newUnit !== dbObj.unitMeasure) {
    const unitConversionObj = unitConversionHash[newUnit];
    if (!unitConversionObj) {
      console.log('Error: Unit not found in DB ' + recipeUnit);
      return [null, null]; // handle this error better
    }
    newUnit = dbObj.unitMeasure;
    newQuantity *= unitConversionObj[dbObj.unitMeasure];
  }
  return [newUnit, newQuantity];
}

function findDatabaseMatch(searchTerm, dictionaryArr) {
  const bestMatch = {
    obj: null,
    rating: 0,
  };
  for (let i = 0; i < dictionaryArr.length; i++) {
    const currDBCandidate = dictionaryArr[i]
    const dbWordArr = currDBCandidate.name.split(' ');
    const recipeWordArr = searchTerm.split(' ');
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
      bestMatch.obj = currDBCandidate;
    }
  }
  if (!bestMatch.obj) console.log('No match!!!!!')
  return bestMatch.obj;
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
    const dbMatch = findDatabaseMatch(recipeName, ingredientsFromDBArr);
    if (!dbMatch) return {}; // handle this error better;

    // check if it has other units in parens e.g. '1 (10 oz) package'
    let newUnit = quantity.match(/\(.+\)/i)
    if (newUnit) {
      quantity = +quantity.slice(0, quantity.indexOf('(') - 1);
      const newUnitArr = newUnit[0].slice(1, -1).split(' ');
      quantity *= +newUnitArr[0];
      unit = newUnitArr.slice(1).join(' ');
    }
    // check if it has other units in parens in the ingredient name
    if (!newUnit) newUnit = recipeName.match(/\(.+\)/i);
    if (newUnit && newUnit.index === 0) {
      const newUnitArr = newUnit[0].slice(1, -1).split(' ');
      quantity *= +newUnitArr[0];
      unit = newUnitArr.slice(1).join(' ');
    }
    // if the ing description lacks a unit word, then assume it means count
    if (!unit) unit = 'count';
    quantity = convertQuantityToNumber(quantity);

    // convert unit and quantity to match db
    [unit, quantity] = mapUnitToDB(unit, quantity, dbMatch);
    // **********

    const ingObj = {
      quantity,
      unit,
      name: dbMatch.name,
    };

    return ingObj;
  });

  return ingObjArr;
}
