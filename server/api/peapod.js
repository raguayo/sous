const Peapod = require('../../peapod/api');
const router = require('express').Router();

module.exports = router;

router.post('/', (req, res, next) => {
  const { items } = req.body;
  Peapod.addToCart(items, (err, didSucceed) => {
    if (err) next(err);
    if (didSucceed) {
      res.sendStatus(201);
    }
  });
});
