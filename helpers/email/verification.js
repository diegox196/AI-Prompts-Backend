const generateDynamicEmail = require('./generateDynamicEmail');

/**
 * Send an email to validate the account.
 * @param {string} name - The name of the email recipient.
 * @param {string} email - The email address to send the email to.
 * @param {string} verificationToken - The verification token for the email verification link.
 */
const sendVerificationEmail = async (name, email, verificationToken) => {
  const link = `${process.env.URL_VALIDATE_EMAIL}${verificationToken}`; // Construct the reset password link

  // Path the content of the HTML template file
  const filePath = '../../email_templates/activation_email.html';

  const data = {
    subject: "Email Verification",
    msgPlainText: `To activate your account use the following link: ${link}`,
    logSent: "Verification email successfully sent"
  };

  await generateDynamicEmail (email, name, filePath, link, data);
};

module.exports = sendVerificationEmail;
