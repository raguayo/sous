const router = require('express').Router();
const { Recipe, Ingredient, User, IngredientQuantity, SavedRecipe } = require('../db/models');
const { microformatScraper } = require('../scraper/microformat');

module.exports = router;

router.get('/', (req, res, next) => {
  req.user.getSavedRecipes()
  .then(recipesWithFlag => res.json(recipesWithFlag))
  .catch(next);
});

// router.get('/:id', (req, res, next) => {
//   Recipe.findById(req.params.id)
//     .then(userRecipes => res.json(userRecipes))
//     .catch(next);
// });

router.post('/', (req, res, next) => {
  let recipePromise;
  let ingredientArr;

  if (req.body.isFromChromeExt) {
    const { inGroceryList } = req.body;
    const { title, recipeUrl, imageUrl, author, siteName, numServings } = req.body.recipe;
    recipePromise = Recipe.findOrCreate({
      where: {
        recipeUrl,
      },
      defaults: {
        title,
        imageUrl,
        author,
        siteName,
        numServings,
      },
    });
    ingredientArr = req.body.ingredients;
    Promise.all([recipePromise, ...ingredientArr])
      .then(([recipeArr, ...arrIngredients]) => {
        const newRecipe = recipeArr[0];
        const isCreated = recipeArr[1];

        // TODO: modularize to set following two associations - pass user argument to handle both post branches
        req.user.addSavedRecipe(newRecipe);
        // chrome extension stringifies bool for some reason
        if (inGroceryList === 'true') {
          req.user.addGroceryListRecipe(newRecipe);
        }

        // TODO: consider modularizing with adding passed argument if from microformat branch
        if (isCreated) {
          const arrIngredientPromises = arrIngredients.map((ingredient) => {
            return Ingredient.findOrCreate({
              where: {
                name: ingredient.name,
              },
              defaults: {
                unitMeasure: ingredient.unit,
              },
            })
              .then(([foundIngredient, ingIsCreated]) => {
                // TODO: only line different from microformat branch
                if (!ingredient.quantity) ingredient.quantity = 1;
                return IngredientQuantity.create({ recipeId: newRecipe.id, ingredientId: foundIngredient.id, quantity: ingredient.quantity })
                .then(() => foundIngredient)
                .catch(next);
              })
              .catch(next);
          });

          // TODO: modularize - same as in microformat branch
          return Promise.all([newRecipe, ...arrIngredientPromises])
            .then(([recipe, ...ingredients]) => {
              const ingArr = recipe.addIngredients(ingredients);
              return Promise.all([newRecipe, ingArr]);
            })
            .then(([recipe, ingredientsArr]) => Recipe.findById(recipe.id))
            .then(() => res.sendStatus(201))
            .catch(next);
        } else {
          res.sendStatus(201);
        }
      })
    .catch(next);
  } else {
    const { url } = req.body;
    microformatScraper(url)
    .then((data) => {
      const title = data.properties.name[0];
      ingredientArr = data.properties.ingredient;
      const imageUrl = data.properties.photo[0];
      recipePromise = Recipe.findOrCreate({
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
      return Promise.all([recipePromise, ...ingredientArr]);
    })
  .then(([recipeArr, ...arrIngredients]) => {
    const newRecipe = recipeArr[0];
    const isCreated = recipeArr[1];

    // TODO: modularize to set following two associations - pass user and inGroceryList(null if from chrome ext) arguments to handle both post branches
    req.user.addSavedRecipe(newRecipe);

    req.user.addGroceryListRecipe(newRecipe);

    // TODO: consider modularizing with adding passed argument if from microformat branch
    if (isCreated) {
      const arrIngredientPromises = arrIngredients.map((ingredient) => {
        return Ingredient.findOrCreate({
          where: {
            name: ingredient,
          },
          defaults: {
            unitMeasure: ingredient.unit,
          },
        })
        .then(([foundIngredient, ingIsCreated]) => {
          return foundIngredient;
        })
        .catch(next);
      });

      // TODO: modularize - same as in microformat branch

      return Promise.all([newRecipe, ...arrIngredientPromises])
        .then(([recipe, ...ingredients]) => {
          const ingArr = recipe.addIngredients(ingredients);
          return Promise.all([newRecipe, ingArr]);
        })
        .then(([recipe, ingredientsArr]) => Recipe.findById(recipe.id))
        .then(recipe => res.status(201).json(recipe))
        .catch(next);
    } else {
      res.sendStatus(201);
    }
  })
  .catch(next);
  }
});

router.put('/:id/favorite', (req, res, next) => {
  const recipeId = req.params.id;
  const userId = req.user.id;

  SavedRecipe.findOne({ where: { userId, recipeId } })
    .then((recipe) => {
      if (recipe.isFavorite) {
        return recipe.update({ isFavorite: false });
      }
      return recipe.update({ isFavorite: true });
    })
    .then(() => req.user.getSavedRecipes({ where: { id: recipeId } }))
    .then((recipe) => {
      res.json(recipe[0]);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        next(new Error('Recipe not found'));
      }
      return recipe.update(req.body);
    })
    .then(updatedRecipe => res.send(updatedRecipe))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  req.user.removeSavedRecipe(req.params.id)
    .then(() => req.user.removeGroceryListRecipe(req.params.id))
    .then(() => res.sendStatus(204))
    .catch(next);
});
