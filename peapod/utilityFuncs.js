function convertSizeToNumber(quantity) {
  if (typeof quantity === 'string') {
    // remove any superfluous text
    let firstNumIdx = quantity.search(/[0-9]/);
    // but don't get rid of decimal places
    if (quantity.indexOf('.') !== -1 && quantity.indexOf('.') === firstNumIdx - 1) firstNumIdx = quantity.indexOf('.');
    const lastNumIdx = quantity.length - quantity.split('').reverse().join().search(/[0-9]/);
    quantity = quantity.slice(firstNumIdx, lastNumIdx + 1);
    // handle fractions (e.g. 1/2) or hyphens (e.g. 4-5)
    const fractionIndex = quantity.indexOf('/');
    const hyphenIndex = quantity.indexOf('-');
    if (fractionIndex === 1) {
      quantity = +quantity[fractionIndex - 1] / +quantity[fractionIndex + 1];
    } else if (hyphenIndex !== -1) {
      quantity = +quantity[hyphenIndex - 1];
    } else if (fractionIndex !== -1) {
      quantity = Number.parseFloat(quantity) + (+quantity[fractionIndex - 1] / +quantity[fractionIndex + 1]);
    } else {
      quantity = Number.parseFloat(quantity);
    }
  }
  return quantity;
}

function adjustSizeAndUnit(origSize, origUnitMeasure, peapodName) {
  console.log('orig')
  // copy to avoid modifying original values
  let size = origSize;
  let unitMeasure = origUnitMeasure;

  const newUnitArr = ['OZ', 'CT', 'PINT', 'LB', 'LTR', 'ML', 'BUNCH', 'GAL', 'DOZ'];
  const newUnitRegEx = new RegExp("\\b(" + newUnitArr.join("|") + ")\\b");
  // remove APX from size
  if (size.slice(0, 3) === 'APX') size = size.slice(4);
  // separate the number and unit of the size
  if (size.indexOf(unitMeasure) !== -1) size = size.slice(0, size.indexOf(unitMeasure));
  else {
    // handle if unitMeasure and size unit don't match
    const newUnitMatchArr = size.match(newUnitRegEx);
    if (newUnitMatchArr) {
      unitMeasure = newUnitMatchArr[0];
      size = size.slice(0, size.indexOf(unitMeasure));
    } else {
      unitMeasure = 'piece';
    }
  }
  // handle if there are pk and ct included in the ingredient name
  const hyphenIdx = peapodName.lastIndexOf('-');
  if (+hyphenIdx > (peapodName.length - 10)) {
    const potentialAdjustmentArr = peapodName.slice(hyphenIdx + 1).split(' ');
    if (potentialAdjustmentArr.includes('ct')) {
      size = potentialAdjustmentArr.slice(0, potentialAdjustmentArr.indexOf('ct')).join();
      unitMeasure = 'piece';
    } else if (potentialAdjustmentArr[1] === 'pk') {
      size *= +potentialAdjustmentArr[0];
    }
  }
  // should handle hyphens, fractions, ignore other text
  size = convertSizeToNumber(size);
  // switch 'EA' with 'CT' to standardize
  if (unitMeasure === 'EA') unitMeasure = 'CT';
  // if (name === 'corn starch') name = 'cornstarch';
  // change Peapod unit and size to match our db

  return [size, unitMeasure];
}

module.exports = {
  adjustSizeAndUnit,
};
