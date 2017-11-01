const Peapod = require('./api');
const axios = require('axios');
const PeapodIngredient = require('../server/db/models/peapodIng');
const { adjustSizeAndUnit } = require('./utilityFuncs');

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

const mapToPeapod = async (ingObj) => {
  try {
    const results = await promisifiedSearch(ingObj.name)
    const { name } = ingObj.name;
    const {
      unitMeasure,
      size,
      name: peapodName,
      prodId,
      price,
    } = results.products[0];

    const adjusted = adjustSizeAndUnit(size, unitMeasure, peapodName);
    let newSize = adjusted[0];
    const newUnitMeasure = adjusted[1];

    // if (name === 'corn starch') name = 'cornstarch';
    // change Peapod unit and size to match our db
    if (newUnitMeasure === 'DOZ') newSize = 12;
    else {
      // make call to conversion api
      const res = await axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/convert?ingredientName=${name}&sourceAmount=${newSize}&sourceUnit=${newUnitMeasure}&targetUnit=${ingObj.unitMeasure}`, {
        baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com',
        headers: { 'X-Mashape-Key': process.env.RECIPE_API_KEY },
      });
      if (res.data.targetAmount) {
        newSize = res.data.targetAmount;
      } else {
        // if api doesn't handle the conversion correctly, dont add entry to database
        // return consistent data type
        return [undefined, false];
      }
    }
    return PeapodIngredient.findOrCreate({
      where: {
        prodId,
      },
      defaults: {
        name: peapodName, price, size: newSize,
      },
    });
  } catch (err) {
    // return err to be forwarded to express error handling
    return err;
  }
};

module.exports = {
  mapToPeapod,
};
