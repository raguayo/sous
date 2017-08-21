const Peapod = require('../../peapod/api');
const router = require('express').Router();

let peapod;

module.exports = router;

router.post('/', (req, res, next) => {
  console.log('req.body.username: ', req.body.username);
  console.log('req.body.password: ', req.body.password);
  peapod = new Peapod({
    username: req.body.username,
    password: req.body.password,
  });
  const { items } = req.body;
  peapod.addToCart(items, (err, didSucceed) => {
    if (err) next(err);
    if (didSucceed) {
      res.sendStatus(201);
    }
  });
});
