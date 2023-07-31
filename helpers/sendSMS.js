require('dotenv').config();

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const generateCode = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const test = `Your AI Prompt verification code is: ${generateCode()}`;
console.log(test);

/*client.messages
  .create({
    body: `Your AI Prompt verification code is: ${generateCode}`,
    from: '+14706135145',
    to: '+50685742510'
  })
  .then(message => console.log(message.sid))
  .done();*/