const router = require('express').Router();
const { GroceryList } = require('../db/models');

module.exports = router;

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
      res.sendStatus(204);
    })
    .catch(next);
});

router.get('/excluded', (req, res, next) => {
  req.user.getExcludedIngredients()
    .then((ingredients) => {
      res.json(ingredients);
    })
    .catch(next);
});

router.post('/excluded', (req, res, next) => {
  const ingredientId = req.body.ingredientId;
  req.user.addExcludedIngredient(ingredientId)
    .then(() => {
      res.json(ingredientId);
    })
    .catch(next);
});

router.delete('/excluded/:id', (req, res, next) => {
  const ingredientId = req.params.id;
  req.user.removeExcludedIngredient(ingredientId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});
