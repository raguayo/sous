function setDisplayUnitAndQuantity(ingObj) {
  let conversionFactor = 1;
  if (ingObj.unitMeasure === 'OZ') {
    if (ingObj.quantity < 0.5) {
      // convert to teaspoons
      ingObj.displayUnit = 'TSB';
      conversionFactor = 0.167;
    } else if (ingObj.quantity < 2) {
      // convert to tablespoons
      ingObj.displayUnit = 'TB';
      conversionFactor = 0.5;
    } else {
      ingObj.displayUnit = ingObj.unitMeasure;
    }
  } else if (ingObj.unitMeasure === 'PINT') {
    if (ingObj.quantity < 0.03125) {
      // convert to teaspoons
      ingObj.displayUnit = 'TSB';
      conversionFactor = 0.01;
    } else if (ingObj.quantity < 0.125) {
      // convert to tablespoons
      ingObj.displayUnit = 'TB';
      conversionFactor = 0.03125;
    } else if (ingObj.quantity < 1) {
      // convert to tablespoons
      ingObj.displayUnit = 'CUPS';
      conversionFactor = 0.125;
    } else {
      ingObj.displayUnit = ingObj.unitMeasure;
    }
  } else if (ingObj.unitMeasure === 'LB') {
    if (ingObj.quantity < 0.03125) {
      // convert to teaspoons
      ingObj.displayUnit = 'TSB';
      conversionFactor = 0.01;
    } else if (ingObj.quantity < 0.125) {
      // convert to tablespoons
      ingObj.displayUnit = 'TB';
      conversionFactor = 0.03125;
    } else if (ingObj.quantity < 0.25) {
      // convert to tablespoons
      ingObj.displayUnit = 'CUPS';
      conversionFactor = 0.125;
    } else {
      ingObj.displayUnit = ingObj.unitMeasure;
    }
  } else if (ingObj.unitMeasure === 'DOZ') {
    ingObj.displayUnit = 'CT';
    conversionFactor = 0.083;
  } else {
    ingObj.displayUnit = ingObj.unitMeasure;
  }
  ingObj.displayQuantity = Math.round((ingObj.quantity / conversionFactor) * 100) / 100;
  return ingObj;
}

function roundOffNumber(ingObj) {
  if (ingObj.displayUnit === 'CT' || ingObj.displayUnit === 'OZ') {
    ingObj.displayQuantity = Math.ceil(ingObj.displayQuantity);
  } else if (ingObj.displayUnit === 'TSB' || ingObj.displayUnit === 'TSB' || ingObj.unitMeasure === 'LB') {
    ingObj.displayQuantity = Math.round(ingObj.displayQuantity * 4) / 4;
  }
  return ingObj;
}

module.exports = {
  setDisplayUnitAndQuantity,
  roundOffNumber,
};
