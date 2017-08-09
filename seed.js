const models = require('./server/db/models');

const { User, Recipe, Ingredient, GroceryList } = models;

const db = require('./server/db/db');

db.sync({ force: true })
  .then(() => {
    const user1 = User.create({
      name: 'bob',
      email: 'bob@bob.com',
      password: 'bob',
    });
    const user2 = User.create({
      name: 'tim',
      email: 'tim@tim.com',
      password: 'tim',
    });
    const user3 = User.create({
      name: 'sam',
      email: 'sam@sam.com',
      password: 'sam',
    });
    return Promise.all([user1, user2, user3]);
  })
  .then(([user1, user2, user3]) => {
    return Promise.all([
      Recipe.create({
        title: 'Slow Cooker Butter Chicken',
        author: 'The Meal Planner',
        recipeUrl: 'http://allrecipes.com/recipe/174543/slow-cooker-butter-chicken/?internalSource=rotd&referringContentType=home%20page&clickId=cardslot%201',
        imageUrl: 'http://images.media-allrecipes.com/userphotos/720x405/1119998.jpg',
        siteName: 'All Recipes',
        tags: ['indian'],
        numServings: 6,
      }),
      Recipe.create({
        title: 'Soft, Moist and Gooey Cinnamon Buns',
        author: 'FIONASMOM',
        recipeUrl: 'http://allrecipes.com/recipe/7176/soft-moist-and-gooey-cinnamon-buns/?internalSource=previously%20viewed&referringContentType=home%20page&clickId=cardslot%205',
        imageUrl: 'http://images.media-allrecipes.com/userphotos/250x250/601635.jpg',
        siteName: 'All Recipes',
        tags: ['yeast bread'],
        numServings: 24,
      }),
      Recipe.create({
        title: 'Fresh Southern Peach Cobbler',
        author: 'aeposey',
        recipeUrl: 'http://allrecipes.com/recipe/51535/fresh-southern-peach-cobbler/?internalSource=previously%20viewed&referringContentType=home%20page&clickId=cardslot%208',
        imageUrl: 'http://images.media-allrecipes.com/userphotos/720x405/2500761.jpg',
        siteName: 'All Recipes',
        tags: ['dessert'],
        numServings: 6,
      }),
      Recipe.create({
        title: 'Lemon Blueberry Bread',
        author: 'ChezSpice',
        recipeUrl: 'http://allrecipes.com/recipe/24843/lemon-blueberry-bread/?internalSource=previously%20viewed&referringContentType=home%20page&clickId=cardslot%203',
        imageUrl: 'http://images.media-allrecipes.com/userphotos/560x315/959084.jpg',
        siteName: 'All Recipes',
        tags: ['fruit bread'],
        numServings: 12,
      }),
      Recipe.create({
        title: 'Best Steak Marinade in Existence',
        author: 'Kookie',
        recipeUrl: 'http://allrecipes.com/recipe/143809/best-steak-marinade-in-existence/?internalSource=previously%20viewed&referringContentType=home%20page&clickId=cardslot%2011',
        imageUrl: 'http://images.media-allrecipes.com/userphotos/250x250/225844.jpg',
        siteName: 'All Recipes',
        tags: ['indian'],
        numServings: 8,
      }),
      user1,
      user2,
      user3,
    ]);
  })
  .then(([chicken, buns, cobbler, bread, steak, user1, user2, user3]) => {
    user1.addRecipes([chicken, cobbler, steak]);
    user2.addRecipes([buns, bread, steak])
    user3.addRecipes([chicken])
    return Promise.all([chicken, buns, cobbler, bread, steak, user1, user2, user3]);
  })
  .then(([chicken, buns, cobbler, bread, steak, user1, user2, user3]) => {
    const list1 = GroceryList.create({ name: 'Placeholder1' });
    const list2 = GroceryList.create({ name: 'Placeholder2' });
    const list3 = GroceryList.create({ name: 'Placeholder3' });

    return Promise.all([chicken, buns, cobbler, bread, steak, user1, user2, user3, list1, list2, list3]);
  })
  .then(([chicken, buns, cobbler, bread, steak, user1, user2, user3, list1, list2, list3]) => {
    user1.setGrocerylist(list1);
    user2.setGrocerylist(list2);
    user3.setGrocerylist(list3);

    return Promise.all([
      Ingredient.create({
        name: 'milk',
        estimatedPrice: 3.00,
        unit: 'gallon',
        searchTerms: ['milk']
      }),
      Ingredient.create({
        name: 'eggs',
        estimatedPrice: 2.00,
        unit: 'dozen',
        searchTerms: ['eggs']
      }),
      Ingredient.create({
        name: 'butter',
        estimatedPrice: 0.50,
        unit: 'stick',
        searchTerms: ['butter']
      }),
      Ingredient.create({
        name: 'sugar',
        estimatedPrice: 0.10,
        unit: 'cup',
        searchTerms: ['sugar']
      }),
      Ingredient.create({
        name: 'peaches',
        estimatedPrice: 2.50,
        unit: 'pound',
        searchTerms: ['peaches']
      }),
      Ingredient.create({
        name: 'blueberries',
        estimatedPrice: 4.00,
        unit: 'cup',
        searchTerms: ['blueberries']
      }),
      Ingredient.create({
        name: 'basil',
        estimatedPrice: 0.50,
        unit: 'tablespoons',
        searchTerms: ['basil']
      }),
      Ingredient.create({
        name: 'garlic',
        estimatedPrice: 1.00,
        unit: 'bunch',
        searchTerms: ['garlic']
      }),
      Ingredient.create({
        name: 'worcestershire sauce',
        estimatedPrice: 0.77,
        unit: 'cup',
        searchTerms: ['worcestershire']
      }),
      Ingredient.create({
        name: 'chicken',
        estimatedPrice: 0.77,
        unit: 'pound',
        searchTerms: ['chicken']
      }),
      chicken,
      buns,
      cobbler,
      bread,
      steak,
      list1,
      list2,
      list3,
    ]);
  })
  .then(([milk, eggs, butter, sugar, peaches, blueberries, basil, garlic, worcestershire, chickenIng, chicken, buns, cobbler, bread, steak, list1, list2, list3]) => {
    buns.addIngredients([milk, eggs, butter, sugar]);
    cobbler.addIngredients([milk, eggs, butter, sugar, peaches]);
    bread.addIngredients([milk, eggs, butter, blueberries]);
    steak.addIngredients([worcestershire, garlic, basil]);
    chicken.addIngredients([chickenIng, butter, garlic]);

    return Promise.all([buns, cobbler, bread, steak, chicken, list1, list2, list3])
  })
  .then(([buns, cobbler, bread, steak, chicken, list1, list2, list3]) => {
    const promise1 = list1.addRecipes([chicken, cobbler]);
    const promise2 = list2.addRecipes([buns, steak]);
    return Promise.all([promise1, promise2]);
  })
  .then(() => {
    console.log('finished seeding');
    db.close();
  })
  .catch();

