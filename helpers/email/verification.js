const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// Función para enviar el correo electrónico de verificación
const sendVerificationEmail = async (email, verificationToken) => {

  const link = `http://localhost:3000/verify-email?verify_token=${verificationToken}`;

  const msg = {
    to: email,
    from: 'quesada1690@gmail.com',
    subject: 'Please verify your account',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  console.log(msg);
  console.log(process.env.SENDGRID_API_KEY);

  await sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.error(error)
    })

  console.log(`http://localhost:3000/verify-email?verify_token=${verificationToken}`);
};

module.exports = sendVerificationEmail;
