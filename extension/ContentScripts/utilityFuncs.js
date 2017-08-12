// make unit regex
const unitArr = ['tablespoon', 'teaspoon', 'cup', 'clove', 'package', 'can', 'pound', 'cube', 'bottle', 'pinch', 'square', 'fluid ounce', 'ounce'];

const unitRegex = new RegExp("^(" + unitArr.join("|") + ")(s?)$");

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
    const name = wordArr.slice(splitIdx + 1).join(' ');

    // check if it has other units in parens e.g. '1 (10 oz) package'
    const newUnit = quantity.match(/\(.+\)/i)
    if (newUnit) {
      quantity = +quantity.slice(0, quantity.indexOf('(') - 1);
      const newUnitArr = newUnit[0].slice(1, -1).split(' ');
      quantity *= +newUnitArr[0];
      unit = newUnitArr.slice(1).join(' ');
    }

    const ingObj = {
      quantity,
      unit,
      name,
    };

    return ingObj;
  });

  return ingObjArr;
}
