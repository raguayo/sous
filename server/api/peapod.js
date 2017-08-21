const Peapod = require("../../peapod/api");
const router = require("express").Router();

  const peapod = new Peapod({
    username: 'wraedy@gmail.com',
    password: 'BI!!yg0at7117',
  });

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
