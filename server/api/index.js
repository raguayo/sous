const router = require('express').Router();

module.exports = router;

router.use('/users', require('./users'));
router.use('/grocery-list', require('./groceryLists'));
router.use('/recipes', require('./recipes'));
router.use('/ingredients', require('./ingredients'));
router.use('/peapod', require('./peapod'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
