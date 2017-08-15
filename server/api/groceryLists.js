const router = require('express').Router();
const { GroceryList } = require('../db/models');

module.exports = router;

// this file may need a little refactoring if taking into consideration schema
// update suggestions, but it shouldn't be anything too drastic

router.get('/', (req, res, next) => {
  GroceryList.findAll()
    .then(groceryLists => res.json(groceryLists))
    .catch(next);
});

router.get('/recipes', (req, res, next) => {
  req.user.getGrocerylist()
    .then((groceryLists) => {
      res.json(groceryLists.recipes);
    })
    .catch(next);
});

router.delete('/recipes/:id', (req, res, next) => {
  req.user.getGrocerylist()
    .then((groceryLists) => { // why not a one-line implicit return?
      return groceryLists.removeRecipe(req.params.id);
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

router.delete('/recipes', (req, res, next) => {
  req.user.getGrocerylist()
    .then((groceryLists) => {
      groceryLists.recipes.forEach((recipe) => {
        groceryLists.removeRecipe(recipe.id);
      });
      return groceryLists;
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

router.get('/ingredients', (req, res, next) => {
  const userId = req.user.id;
  req.user.getGrocerylist()
    .then((list) => { // why not a one-line implicit return?
      return list.getRecipes();
    })
    .then((recipes) => {
      const groceryList = {};
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          if (groceryList[ingredient.name]) {
            groceryList[ingredient.name].quantity += +ingredient.recipes_ingredients.quantity;
          } else {
            const quantity = +ingredient.recipes_ingredients.quantity; //isn't this already an integer? why the + ?
            // L63-L67 extremely verbose - great case for destructuring?
            const id = ingredient.id;
            const estimatedPrice = ingredient.estimatedPrice;
            const unit = ingredient.unit;
            const searchTerms = ingredient.searchTerms;
            const name = ingredient.name;
            groceryList[name] = { id, name, quantity, estimatedPrice, unit, searchTerms }
            // in fact, all this formatting of data and how it should be relayed to the user
            // seems like a good case for a class method or similar on users
          }
        });
      });
      res.json(groceryList);
    });
});

router.post('/', (req, res, next) => {
  GroceryList.findOrCreate({
    where: {
      name: req.body.name,
    },
  })
    .spread((newGroceryList, isCreated) => { // .spread is not a native Promise
      // method. You would have to require the bluebird promise for this. Otherwise,
      // you can also use a regular then block and destructure the arguments
      if (isCreated) {
        res.status(201).json(newGroceryList);
      } else {
        console.log('Grocery list already existed.');
      }
    });
    // I anticipate this will no longer be a relevant route with the schema update
});

router.put('/:id', (req, res, next) => {
  // I feel updating a grocery list should be much more granular than this?
  // is it the quantity of a given ingredient (perhaps they're marking it as
  // they are shopping?) is it the name of the list?
  GroceryList.findById(req.params.id)
    .then((groceryList) => {
      if (!groceryList) {
        return res.sendStatus(404);
      } else {
        return groceryList.update(req.body);
      }
    })
    .then(updatedGroceryList => res.send(updatedGroceryList))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  // will prob become obsolete with schema update
  GroceryList.destroy({
    where: { id: req.params.id }
  })
    .then((rowsDeleted) => {
      res.sendStatus(204);
    })
    .catch(next);
});
