const router = require('express').Router();

module.exports = router;

router.use('/users', require('./users'));
router.use('/grocerylists', require('./grocery-lists'));
router.use('/recipes', require('./recipes'));
router.use('/ingredients', require('./ingredients'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
