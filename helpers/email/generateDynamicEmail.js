const sendMail = require('../sendMail');
const fs = require('fs');
const path = require('path');

/**
 * Generates and sends a dynamic email.
 * @param {string} name - The name of the email recipient.
 * @param {string} email - The email address to send the email to.
 * @param {string} filePath - The relative path to the HTML template file.
 * @param {string} link - The link to include in the email's content.
 * @param {object} data - An object containing email-related data.
 * @param {string} data.subject - The subject of the email.
 * @param {string} data.msgPlainText - The plain text version of the email content.
 * @param {string} data.msgPlainText - The plain text version of the email content.
 * @param {string} data.logSent - Log message indicating that the email was sent successfully.
 */
const generateDynamicEmail = async (email, name, filePath, link, data) => {

  // Read the content of the HTML template file
  const templatePath = path.join(__dirname, filePath);
  const msgHTML = fs.readFileSync(templatePath, 'utf8');

  const replacements = {
    name: name,
    action_url: link
  };

  // Replace variables in the HTML template content
  let formattedHTML = msgHTML;
  for (const [key, value] of Object.entries(replacements)) {
    // For example, if key is "name", the regular expression will be `/{$name}/g`.
    const placeholder = new RegExp(`{\\$${key}}`, 'g');
    formattedHTML = formattedHTML.replace(placeholder, value);
  };

  await sendMail(email, name, data.subject, data.msgPlainText, formattedHTML, data.logSent);
};

module.exports = generateDynamicEmail;