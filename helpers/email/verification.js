const sendMail = require('../sendMail');
const fs = require('fs');
const path = require('path');


// Función para enviar el correo electrónico de verificación
const sendVerificationEmail = async (name, email, verificationToken) => {

  const link = `http://localhost:3000/verify-email?verify_token=${verificationToken}`;

  const template = "../../email_templates/activation_email.html";
  const msgHTML = fs.readFileSync(path.resolve(template), 'utf8');

  const replacements = {
    name: name,
    action_url: link
  }

  // Replace variables in the HTML content
  let formattedHTML = msgHTML;
  for (const [key, value] of Object.entries(replacements)) {
    const placeholder = new RegExp(`{\\$${key}}`, 'g');
    formattedHTML = formattedHTML.replace(placeholder, value);
  }

  const data = {
    subject: "Email Verification",
    msgPlainText: `To activate your account use the following link: ${link}`,
    msgHTML: formattedHTML,
    logSent: "Verification email successfully sent"
  };

  await sendMail(email, name, data.subject, data.msgPlainText, data.msgHTML, data.logSent);
};

module.exports = sendVerificationEmail;
