const router = require('express').Router();
const { User } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email'],
  })
    .then(users => res.json(users))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  User.findById(+req.params.id)
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }
      return user.update(req.body);
    })
    .then(updatedUser => res.send(updatedUser))
    .catch(next);
});
