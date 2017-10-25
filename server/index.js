const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');

const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;
const app = express();
module.exports = app;

if (process.env.NODE_ENV !== 'production') require('../secrets');

// passport registration
passport.serializeUser((user, done) => {
  // console.log('Passport User', user)
  return done(null, user.id)
})
// console.log('Outside pasport code')
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => {
      // console.log('Passport User', user)
      return done(null, user);
    })
    .catch(done));

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }))
  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

const isForceOn = false;
const syncDb = () => db.sync({ force: isForceOn });

if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening);
} else {
  createApp();
}
