const Peapod = require('../../peapod/api');
const router = require('express').Router();

let peapod;

module.exports = router;

router.post('/', (req, res, next) => {
  console.log('inside route', req.body);
  peapod = new Peapod({
    username: req.body.username,
    password: req.body.password,
  });
  const { items } = req.body;
  peapod.addToCart(items, (err, didSucceed) => {
    console.log('items', items, 'err', err)
    if (err) next(err);
    if (didSucceed) {
      res.sendStatus(201);
    }
  });
});
