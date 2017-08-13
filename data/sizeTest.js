var Peapod = require('./moduleClone');
const Ingredient = require('../server/db/models/ingredient');

var config = {
    username: 'wraedy@gmail.com',
    password: 'BI!!yg0at7117',
}

var peapod = new Peapod(config);

peapod.search('peach', function(err, results) {
  if (err) console.log(err)
  const name = results.products[0].name;
  const prodId = results.products[0].prodId;
  const unitMeasure = results.products[0].unitMeasure;
  const price = results.products[0].price;
  const size = results.products[0].size;
  console.log(size)
  console.log(unitMeasure)
  const idx = size.indexOf(unitMeasure);
  console.log(size.slice(0, size.indexOf(unitMeasure)))
});

