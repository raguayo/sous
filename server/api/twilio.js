const router = require('express').Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);

module.exports = router;

router.post('/', (req, res, next) => {
  const userNumber = req.body.number;
  let ingredients = req.body.ingredientArr;
  let start = '\n -';
  ingredients = ingredients.map((ingredient) => {
    return ingredient.join(' ');
  });
  const ingredientString = ingredients.join('\n -');
  start = start.concat(ingredientString);
  client.messages
    .create({
      to: userNumber,
      from: twilioNum,
      body: ingredientString,
    })
    .then(message => console.log(message.sid));
});
