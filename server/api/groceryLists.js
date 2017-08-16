const router = require('express').Router();
const { GroceryList } = require('../db/models');

module.exports = router;

// router.get('/', (req, res, next) => {
//   GroceryList.findAll()
//     .then(groceryLists => res.json(groceryLists))
//     .catch(next);
// });

router.get('/recipes', (req, res, next) => {
  req.user.getGroceryListRecipes()
    .then((recipes) => {
      res.json(recipes);
    })
    .catch(next);
});

router.delete('/recipes/:id', (req, res, next) => {
  req.user.removeGroceryListRecipe(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

router.delete('/recipes', (req, res, next) => {
  req.user.getGroceryListRecipes()
    .then(recipes => req.user.removeGroceryListRecipes(recipes))
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

// router.get('/ingredients', (req, res, next) => {
//   const userId = req.user.id;
//   req.user.getGroceryListRecipes()
//     .then((list) => {
//       return list.getRecipes();
//     })
//     .then((recipes) => {
//       const groceryList = {};
//       recipes.forEach((recipe) => {
//         recipe.ingredients.forEach((ingredient) => {
//           if (groceryList[ingredient.name]) {
//             groceryList[ingredient.name].quantity += +ingredient.recipes_ingredients.quantity;
//           } else {
//             const quantity = +ingredient.recipes_ingredients.quantity;
//             const id = ingredient.id;
//             const estimatedPrice = ingredient.estimatedPrice;
//             const unit = ingredient.unit;
//             const searchTerms = ingredient.searchTerms;
//             const name = ingredient.name;
//             groceryList[name] = { id, name, quantity, estimatedPrice, unit, searchTerms }
//           }
//         });
//       });
//       res.json(groceryList);
//     });
// });

// router.post('/', (req, res, next) => {
//   GroceryList.findOrCreate({
//     where: {
//       name: req.body.name,
//     },
//   })
//     .spread((newGroceryList, isCreated) => {
//       if (isCreated) {
//         res.status(201).json(newGroceryList);
//       } else {
//         console.log('Grocery list already existed.');
//       }
//     });
// });

// router.put('/:id', (req, res, next) => {
//   GroceryList.findById(req.params.id)
//     .then((groceryList) => {
//       if (!groceryList) {
//         return res.sendStatus(404);
//       } else {
//         return groceryList.update(req.body);
//       }
//     })
//     .then(updatedGroceryList => res.send(updatedGroceryList))
//     .catch(next);
// });

router.put('/recipes/:id', (req, res, next) => {
  const quantity = +req.body.quantity;
  const userId = req.user.id;
  const recipeId = req.params.id;
  GroceryList.findOne({ where: { recipeId, userId } })
    .then(recipeInList => {
      if (!recipeInList) next(new Error(`couldn't find recipe`));
      return recipeInList.update({ quantity });
    })
    .then(updatedGroceryListRecipe => res.json(updatedGroceryListRecipe))
    .catch(next);
});

router.delete('/ingredients/:id', (req, res, next) => {
  const recipeId = req.body.recipeId;
  const ingredientId = req.params.id;
  req.user.getGroceryListRecipes({ where: { recipeId } })
    .then((recipe) => {
      recipe.removeIngredient({ where: { ingredientId } })
    })
    .then(() => {
      res.sendStatus(204)
    });
});
// router.delete('/:id', (req, res, next) => {
//   GroceryList.destroy({
//     where: { id: req.params.id }
//   })
//     .then((rowsDeleted) => {
//       res.sendStatus(204);
//     })
//     .catch(next);
// });
