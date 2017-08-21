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
  'ounces',
  'slices',
  'stalks',
  'bunch',
  'bunches',
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
    conversion: 0.167,
    dbUnit: 'OZ',
  },
  'tablespoons': {
    conversion: 0.5,
    dbUnit: 'OZ',
  },
  'teaspoons': {
    conversion: 0.167,
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
  'ounces': {
    conversion: 1,
    dbUnit: 'OZ',
  },
  'count': {
    conversion: 1,
    dbUnit: 'CT',
  },
  'slices': {
    conversion: 1,
    dbUnit: 'CT',
  },
  'stalks': {
    conversion: 1,
    dbUnit: 'CT',
  },
  'bunch': {
    conversion: 1,
    dbUnit: 'BUNCH',
  },
  'bunches': {
    conversion: 1,
    dbUnit: 'BUNCH',
  }
};

// const unitConversionHash = {
//   'OZ': {
//     'ML': 29.57,
//     'LB': 0.0625,
//     'EA': 0.125,
//   },
//   'CT': {
//     'EA': 1,
//     'DOZ': 0.0833,
//     'OZ': 6, // for pie crust -> breaks carrots edge case
//   },
// };

const conversionTableBtwnCountOz = {
  'chicken breast': {
    'CT': 5,
    'OZ': 0.2,
  },
  'orange': {
    'CT': 5,
    'OZ': 0.2,
  },
  'potatoes': {
    'CT': 6,
    'OZ': 0.166,
  },
  'small potatoes': {
    'CT': 6,
    'OZ': 0.166,
  },
  'avocado': {
    'CT': 5,
    'OZ': 0.2,
  },
  'yellow onion': {
    'CT': 8,
    'OZ': 0.125,
  },
  'turkey deli meat': {
    'CT': 1,
    'OZ': 1,
  },
  'asparagus': {
    'CT': 0.5,
    'OZ': 2,
  },
  'beets': {
    'CT': 5.33,
    'OZ': 0.188,
  },
  'parsley': {
    'CT': 1,
    'OZ': 1,
    // not sure about this one
  },
  'celery': {
    'CT': 2,
    'OZ': 0.5,
  },
  'eggs': {
    'CT': 4,
    'OZ': 4,
    // not sure about this one
  },
  'zucchini': {
    'CT': 5,
    'OZ': 0.2,
  },
  'tomatoes': {
    'CT': 5,
    'OZ': 0.2,
  },
  'onion': {
    'CT': 8,
    'OZ': 0.125,
  },
  'peaches': {
    'CT': 5,
    'OZ': 0.2,
  },
  'corn tortillas': {
    'CT': 2,
    'OZ': 0.5,
  },
  'pie crust': {
    'CT': 10,
    'OZ': 0.1,
    // not sure about this one
  },
  'black pepper': {
    'CT': 0.1,
    'OZ': 10,
    // might not need this once you handle 'to taste'
  },
  'rye bread': {
    'CT': 1,
    'OZ': 1,
  },
  'ricotta cheese': {
    'CT': 1,
    'OZ': 1,
  },
  'swiss cheese': {
    'CT': 1,
    'OZ': 1,
  },
  'carrots': {
    'CT': 3,
    'OZ': 0.33,
  },
  'jalapeno pepper': {
    'CT': 0.75,
    'OZ': 1.33,
  },
  'white pepper': {
    'CT': 0.1,
    'OZ': 10,
  },
  'fresh rosemary': {
    'CT': 0.5,
    'OZ': 2,
    // not sure about this one
  },
}

const conversionTableBtwnBunchOz = {
  'cilantro': {
    'BUNCH': 3,
    'OZ': 0.33,
  },
  'asparagus': {
    'BUNCH': 14,
    'OZ': 0.071,
  },
  'beets': {
    'BUNCH': 16,
    'OZ': 0.0625,
    // not sure about this one
  },
  'fresh parsley': {
    'BUNCH': 2,
    'OZ': 0.5,
  },
  'parsley': {
    'BUNCH': 2,
    'OZ': 0.5,
  },
  'celery': {
    'BUNCH': 16,
    'OZ': 0.0625,
  },
  'yellow onion': {
    'BUNCH': 40,
    'OZ': 0.025,
  }
}

const conversionTableBtwnDozOz = {
  'eggs': {
    'DOZ': 48,
    'OZ': 0.021,
  }
}

const conversionTableBtwnOzDBUnits = {
  'GAL': 128,
  'PINT': 16,
  'LB': 16,
  'LTR': 33,
}

function convertToOz(unit, quantity, ingName) {
  if (unit === 'OZ') return [unit, quantity];
  if (unit === 'CT') {
    // convert 'CT' to 'OZ' depending on ing
    quantity *= conversionTableBtwnCountOz[ingName][unit];
  } else if (unit === 'BUNCH') {
    // convert 'BUNCH' to 'OZ' depending on ing
    quantity *= conversionTableBtwnBunchOz[ingName][unit];
  } else if (unit === 'DOZ') {
    // convert 'DOZ' to 'OZ' depending on ing
    quantity *= conversionTableBtwnDozOz[ingName][unit];
  } else {
    // will this even need to happen?
    // console.log('Last if: ', unit, quantity, ingName);
    return [unit, quantity];
  }
  return ['OZ', quantity];
}

function convertOzToDBUnit(unit, quantity, dbUnit, ingName) {
  if (dbUnit === 'OZ') return [unit, quantity];
  if (dbUnit === 'CT') {
    quantity /= conversionTableBtwnCountOz[ingName][dbUnit];
  } else if (dbUnit === 'BUNCH') {
    quantity /= conversionTableBtwnBunchOz[ingName][dbUnit];
  } else if (dbUnit === 'DOZ') {
    quantity /= conversionTableBtwnDozOz[ingName][dbUnit];
  } else {
    quantity /= conversionTableBtwnOzDBUnits[dbUnit];
  }
  return [dbUnit, quantity];
}

function mapUnitToDB(recipeUnit, recipeQuantity, dbObj) {
  const recipeToDBObj = hashRecipeUnitToDBUnit[recipeUnit];
  if (!recipeToDBObj) {
    // console.log('Error: Unit not found in DB ' + recipeUnit);
    return [null, null]; // hanlde this error better
  }
  let newUnit = recipeToDBObj.dbUnit;
  let newQuantity = recipeQuantity * recipeToDBObj.conversion;
  // console.log('Butter?: ', dbObj.name, newQuantity, dbObj.unitMeasure)
  // console.log(recipeToDBObj)
  // handle if the newUnit and peapod unit don't match
  if (newUnit !== dbObj.unitMeasure) {
    // convert to oz
    [newUnit, newQuantity] = convertToOz(newUnit, newQuantity, dbObj.name);
    // convert to db units
    [newUnit, newQuantity] = convertOzToDBUnit(newUnit, newQuantity, dbObj.unitMeasure, dbObj.name);
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
  if (bestMatch.rating < 0.51) {
    return null;
  }
  return bestMatch.obj;
}

function parseIngredientElements(ingElementArr) {
  const ingSentenceArr = [...ingElementArr].map((ingNode) => {
    const ingText = ingNode.textContent;
    if (ingText && ingText !== 'Add all ingredients to list') return ingText;
    return null;
  }).filter(text => !!text);

  const userIngredients = [];
  const dbIngredients = ingSentenceArr.map((sentence) => {
    const wordArr = sentence.split(' ');
    let quantity;
    let unit;
    let name;

    // find the unit word in the sentence
    const splitIdx = wordArr.findIndex(word => word.search(unitRegex) !== -1);
    // split on that unit word to separate the name and the quantity
    const unitAndQuantityArr = wordArr.slice(0, splitIdx + 1);
    if (!unitAndQuantityArr.length && !Number.isNaN(wordArr[0])) {
      quantity = wordArr.shift();
    } else {
      unit = unitAndQuantityArr.pop();
      quantity = unitAndQuantityArr.join(' ');
    }
    // get the ingredient description slice of the sentence
    let recipeName = wordArr.slice(splitIdx + 1).join(' ').toLowerCase();
    // handle if the recipe says 'to taste' rather than provide a unit
    if (recipeName.indexOf('to taste') !== -1) {
      unit = 'pinch';
      quantity = '1';
      recipeName = recipeName.slice(0, recipeName.indexOf('to taste'));
    }
    // find the db match
    const dbMatch = findDatabaseMatch(recipeName, ingredientsFromDBArr);

    // check if it has other units in parens e.g. '1 (10 oz) package'
    let newUnit = quantity.match(/\(.+\)/i);
    if (newUnit && !newUnit[0].includes('inch')) { // handle the 'inch' edge case less brittle-y
      quantity = +quantity.slice(0, quantity.indexOf('(') - 1);
      const newUnitArr = newUnit[0].slice(1, -1).split(' ');
      quantity *= +newUnitArr[0];
      unit = newUnitArr.slice(1).join(' ');
    }
    // check if it has other units in parens in the ingredient name
    if (!newUnit) newUnit = recipeName.match(/\(.+\)/i);
    if (newUnit && newUnit.index === 0 && !newUnit[0].includes('inch')) { // handle the 'inch' edge case less brittle-y
      const newUnitArr = newUnit[0].slice(1, -1).split(' ');
      quantity *= +newUnitArr[0];
      unit = newUnitArr.slice(1).join(' ');
    }
    // if the ing description lacks a unit word, then assume it means count
    if (!unit) unit = 'count';
    quantity = convertQuantityToNumber(quantity);

    let dbUnit;
    let dbQuant;
    let inDb;
    // if no db match, send the original ingredient description to popup
    if (dbMatch) {
      [dbUnit, dbQuant] = mapUnitToDB(unit, quantity, dbMatch);
      name = dbMatch.name;
      inDb = true;
    } else {
      inDb = false;
      dbUnit = unit;
      dbQuant = quantity;
      name = recipeName;
    }

    const userIngredient = {
      inDb,
      quantity: Math.round(quantity * 100) / 100,
      unit,
      name,
    };

    const dbIngredient = {
      quantity: dbQuant,
      unit: dbUnit,
      name,
    };

    userIngredients.push(userIngredient)
    return dbIngredient;
  });

  return [dbIngredients, userIngredients];
}
