const router = require('express').Router();
const { GroceryList, UserRecipe } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  GroceryList.findAll()
    .then(groceryLists => res.json(groceryLists))
    .catch(next);
});

router.get('/recipes', (req, res, next ) => {
  req.user.getGrocerylist()
  .then((groceryLists) => {
    res.json(groceryLists.recipes);
  })
  .catch(next);
});

router.delete('/recipes/:id', (req, res, next) => {
  req.user.getGrocerylist()
  .then((groceryLists) => {
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

router.get('/:id', (req, res, next) => {
  GroceryList.findById(req.params.id)
    .then(groceryList => res.json(groceryList))
    .catch(next);
});

router.post('/', (req, res, next) => {
  GroceryList.findOrCreate({
    where: {
      name: req.body.name,
    },
  })
    .spread((newGroceryList, isCreated) => {
      if (isCreated) {
        res.status(201).json(newGroceryList);
      } else {
        console.log('Grocery list already existed.');
      }
    });
});

router.put('/:id', (req, res, next) => {
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
  GroceryList.destroy({
    where: { id: req.params.id }
  })
    .then((rowsDeleted) => {
      res.sendStatus(204);
    })
    .catch(next);
});
