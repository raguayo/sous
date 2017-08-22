const Peapod = require('./api');
const axios = require('axios');
const PeapodIngredient = require('../server/db/models/peapodIng');
const { convertSizeToNumber } = require('./utilityFuncs');

const config = require('../secrets');

const peapod = new Peapod(config);

module.exports = function mapToPeapod(ingObj) {
  peapod.search(ingObj.name, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      const name = ingObj.name;
      // console.log(IngArr[index])
      const peapodName = results.products[0].name;
      const prodId = results.products[0].prodId;
      let unitMeasure = results.products[0].unitMeasure;
      const price = results.products[0].price;
      let size = results.products[0].size;

      const newUnitArr = ['OZ', 'CT', 'PINT', 'LB', 'LTR', 'ML', 'BUNCH', 'GAL'];
      const newUnitRegEx = new RegExp("\\b(" + newUnitArr.join("|") + ")\\b")
      // remove APX
      if (size.slice(0, 3) === 'APX') size = size.slice(4);
      // make size just a number
      if (size.indexOf(unitMeasure) !== -1) size = size.slice(0, size.indexOf(unitMeasure));
      else {
        // handle if unit and size don't match
        const newUnitMatchArr = size.match(newUnitRegEx);
        if (newUnitMatchArr) {
          unitMeasure = newUnitMatchArr[0];
          size = size.slice(0, size.indexOf(unitMeasure));
        } else {
          unitMeasure = 'count';
        }
      }
      // handle if there are pk and ct included in the ingredient name
      const hyphenIdx = peapodName.lastIndexOf('-');
      if (+hyphenIdx > (peapodName.length - 10)) {
        const potentialAdjustmentArr = peapodName.slice(hyphenIdx + 1).split(' ');
        if (potentialAdjustmentArr.includes('ct')) {
          size = potentialAdjustmentArr.slice(0, potentialAdjustmentArr.indexOf('ct')).join();
          unitMeasure = 'count';
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
      return axios.get({
        baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/convert',
        headers: { 'X-Mashape-Key': 'YyZySSmshzmshUvFJgXCNd0oeM57p11ZPWNjsns9qV945YLMWs' },
        data: {
          ingredientName: name,
          sourceAmount: +size,
          sourceUnit: unitMeasure,
          targetUnit: ingObj.unitMeasure,
        },
      })
      .then((conversion) => {
        return PeapodIngredient.findOrCreate({
          where: {
            prodId,
          },
          defaults: {
            peapodName, price, size: conversion.targetAmount,
          },
        });
      })
      .catch(console.error);
      // do something better here
    }
  });
}
