const router = require('express').Router();
const { GroceryList } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  GroceryList.findAll()
    .then(groceryLists => res.json(groceryLists))
    .catch(next);
});
