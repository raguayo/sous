const Peapod = require('../../peapod/api');
const router = require('express').Router();

const config = require('../../secrets');

const peapod = new Peapod(config);

module.exports = router;

router.post('/', (req, res, next) => {
  const { items } = req.body;
  peapod.addToCart(items, (err, didSucceed) => {
    if (err) next(err);
    if (didSucceed) {
      res.sendStatus(201);
    }
  });
});
