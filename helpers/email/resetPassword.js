const generateDynamicEmail = require('./generateDynamicEmail');

/**
 * Sends a reset password email.
 * @param {string} name - The name of the email recipient.
 * @param {string} email - The email address to send the email to.
 * @param {string} verificationToken - The verification token for the reset password link.
 */
const sendResetPasswordEmail = async (name, email, verificationToken) => {
  const link = `${process.env.URL_RESET_PASSWORD}${verificationToken}`; // Construct the reset password link

  // Path the content of the HTML template file
  const filePath = '../../email_templates/reset_password_email.html';

  const data = {
    subject: "Reset your password",
    msgPlainText: `To reset your password use the following link: ${link}`,
    logSent: "Reset pasword email successfully sent"
  };

  await generateDynamicEmail (email, name, filePath, link, data);
};

module.exports = sendResetPasswordEmail;