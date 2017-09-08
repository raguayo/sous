const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');

module.exports = router;

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
};

const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;

  User.find({ where: { googleId } })
    .then((user) => {
      if (user) return user;
      return User.create({ name, email, googleId });
    })
    .then(createdUser => done(null, createdUser))
    .catch(done);
});

passport.use(strategy);

router.get('/', passport.authenticate('google', { scope: 'email' }));

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login',
}));
