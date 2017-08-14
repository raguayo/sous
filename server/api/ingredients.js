const router = require('express').Router();
const { Ingredient } = require('../db/models');

module.exports = router;

// are you really ever looking for ingredient data without the context of a list
// of sorts (be it grocery list or saved recipes)?

router.get('/', (req, res, next) => {
  Ingredient.findAll()
    .then(ingredients => res.json(ingredients))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Ingredient.findById(req.params.id)
    .then(ingredient => res.json(ingredient))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Ingredient.findOrCreate({
    where: {
      name: req.body.name,
    },
    defaults: {
      estimatedPrice: req.body.estimatedPrice,
      unit: req.body.unit,
    }
  })
    .spread((newIngredient, isCreated) => { // .spread is exclusive to bluebird promises
      if (isCreated) {
        res.status(201).json(newIngredient);
      } else {
        console.log('Ingredient already existed.');
      }
    });
});

router.put('/:id', (req, res, next) => {
  Ingredient.findById(req.params.id)
    .then((ingredient) => {
      if (!ingredient) {
        return res.sendStatus(404); // be more descriptive - 404 may also imply that
        // the resource path was not found and the client might think they made a
        // request to the wrong URI.
      } else {
        return ingredient.update(req.body);
      }
    })
    .then(updatedIngredient => res.send(updatedIngredient))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Ingredient.destroy({
    where: { id: req.params.id }
  })
    .then((rowsDeleted) => {
      res.sendStatus(204);
    })
    .catch(next);
});
