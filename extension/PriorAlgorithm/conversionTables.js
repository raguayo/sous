// const unitArr = [
//   'tablespoon',
//   'teaspoon',
//   'cup',
//   'clove',
//   'package',
//   'can',
//   'pound',
//   'cube',
//   'bottle',
//   'pinch',
//   'square',
//   'fluid ounce',
//   'ounce',
//   'ounces',
//   'slices',
//   'stalks',
//   'bunch',
//   'bunches',
// ];

// const hashRecipeUnitToDBUnit = {
//   'tablespoon': {
//     conversion: 0.5,
//     dbUnit: 'OZ',
//   },
//   'teaspoon': {
//     conversion: 0.167,
//     dbUnit: 'OZ',
//   },
//   'tablespoons': {
//     conversion: 0.5,
//     dbUnit: 'OZ',
//   },
//   'teaspoons': {
//     conversion: 0.167,
//     dbUnit: 'OZ',
//   },
//   'cup': {
//     conversion: 8,
//     dbUnit: 'OZ',
//   },
//   'cups': {
//     conversion: 8,
//     dbUnit: 'OZ',
//   },
//   'cloves': {
//     conversion: 0.2,
//     dbUnit: 'OZ',
//   },
//   // 'package': {
//   //   conversion: '?',
//   //   dbUnit: '?',
//   // },
//   // 'can': {
//   //   conversion: '?',
//   //   dbUnit: '?',
//   // },
//   'pound': {
//     conversion: 16,
//     dbUnit: 'OZ',
//   },
//   'pounds': {
//     conversion: 16,
//     dbUnit: 'OZ',
//   },
//   'cubes': {
//     conversion: 1,
//     dbUnit: 'CT',
//   },
//   // 'bottle': {
//   //   conversion: '?',
//   //   dbUnit: '?',
//   // },
//   'pinch': {
//     conversion: 0.1,
//     dbUnit: 'OZ',
//   },
//   // 'square': {
//   //   conversion: '?',
//   //   dbUnit: '?',
//   // },
//   'fluid ounce': {
//     conversion: 1,
//     dbUnit: 'OZ',
//   },
//   'ounce': {
//     conversion: 1,
//     dbUnit: 'OZ',
//   },
//   'ounces': {
//     conversion: 1,
//     dbUnit: 'OZ',
//   },
//   'count': {
//     conversion: 1,
//     dbUnit: 'CT',
//   },
//   'slices': {
//     conversion: 1,
//     dbUnit: 'CT',
//   },
//   'stalks': {
//     conversion: 1,
//     dbUnit: 'CT',
//   },
//   'bunch': {
//     conversion: 1,
//     dbUnit: 'BUNCH',
//   },
//   'bunches': {
//     conversion: 1,
//     dbUnit: 'BUNCH',
//   }
// };

// // const unitConversionHash = {
// //   'OZ': {
// //     'ML': 29.57,
// //     'LB': 0.0625,
// //     'EA': 0.125,
// //   },
// //   'CT': {
// //     'EA': 1,
// //     'DOZ': 0.0833,
// //     'OZ': 6, // for pie crust -> breaks carrots edge case
// //   },
// // };

// const conversionTableBtwnCountOz = {
//   'chicken breast': {
//     'CT': 5,
//     'OZ': 0.2,
//   },
//   'orange': {
//     'CT': 5,
//     'OZ': 0.2,
//   },
//   'potatoes': {
//     'CT': 6,
//     'OZ': 0.166,
//   },
//   'small potatoes': {
//     'CT': 6,
//     'OZ': 0.166,
//   },
//   'avocado': {
//     'CT': 5,
//     'OZ': 0.2,
//   },
//   'yellow onion': {
//     'CT': 8,
//     'OZ': 0.125,
//   },
//   'turkey deli meat': {
//     'CT': 1,
//     'OZ': 1,
//   },
//   'asparagus': {
//     'CT': 0.5,
//     'OZ': 2,
//   },
//   'beets': {
//     'CT': 5.33,
//     'OZ': 0.188,
//   },
//   'parsley': {
//     'CT': 1,
//     'OZ': 1,
//     // not sure about this one
//   },
//   'celery': {
//     'CT': 2,
//     'OZ': 0.5,
//   },
//   'eggs': {
//     'CT': 4,
//     'OZ': 4,
//     // not sure about this one
//   },
//   'zucchini': {
//     'CT': 5,
//     'OZ': 0.2,
//   },
//   'tomatoes': {
//     'CT': 5,
//     'OZ': 0.2,
//   },
//   'onion': {
//     'CT': 8,
//     'OZ': 0.125,
//   },
//   'peaches': {
//     'CT': 5,
//     'OZ': 0.2,
//   },
//   'corn tortillas': {
//     'CT': 2,
//     'OZ': 0.5,
//   },
//   'pie crust': {
//     'CT': 10,
//     'OZ': 0.1,
//     // not sure about this one
//   },
//   'black pepper': {
//     'CT': 0.1,
//     'OZ': 10,
//     // might not need this once you handle 'to taste'
//   },
//   'rye bread': {
//     'CT': 1,
//     'OZ': 1,
//   },
//   'ricotta cheese': {
//     'CT': 1,
//     'OZ': 1,
//   },
//   'swiss cheese': {
//     'CT': 1,
//     'OZ': 1,
//   },
//   'carrots': {
//     'CT': 3,
//     'OZ': 0.33,
//   },
//   'jalapeno pepper': {
//     'CT': 0.75,
//     'OZ': 1.33,
//   },
//   'white pepper': {
//     'CT': 0.1,
//     'OZ': 10,
//   },
//   'fresh rosemary': {
//     'CT': 0.5,
//     'OZ': 2,
//     // not sure about this one
//   },
// }

// const conversionTableBtwnBunchOz = {
//   'cilantro': {
//     'BUNCH': 3,
//     'OZ': 0.33,
//   },
//   'asparagus': {
//     'BUNCH': 14,
//     'OZ': 0.071,
//   },
//   'beets': {
//     'BUNCH': 16,
//     'OZ': 0.0625,
//     // not sure about this one
//   },
//   'fresh parsley': {
//     'BUNCH': 2,
//     'OZ': 0.5,
//   },
//   'parsley': {
//     'BUNCH': 2,
//     'OZ': 0.5,
//   },
//   'celery': {
//     'BUNCH': 16,
//     'OZ': 0.0625,
//   },
//   'yellow onion': {
//     'BUNCH': 40,
//     'OZ': 0.025,
//   }
// }

// const conversionTableBtwnDozOz = {
//   'eggs': {
//     'DOZ': 48,
//     'OZ': 0.021,
//   }
// }

// const conversionTableBtwnOzDBUnits = {
//   'GAL': 128,
//   'PINT': 16,
//   'LB': 16,
//   'LTR': 33,
// }
