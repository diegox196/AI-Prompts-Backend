const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_PUBLIC_KEY,
  process.env.MAILJET_API_SECRET_KEY
);

/**
 * Sends an email using the Mailjet API.
 * @param {string} email - The recipient's email address.
 * @param {string} name - The recipient's name.
 * @param {string} subject - The subject of the email.
 * @param {string} msgPlainText - The email content in plain text format.
 * @param {string} msgHTML - The email content in HTML format.
 * @param {string} logSent - The message to log when the email is successfully sent.
 */
const sendMail = async (email, name, subject, msgPlainText, msgHTML, logSent) => {
  try {
    await mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": process.env.MAILJET_EMAIL_FROM_ADDRESS,
              "Name": process.env.MAILJET_EMAIL_FROM_NAME
            },
            "To": [
              {
                "Email": email,
                "Name": name
              }
            ],
            "Subject": subject,
            "TextPart": msgPlainText,
            "HTMLPart": msgHTML,
            "CustomID": "AppGettingStartedTest"
          }
        ]
      })
    console.log(logSent);
  } catch (err) {
    console.log(err);
  };
};

module.exports = sendMail;