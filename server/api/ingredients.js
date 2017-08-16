const router = require('express').Router();
const { Ingredient } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Ingredient.findAll()
    .then(ingredients => res.json(ingredients))
    .catch(next);
});

// router.get('/:id', (req, res, next) => {
//   Ingredient.findById(req.params.id)
//     .then(ingredient => res.json(ingredient))
//     .catch(next);
// });

// router.post('/', (req, res, next) => {
//   Ingredient.findOrCreate({
//     where: {
//       name: req.body.name,
//     },
//     defaults: {
//       estimatedPrice: req.body.estimatedPrice,
//       unit: req.body.unit,
//     }
//   })
//     .spread((newIngredient, isCreated) => {
//       if (isCreated) {
//         res.status(201).json(newIngredient);
//       } else {
//         console.log('Ingredient already existed.');
//       }
//     });
// });

// router.put('/:id', (req, res, next) => {
//   Ingredient.findById(req.params.id)
//     .then((ingredient) => {
//       if (!ingredient) {
//         return res.sendStatus(404);
//       } else {
//         return ingredient.update(req.body);
//       }
//     })
//     .then(updatedIngredient => res.send(updatedIngredient))
//     .catch(next);
// });

// router.delete('/:id', (req, res, next) => {
//   Ingredient.destroy({
//     where: { id: req.params.id }
//   })
//     .then((rowsDeleted) => {
//       res.sendStatus(204);
//     })
//     .catch(next);
// });
