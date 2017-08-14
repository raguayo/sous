var Peapod = require('./moduleClone');
let Bluebird = require('bluebird');
const Ingredient = require('../server/db/models/ingredient');

var config = {
    username: 'wraedy@gmail.com',
    password: 'BI!!yg0at7117',
}

var peapod = new Peapod(config);

// peapod.search('yougurt', function(err, results) {
//   if (err) console.log(err)
//     console.log('Results', results.products[0].prodId);
//     console.log('Results', results.products[1].prodId);
//     console.log('Results', results.products[2].prodId);

//     const productId1 = results.products[0].prodId;
//     const productId2 = results.products[1].prodId;
//     const quantity = 5;
//     const coupon = null;

//     const items = [{ productId: productId1, quantity, coupon }, { productId: productId2, quantity, coupon }];

//     peapod.addToCart(items, function(err, didSucceed) {
//       if (err) console.log(err);
//       console.log(didSucceed);
//     });
// });

// const search = Bluebird.promisify(peapod.search);

const arrOfIng = [
  { name: 'garlic', peapodName: 'garlic', },
  { name: 'beef sirloin', peapodName: 'Chef\'s Choice Beef Sirloin (Culotte) Steak Prime Cut Fresh', },
  { name: 'onion', peapodName: 'Onions Vidalia', },
  { name: 'cumin ground', peapodName: 'Peapod Cumin Ground', },
  { name: 'black pepper', peapodName: 'McCormick Black Pepper Pure Ground', },
  { name: 'chili powder', peapodName: 'Peapod Chili Powder', },
  { name: 'paprika', peapodName: 'Peapod Paprika', },
  { name: 'thyme', peapodName: 'Nature\'s Promise Organics Thyme', },
  { name: 'marjoram leaves', peapodName: 'McCormick Marjoram Leaves', },
  { name: 'basil dried', peapodName: 'Simply Organic Basil Dried', },
  { name: 'whiskey', peapodName: 'Jim Beam Bourbon Whiskey', },
  { name: 'soy sauce', peapodName: 'Kikkoman Soy Sauce All-Purpose', },
  { name: 'yellow mustard', peapodName: 'French\'s Classic Yellow Mustard 100% Natural', },
  { name: 'worcestershire sauce', peapodName: 'Peapod Worcestershire Sauce', },
  { name: 'hot sauce', peapodName: 'Frank\'s RedHot Hot Sauce Spicy Sweet & Sour', },
  { name: 'beer', peapodName: 'Miller Lite Beer - 24 pk', },
  { name: 'beef bouillon', peapodName: 'Herb-Ox Bouillon Beef Cubes - 25 ct', },
  { name: 'pork tenderloin', peapodName: 'Pork Tenderloin Roast Boneless Vacuum Sealed Fresh', },
  { name: 'root beer', peapodName: 'A & W Root Beer - 24 pk', },
  { name: 'barbecue sauce', peapodName: 'Sweet Baby Ray\'s Barbecue Sauce', },
  { name: 'hamburger buns', peapodName: 'Centrella Hamburger Buns Enriched - 8 ct', },
  { name: 'peaches', peapodName: 'Peaches', },
  { name: 'sugar', peapodName: 'Domino Premium Pure Cane Granulated Sugar', },
  { name: 'salt', peapodName: 'Morton Salt Iodized', },
  { name: 'flour', peapodName: 'Peapod All-Purpose Flour', },
  { name: 'corn starch', peapodName: 'Argo 100% Pure Corn Starch', },
  { name: 'lemon juice', peapodName: 'Peapod 100% Lemon Juice from Concentrate', },
  { name: 'cayenne pepper', peapodName: 'Nature\'s Promise Organic Cayenne Pepper', },
  { name: 'cinnamon ground', peapodName: 'Peapod Cinnamon Ground', },
  { name: 'pie crust', peapodName: 'Peapod Pie Crust Graham Cracker', },
  { name: 'butter', peapodName: 'LAND O LAKES Butter Salted Sticks - 4 qrtrs', },
  { name: 'heavy whipping cream', peapodName: 'Peapod Cream Heavy Whipping Ultra Pasteurized', },
];

// Baked Chicken and Zucchini
const arrOfIng2 = [
 { name: 'eggs', peapodName: 'Peapod White Eggs Grade A Large', },
 { name: 'salt', peapodName: 'Morton Salt Iodized', },
 { name: 'black pepper', peapodName: 'McCormick Black Pepper Pure Ground', },
 { name: 'bread crumbs', peapodName: 'Peapod Bread Crumbs Italian Style', },
 { name: 'olive oil', peapodName: 'O-Live & Co Olive Oil Extra Virgin', },
//  { name: 'chicken breast', peapodName: 'Peapod Chicken Breasts Boneless Skinless Value Pack Fresh', },
 { name: 'garlic', peapodName: 'Peapod Garlic Minced in Water', },
 { name: 'zucchini', peapodName: 'Squash Zucchini', },
 { name: 'tomatoes', peapodName: 'Tomatoes Beefsteak', },
 { name: 'mozzarella cheese', peapodName: 'Peapod Mozzarella Cheese Part Skim Shredded Natural', },
 { name: 'basil', peapodName: 'Green Giant Basil Fresh', },
]

// Spinach Enchiladas
const arrOfIng3 = [
 { name: 'butter', peapodName: 'Peapod Sweet Cream Butter Salted Sticks - 4 qrtrs', },
 { name: 'garlic', peapodName: 'Peapod Garlic Minced in Water', },
 { name: 'spinach', peapodName: 'Birds Eye Spinach Chopped All Natural', },
 { name: 'ricotta cheese', peapodName: 'Galbani Ricotta Cheese Deli Style Whole Milk', },
 { name: 'sour cream', peapodName: 'Daisy Sour Cream', },
 { name: 'monterey jack cheese', peapodName: 'Peapod Monterey Jack Cheese Finely Shredded Natural', },
 { name: 'corn tortillas', peapodName: 'El Milagro Corn Tortillas - 12 ct', },
 { name: 'enchilada sauce', peapodName: 'Old El Paso Enchilada Sauce Red Mild', },
]

// Best Steak Marinade in Existence
const arrOfIng4 = [
 { name: 'soy sauce', peapodName: 'Kikkoman Soy Sauce All-Purpose Less Sodium', },
 { name: 'olive oil', peapodName: 'O-Live & Co Olive Oil Extra Virgin', },
 { name: 'lemon juice', peapodName: 'Peapod 100% Lemon Juice from Concentrate', },
 { name: 'worcestershire sauce', peapodName: 'Lea & Perrins Worcestershire Sauce', },
 { name: 'garlic', peapodName: 'Peapod Garlic Minced in Water', },
 { name: 'basil fresh', peapodName: 'Green Giant Basil Fresh', },
 { name: 'parsley', peapodName: 'Peapod Parsley Flakes', },
 { name: 'white pepper', peapodName: 'McCormick Gourmet White Pepper Ground Organic', },
 { name: 'hot sauce', peapodName: 'Frank\'s RedHot Cayenne Pepper Sauce Original', },
]

const ingredientsArr = [...arrOfIng, ...arrOfIng2, ...arrOfIng3, ...arrOfIng4];

function addIngredients(index) {
  if (index === ingredientsArr.length) return;
  peapod.search(ingredientsArr[index].peapodName, function (err, results) {
    if (err) {
      console.log(err)
    } else {
      const name = ingredientsArr[index].name;
      const peapodName = results.products[0].name;
      const prodId = results.products[0].prodId;
      let unitMeasure = results.products[0].unitMeasure;
      const price = results.products[0].price;
      let size = results.products[0].size;

      const newUnitArr = ['OZ', 'CT', 'PINT', 'LB', 'LTR', 'ML']
      const newUnitRegEx = new RegExp("\\b(" + newUnitArr.join("|") + ")\\b")

      if (size.slice(0, 3) === 'APX') size = size.slice(4);
      if (size.indexOf(unitMeasure) !== -1) size = size.slice(0, size.indexOf(unitMeasure));
      else {
        const newUnitMatchArr = size.match(newUnitRegEx);
        if (newUnitMatchArr) {
          unitMeasure = newUnitMatchArr[0];
          size = size.slice(0, size.indexOf(unitMeasure));
        } else {
          unitMeasure = 'CT';
        }
      }
      if (size.indexOf('-') !== -1) size = size[1];

      Ingredient.findOrCreate({
        where: {
          name,
        },
        defaults: {
          peapodName, prodId, unitMeasure, price, size: +size,
        },
      })
        .then(ing => {
          console.log(name + ' added')
          if (index < ingredientsArr.length) addIngredients(index + 1);
          else console.log('Done');
        })
        .catch(console.error);
    }
  });
}

addIngredients(0);
