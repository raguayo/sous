const router = require('express').Router();
const { GroceryList } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  GroceryList.findAll()
    .then(groceryLists => res.json(groceryLists))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  GroceryList.findById(req.params.id)
    .then(groceryList => res.json(groceryList))
    .catch(next);
});

router.post('/', (req, res, next) => {
  GroceryList.create(req.body)
    .then((newGroceryList) => {
      res.status(201).json(newGroceryList);
    });
});

router.put('/:id', (req, res, next) => {
  GroceryList.findById(req.params.id)
    .then((groceryList) => {
      if (!groceryList) {
        return res.sendStatus(404);
      } else {
        return groceryList.update(req.body);
      }
    })
    .then(updatedGroceryList => res.send(updatedGroceryList))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  GroceryList.destroy({
    where: { id: req.params.id }
  })
    .then((rowsDeleted) => {
      res.sendStatus(204);
    })
    .catch(next);
});
