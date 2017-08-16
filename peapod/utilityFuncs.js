function convertSizeToNumber(quantity) {
  if (typeof quantity === 'string') {
    // remove any superfluous text
    let firstNumIdx = quantity.search(/[0-9]/);
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

module.exports = {
  convertSizeToNumber,
};
