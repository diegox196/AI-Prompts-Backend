const app = require('express');
const accountRouter = app.Router();

// Import the openAiController.js module with the functions to handle openAI-related requests.
const { registerUser, verifyEmail, forgotPasswordEmail, verifyResetPassword } = require('../controllers/accountController.js');

// Route to register a new user
accountRouter.post('/api/account/register', registerUser);

// Route to verify the user's email
accountRouter.post('/api/account/verify-email', verifyEmail);

// Route to send a reset password email
accountRouter.post('/api/account/forgot-password-email', forgotPasswordEmail);

// Route to verify the reset password token
accountRouter.post('/api/account/verify-reset-password', verifyResetPassword);

module.exports = accountRouter;