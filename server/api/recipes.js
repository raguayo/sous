const router = require('express').Router();
const { Recipe } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Recipe.findAll()
    .then(recipes => res.json(recipes))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(userRecipes => res.json(userRecipes))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Recipe.create(req.body)
    .then((newRecipe) => {
      res.status(201).json(newRecipe);
    });
});

router.put('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      if (!recipe) {
        return res.sendStatus(404);
      } else {
        return recipe.update(req.body);
      }
    })
    .then(updatedRecipe => res.send(updatedRecipe))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Recipe.destroy({
    where: { id: req.params.id }
  })
    .then(rowsDeleted => {
      res.sendStatus(204);
    })
    .catch(next);
});
