const Peapod = require('./api');
const axios = require('axios');
const PeapodIngredient = require('../server/db/models/peapodIng');
const { convertSizeToNumber } = require('./utilityFuncs');

const config = { username: process.env.INIT_PEAPOD_USERNAME, password: process.env.INIT_PEAPOD_PASSWORD };

const peapod = new Peapod(config);

const promisifiedSearch = function (ingredientName) {
  return new Promise((success, reject) => {
    peapod.search(ingredientName, (err, result) => {
      if (err) {
        return reject(err);
      }
      return success(result);
    });
  });
};

function mapToPeapod(ingObj) {
  return promisifiedSearch(ingObj.name)
    .then((results) => {
      const name = ingObj.name;
      const peapodName = results.products[0].name;
      const prodId = results.products[0].prodId;
      let unitMeasure = results.products[0].unitMeasure;
      const price = results.products[0].price;
      let size = results.products[0].size;

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
      if (unitMeasure === 'DOZ') {
        return PeapodIngredient.findOrCreate({
          where: {
            prodId,
          },
          defaults: {
            name: peapodName, price, size: 12,
          },
        })
      } else {
        return axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/convert?ingredientName=${name}&sourceAmount=${size}&sourceUnit=${unitMeasure}&targetUnit=${ingObj.unitMeasure}`, {
          baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com',
          headers: { 'X-Mashape-Key': process.env.RECIPE_API_KEY },
        }).then(res => res.data)
          .then((conversion) => {
            if (conversion.targetAmount) {
              return PeapodIngredient.findOrCreate({
                where: {
                  prodId,
                },
                defaults: {
                  name: peapodName, price, size: conversion.targetAmount,
                },
              });
            }
            // if api doesn't handle the conversion correctly, dont add entry to database
            // return simlar array
            return [undefined, false];
          })
          .catch((err) => {
            // errors will be forwarded to express error handler up the chain
            return err;
          });
      }
    })
    .catch((err) => {
      // errors will be forwarded to express error handler up the chain
      return err;
    });
}

module.exports = {
  mapToPeapod,
};
