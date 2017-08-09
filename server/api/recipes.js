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

// router.post('/', (req, res, next) => {
//   console.log('req.body: ', req.body);
//   Recipe.findOrCreate({
//     where: {
//       title: req.body.title,
//       author: req.body.author,
//     },
//   })
//     .spread((newRecipe, isCreated) => {
//       res.status(201).json(newRecipe);
//     });
// });
