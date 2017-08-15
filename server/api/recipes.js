const router = require('express').Router();
const { Recipe, Ingredient } = require('../db/models');
const { microformatScraper } = require('../scraper/microformat');

module.exports = router;

router.get('/', (req, res, next) => {
  req.user.getSavedRecipes()
  // .then((recipes) => {
  //   const arrOfPromises = recipes.map((recipe) => {
  //     return recipe.isInUserGroceryList(req.user.id)
  //     .then((bool) => {
  //       recipe.dataValues.inGroceryList = bool;
  //       return recipe;
  //     })
  //     .catch(next);
  //   });
  //   return Promise.all(arrOfPromises);
  // })
  .then(recipesWithFlag => res.json(recipesWithFlag))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(userRecipes => res.json(userRecipes))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { url, inGroceryList } = req.body;
  microformatScraper(url)
  .then((data) => {
    const title = data.properties.name[0];
    const ingredientArr = data.properties.ingredient;
    const imageUrl = data.properties.photo[0];
    const recipePromise = Recipe.findOrCreate({
      where: {
        title,
        // author: req.body.author,
      },
      defaults: {
        recipeUrl: url,
        imageUrl,
        // siteName: req.body.siteName,
        // tags: req.body.tags,
        // isFavorite: req.body.isFavorite,
        // numServings: req.body.numServings,
      },
    });
    // get grocery list
    const groceryListPromise = req.user.getGrocerylist();
    return Promise.all([recipePromise, groceryListPromise, ...ingredientArr])
  })
  .then(([recipeArr, grocerylist, ...ingredientArr]) => {
    const newRecipe = recipeArr[0];
    const isCreated = recipeArr[1];
    req.user.addRecipes([newRecipe]);

    if (inGroceryList) {
      grocerylist.addRecipes([newRecipe]);
    }

    if (isCreated) {
      // const arrIngredients = req.body.ingredients.split(',');
      const arrIngredientPromises = ingredientArr.map((ingredient) => {
        return Ingredient.findOrCreate({
          where: {
            name: ingredient,
          },
        })
        .then(([foundIngredient, IngIsCreated]) => foundIngredient)
        .catch(next);
      });
      return Promise.all([newRecipe, ...arrIngredientPromises])
        .then(([recipe, ...ingredients]) => {
          const ingArr = recipe.addIngredients(ingredients);
          return Promise.all([newRecipe, ingArr])
        })
        .then(([recipe, ingredientsArr]) => Recipe.findById(recipe.id))
        .then((recipe) => {
          if (inGroceryList) recipe.dataValues.inGroceryList = true;
          else recipe.dataValues.inGroceryList = false;
          res.status(201).json(recipe)
        })
        .catch(next);
    } else {
      if (inGroceryList) newRecipe.dataValues.inGroceryList = true;
      else newRecipe.dataValues.inGroceryList = false;
      res.status(201).json(newRecipe);
    }
  })
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        return res.sendStatus(404);
      }
      return recipe.update(req.body);
    })
    .then(updatedRecipe => res.send(updatedRecipe))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  req.user.removeSavedRecipe(req.params.id)
    // .then(() => {
    //   return req.user.getGrocerylist();
    // })
    // .then((userGroceryList) => {
    //   userGroceryList.removeRecipe(req.params.id);
    // })
    .then(() => req.user.removeGroceryListRecipe(req.params.id))
    .then(() => res.sendStatus(204))
    .catch(next);
  // Recipe.destroy({
  //   where: { id: req.params.id }
  // })
  //   .then((rowsDeleted) => {
  //     console.log('rows deleted: ', rowsDeleted);
  //     res.sendStatus(204);
  //   })
  //   .catch(next);
});
