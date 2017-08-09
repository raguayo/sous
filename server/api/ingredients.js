const router = require('express').Router();
const { Ingredient } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Ingredient.findAll()
    .then(ingredients => res.json(ingredients))
    .catch(next);
});
