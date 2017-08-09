const router = require('express').Router();
const { Recipe, Ingredient } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  req.user.getRecipes()
  .then((prevRecipes) => {
    res.json(prevRecipes);
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(userRecipes => res.json(userRecipes))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Recipe.findOrCreate({
    where: {
      title: req.body.title,
      author: req.body.author,
    },
    defaults: {
      recipeUrl: req.body.recipeUrl,
      imageUrl: req.body.imageUrl,
      siteName: req.body.siteName,
      tags: req.body.tags,
      isFavorite: req.body.isFavorite,
      numServings: req.body.numServings,
    },
  })
    .spread((newRecipe, isCreated) => {
      if (isCreated) {
        const arrIngredients = req.body.ingredients.split(',');
        const arrObjIngredients = [];
        arrIngredients.forEach((ingredient) => {
          Ingredient.findOrCreate({
            where: {
              name: ingredient,
            },
          })
            .spread((objIngredient) => {
              newRecipe.addIngredient(objIngredient);
            })
            .catch(next);
        });
        res.status(201).json(newRecipe);
      } else {
        console.log('Recipe already existed.');
        next();
      }
    });
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
  req.user.removeRecipe(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
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
