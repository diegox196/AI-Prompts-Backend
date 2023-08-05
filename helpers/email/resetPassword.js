const sendMail = require('../sendMail');
const fs = require('fs');
const path = require('path');

const sendResetPasswordEmail = async (name, email, verificationToken) => {
  const link = `http://localhost:3000/reset-password?email=${email}&auth_token=${verificationToken}`;

  const templatePath = path.join(__dirname, '../../email_templates/reset_password_email.html');
  const msgHTML = fs.readFileSync(templatePath, 'utf8');

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
    subject: "Reset your password",
    msgPlainText: `To reset your password use the following link: ${link}`,
    msgHTML: formattedHTML,
    logSent: "Reset pasword email successfully sent"
  };
  
  await sendMail(email, name, data.subject, data.msgPlainText, data.msgHTML, data.logSent);
};

module.exports = sendResetPasswordEmail;