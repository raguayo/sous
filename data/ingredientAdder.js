var Peapod = require('./moduleClone');
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

const arrOfIng = ['Onions Vidalia', 'garlic', 'Chef\'s Choice Beef Sirloin (Culotte) Steak Prime Cut Fresh', 'Peapod Cumin Ground', 'McCormick Black Pepper Pure Ground', 'Peapod Chili Powder', 'Peapod Paprika', 'Nature\'s Promise Organics Thyme', 'McCormick Marjoram Leaves', 'Simply Organic Basil Dried', 'Jim Beam Bourbon Whiskey', 'Kikkoman Soy Sauce All-Purpose', 'French\'s Classic Yellow Mustard 100% Natural', 'Peapod Worcestershire Sauce', 'Frank\'s RedHot Hot Sauce Spicy Sweet & Sour', 'Miller Lite Beer - 24 pk', 'Herb-Ox Bouillon Beef Cubes - 25 ct', 'Pork Tenderloin Roast Boneless Vacuum Sealed Fresh', 'A & W Root Beer - 24 pk', 'Sweet Baby Ray\'s Barbecue Sauce', 'Centrella Hamburger Buns Enriched - 8 ct', 'Peaches', 'Domino Premium Pure Cane Granulated Sugar', 'Morton Salt Iodized', 'Peapod All-Purpose Flour', 'Argo 100% Pure Corn Starch', 'Peapod 100% Lemon Juice from Concentrate', 'Nature\'s Promise Organic Cayenne Pepper', 'Peapod Cinnamon Ground', 'Peapod Pie Crust Graham Cracker', 'LAND O LAKES Butter Salted Sticks - 4 qrtrs', 'Peapod Cream Heavy Whipping Ultra Pasteurized'];

// Baked Chicken and Zucchini
const arrOfIng2 = [
 'Peapod White Eggs Grade A Large',
 'Morton Salt Iodized',
 'McCormick Black Pepper Pure Ground',
 'Peapod Bread Crumbs Italian Style',
 'O-Live & Co Olive Oil Extra Virgin',
 'Peapod Chicken Breasts Boneless Skinless Value Pack Fresh',
 'Peapod Garlic Minced in Water',
 'Squash Zucchini',
 'Tomatoes Beefsteak',
 'Peapod Mozzarella Cheese Part Skim Shredded Natural',
 'Green Giant Basil Fresh'
]

// Spinach Enchiladas
const arrOfIng3 = [
 'Peapod Sweet Cream Butter Salted Sticks - 4 qrtrs',
 'Peapod Garlic Minced in Water',
 'Birds Eye Spinach Chopped All Natural',
 'Galbani Ricotta Cheese Deli Style Whole Milk',
 'Daisy Sour Cream',
 'Peapod Monterey Jack Cheese Finely Shredded Natural',
 'El Milagro Corn Tortillas - 12 ct',
 'Old El Paso Enchilada Sauce Red Mild',
]

// Best Steak Marinade in Existence
const arrOfIng4 = [
 'Kikkoman Soy Sauce All-Purpose Less Sodium',
 'O-Live & Co Olive Oil Extra Virgin',
 'Peapod 100% Lemon Juice from Concentrate',
 'Lea & Perrins Worcestershire Sauce',
 'Peapod Garlic Minced in Water',
 'Green Giant Basil Fresh',
 'Peapod Parsley Flakes',
 'McCormick Gourmet White Pepper Ground Organic',
 'Frank\'s RedHot Cayenne Pepper Sauce Original',
]

arrOfIng4.forEach(ingName => {
  peapod.search(ingName, function(err, results) {
    if (err) {
      console.log(err)
    } else {
      const name = results.products[0].name;
      const prodId = results.products[0].prodId;
      const unitMeasure = results.products[0].unitMeasure;
      const price = results.products[0].price;
      const size = results.products[0].size;

      console.log(typeof name, typeof prodId, typeof unitMeasure, typeof price, typeof size.slice(0, size.indexOf(unitMeasure)))

      Ingredient.findOrCreate({where: {
        name, prodId, unitMeasure, price, size: size.slice(0, size.indexOf(unitMeasure)),
      } })
      .then(ing => {
        console.log(name + 'added')
      })
      .catch(console.error);
    }
  });
});

