var Peapod = require('./api');
const axios = require('axios');
const PeapodIngredient = require('../server/db/models/peapodIng');
const { convertSizeToNumber } = require('./utilityFuncs');

var config = require('../secrets');

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
  { name: 'hamburger buns', peapodName: 'Pepperidge Farm Classic Hamburger Buns Soft White - 8 ct', },
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
 { name: 'olive oil', peapodName: 'Nature\'s Promise Organic Olive Oil Extra Virgin', },
 { name: 'chicken breast', peapodName: 'Peapod Chicken Breasts Boneless Skinless Value Pack Fresh', },
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
 { name: 'olive oil', peapodName: 'Nature\'s Promise Organic Olive Oil Extra Virgin', },
 { name: 'lemon juice', peapodName: 'Peapod 100% Lemon Juice from Concentrate', },
 { name: 'worcestershire sauce', peapodName: 'Lea & Perrins Worcestershire Sauce', },
 { name: 'garlic', peapodName: 'Peapod Garlic Minced in Water', },
 { name: 'basil fresh', peapodName: 'Green Giant Basil Fresh', },
 { name: 'parsley', peapodName: 'Peapod Parsley Flakes', },
 { name: 'white pepper', peapodName: 'McCormick Gourmet White Pepper Ground Organic', },
 { name: 'hot sauce', peapodName: 'Frank\'s RedHot Cayenne Pepper Sauce Original', },
]

// Beet Salad with Goat Cheese
const beetSalad = [
  { name: 'beets', peapodName: 'Beets Organic' },
  { name: 'walnuts', peapodName: 'Peapod Walnuts Natural' },
  { name: 'maple syrup', peapodName: 'Nature\'s Promise Organic Maple Syrup Pure' },
  { name: 'mixed greens', peapodName: 'Peapod Premium Salad Spring Mix' },
  { name: 'orange juice concentrate', peapodName: 'Peapod 100% Orange Juice Pulp Free Concentrated All Natural Frozen' },
  { name: 'balsamic vinegar', peapodName: 'Nature\'s Promise Organic Balsamic Vinegar' },
  { name: 'goat cheese', peapodName: 'Peapod Goat Cheese Crumbled Traditional' },
];

// Easy Arugula Salad
const arugulaSalad = [
  { name: 'argula', peapodName: 'Nature\'s Promise Organic Baby Arugula' },
  { name: 'cherry tomatoes', peapodName: 'Tomatoes Cherry' },
  { name: 'pine nuts', peapodName: 'Alessi Pignoli Pine Nuts' },
  { name: 'rice vinegar', peapodName: 'Nakano Rice Vinegar Natural' },
  { name: 'parmesan cheese', peapodName: 'Peapod Parmesan Cheese Finely Shredded Natural' },
  { name: 'avocado', peapodName: 'Avocado Hass' },
];

// Easy Arugula Salad
const vegetarianKorma = [
  { name: 'vegetable oil', peapodName: 'Peapod Vegetable Oil 100% Natural' },
  { name: 'ginger root', peapodName: 'Ginger Root' },
  { name: 'potatoes', peapodName: 'Potatoes Idaho Russet' },
  { name: 'carrots', peapodName: 'Carrots' },
  { name: 'jalapeno pepper', peapodName: 'Peppers Jalapeno' },
  { name: 'cashews', peapodName: 'Peapod Cashews Roasted Jumbo Unsalted' },
  { name: 'tomato sauce', peapodName: 'Peapod Tomato Sauce' },
  { name: 'curry powder', peapodName: 'Nature\'s Promise Organic Curry Powder' },
  { name: 'green peas', peapodName: 'Peapod Peas Green All Natural' },
  { name: 'green bell pepper', peapodName: 'Peppers Bell Green' },
  { name: 'red bell pepper', peapodName: 'Peppers Bell Red' },
  { name: 'cilantro', peapodName: 'Herbs Cilantro Organic' },
];

// Baked Denver Omlette
const denverOmlette = [
  { name: 'ham', peapodName: 'Peapod Deli Ham Honey (Regular Sliced)' },
  { name: 'milk', peapodName: 'Borden Milk Reduced Fat 2%' },
  { name: 'cheddar cheese', peapodName: 'Peapod Cheddar Cheese Sharp Yellow Chunk Natural' },
  { name: 'carrots', peapodName: 'Carrots' },
];

// Chef John's Falafel
const falafel = [
  { name: 'dry garbanzo beens', peapodName: 'Peapod Garbanzo Beans Chick Peas Dry' },
  { name: 'yellow onion', peapodName: 'Onions Yellow' },
  { name: 'fresh parsley', peapodName: 'Parsley Italian' },
  { name: 'coriander', peapodName: 'McCormick Gourmet Coriander Ground Organic' },
  { name: 'baking soda', peapodName: 'Peapod Pure Baking Soda' },
  { name: 'cayenne pepper', peapodName: 'Nature\'s Promise Organic Cayenne Pepper' },
  { name: 'oil', peapodName: 'Peapod Vegetable Oil 100% Natural' },
];

// Absolutely Ultimate Potato Soup
const potatoSoup = [
  { name: 'bacon', peapodName: 'Peapod Premium Cut Bacon Thick Cut Sliced' },
  { name: 'celery', peapodName: 'Celery' },
  { name: 'chicken stock', peapodName: 'Peapod Cooking Stock Chicken' },
  { name: 'tarragon', peapodName: 'McCormick Tarragon Leaves' },
];

// Asian Beef with Snow Peas
const asianBeef = [
  { name: 'rice wine', peapodName: 'Nakano Rice Vinegar Natural' },
  { name: 'brown sugar', peapodName: 'Peapod Brown Sugar Light' },
  { name: 'beef round steak', peapodName: 'Chef\'s Choice Beef Top Round Steak 1/2 Inch Vacuum Sealed Fresh' },
  { name: 'snow peas', peapodName: 'Snow Peas Peapods' },
];

// Chef John's Salmon in Parchment http://allrecipes.com/recipe/223154/chef-johns-salmon-in-parchment/
const salmon = [
  { name: 'olive oil', peapodName: 'Nature\'s Promise Organic Olive Oil Extra Virgin', },
  { name: 'small potatoes', peapodName: 'Potatoes Idaho Russet', },
  { name: 'asparagus', peapodName: 'Asparagus', },
  { name: 'salmon fillets', peapodName: 'Salmon Fillets Boneless Skinless Farm-Raised - 2 ct Fresh', },
  { name: 'salt', peapodName: 'Morton Salt Iodized', },
  { name: 'black pepper', peapodName: 'McCormick Black Pepper Pure Ground', },
  { name: 'extra virgin olive oil', peapodName: 'Peapod Olive Oil Extra Virgin', }, //Not sure if should just bucket under olive oil?
]


// Chef John's Penne with Vodka Sauce http://allrecipes.com/recipe/235357/chef-johns-penne-with-vodka-sauce/
const penne = [
  { name: 'pancetta bacon', peapodName: 'Boar\'s Head Pancetta Diced', },
  { name: 'fresh rosemary', peapodName: 'Green Giant Rosemary Fresh', },
  { name: 'olive oil', peapodName: 'Nature\'s Promise Organic Olive Oil Extra Virgin', },
  { name: 'vodka', peapodName: 'Svedka Vodka', },
  { name: 'heavy whipping cream', peapodName: 'Peapod Cream Heavy Whipping Ultra Pasteurized', },
  { name: 'black pepper', peapodName: 'McCormick Black Pepper Pure Ground', },
  { name: 'marinara sauce', peapodName: 'Peapod Pasta Sauce Marinara All Natural', },
  // { name: 'water', peapodName: 'Peapod Acadia Spring Water Natural - 35 pk', }, //water
  { name: 'penne pasta', peapodName: 'Peapod Pasta Penne Rigate', },
  { name: 'parmesan cheese', peapodName: 'Peapod Parmesan Cheese Grated', },
]

// Grilled Turkey and Swiss Sandwich http://allrecipes.com/recipe/235531/grilled-turkey-and-swiss-sandwich/
const turkeySand = [
  { name: 'mayonnaise', peapodName: 'Hellmann\'s Real Mayonnaise', },
  { name: 'rye bread', peapodName: 'Pepperidge Farm Deli Swirl Bread Rye & Pumpernickel', },
  { name: 'swiss cheese', peapodName: 'Peapod Swiss Cheese Sliced Natural - 10 ct', },
  { name: 'turkey deli meat', peapodName: 'Boar\'s Head Deli Turkey Breast Ovengold Roasted (Thin Sliced)', },
  { name: 'baby spinach', peapodName: 'Peapod Salad Basics Baby Spinach', },
]

// Pork Marsala http://allrecipes.com/recipe/140829/pork-marsala/
const porkMars = [
  { name: 'flour', peapodName: 'Peapod All-Purpose Flour', },
  { name: 'salt', peapodName: 'Morton Salt Iodized', },
  { name: 'garlic salt', peapodName: 'Peapod Garlic Salt', },
  { name: 'garlic powder', peapodName: 'Peapod Garlic Powder', },
  { name: 'dried oregano', peapodName: 'Peapod Oregano Leaves', },
  { name: 'boneless pork loin chops', peapodName: 'Nature\'s Promise Free from Pork Chops Loin Boneless Fresh', },
  { name: 'butter', peapodName: 'LAND O LAKES Butter Salted Sticks - 4 qrtrs', },
  { name: 'olive oil', peapodName: 'Nature\'s Promise Organic Olive Oil Extra Virgin', },
  { name: 'mushroom', peapodName: 'Peapod Mushrooms White Sliced', },
  { name: 'garlic', peapodName: 'garlic', },
  { name: 'marsala wine', peapodName: 'Holland House Cooking Wine Marsala', },
]

// Asian Cucumber Salad http://allrecipes.com/recipe/192623/asian-cucumber-salad/
const asianSal = [
  { name: 'cucumber', peapodName: 'Cucumbers', },
  { name: 'salt', peapodName: 'Morton Salt Iodized', },
  { name: 'rice vinegar', peapodName: 'Nakano Rice Vinegar Natural', },
  { name: 'sugar', peapodName: 'Domino Premium Pure Cane Granulated Sugar', },
  { name: 'sesame oil', peapodName: 'Dynasty Sesame Seed Oil', },
  { name: 'garlic', peapodName: 'garlic', },
  { name: 'minced ginger root', peapodName: 'Christopher Ranch Ginger Chopped', },
  { name: 'sesame seeds', peapodName: 'Nature\'s Promise Organics Sesame Seed', },
  { name: 'chili pepper', peapodName: 'Peppers Habanero - 5-9 ct', },

]

// Perfect Summer Fruit Salad http://allrecipes.com/recipe/214947/perfect-summer-fruit-salad/
const fruitSal = [
  { name: 'orange juice', peapodName: 'Peapod 100% Pure Orange Juice No Pulp Not From Concentrate', },
  { name: 'lemon juice', peapodName: 'Peapod 100% Lemon Juice from Concentrate', },
  { name: 'brown sugar', peapodName: 'Peapod Brown Sugar Light', },
  { name: 'orange zest', peapodName: 'Oranges Navel', },
  { name: 'lemon zest', peapodName: 'Lemons', },
  { name: 'vanilla extract', peapodName: 'Nature\'s Promise Organics Vanilla Extract', },
  { name: 'pineapple', peapodName: 'Peapod Pineapple Chunks', },
  { name: 'strawberries', peapodName: 'Driscoll\'s Strawberries', },
  { name: 'kiwi', peapodName: 'Kiwi Fruit', },
  { name: 'banana', peapodName: 'Banana Yellow', },
  { name: 'orange', peapodName: 'Oranges Navel', }, //Orange zest is an ingredient above
  { name: 'grapes', peapodName: 'Grapes Red Seedless', },
  { name: 'blueberries', peapodName: 'Driscoll\'s Blueberries', },
]

// Chocolate Zucchini Bread I http://allrecipes.com/recipe/17289/chocolate-zucchini-bread-i/
const zuchBread = [
  { name: 'chocolate', peapodName: 'Baker\'s Baking Chocolate Bar Semi-Sweet 56% Cacao All Natural', },
  { name: 'eggs', peapodName: 'Peapod White Eggs Grade A Large', },
  { name: 'sugar', peapodName: 'Domino Premium Pure Cane Granulated Sugar', },
  { name: 'vegetable oil', peapodName: 'Peapod Vegetable Oil 100% Natural', },
  { name: 'zucchini', peapodName: 'Squash Zucchini', },
  { name: 'vanilla extract', peapodName: 'Nature\'s Promise Organics Vanilla Extract', },
  { name: 'flour', peapodName: 'Peapod All-Purpose Flour', },
  { name: 'baking soda', peapodName: 'Peapod Pure Baking Soda', },
  { name: 'salt', peapodName: 'Morton Salt Iodized', },
  { name: 'cinnamon ground', peapodName: 'Peapod Cinnamon Ground', },
  { name: 'chocolate chips', peapodName: 'Peapod Real Semi-Sweet Chocolate Chips Mini', },
]

const ingredientsArr = [
  ...arrOfIng,
  ...arrOfIng2,
  ...arrOfIng3,
  ...arrOfIng4,
  ...beetSalad,
  ...arugulaSalad,
  ...vegetarianKorma,
  ...denverOmlette,
  ...falafel,
  ...potatoSoup,
  ...asianBeef,
  ...salmon,
  ...penne,
  ...turkeySand,
  ...porkMars,
  ...asianSal,
  ...fruitSal,
  ...zuchBread,
];

function addIngredients(IngArr, index) {
  if (index === IngArr.length) {
    console.log('finished seeding');
    return;
  }
  peapod.search(IngArr[index].peapodName, function (err, results) {
    if (err) {
      console.log(err)
    } else {
      // let name = IngArr[index].name;
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
      // change Peapod unit and size to match our db
      axios.get( , {
        baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/convert',
        headers:  {"X-Mashape-Key": "YyZySSmshzmshUvFJgXCNd0oeM57p11ZPWNjsns9qV945YLMWs"},
      })



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

      PeapodIngredient.findOrCreate({
        where: {
          prodId,
        },
        defaults: {
          peapodName, price, size: +size,
        },
      })
        .then(ing => {
          console.log(name + ' added')
          if (index < IngArr.length) addIngredients(IngArr, index + 1);
          else console.log('Done');
        })
        .catch(console.error);
    }
  });
}

addIngredients(0);
