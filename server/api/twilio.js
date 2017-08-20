const router = require('express').Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = router;

router.post('/', (req, res, next) => {
  const userNumber = req.body.number;
  const ingredients = req.body.ingredients;
  client.messages
    .create({
      to: userNumber,
      from: '+19708251391',
      body: ingredients,
    })
    .then(message => console.log(message.sid));
});
