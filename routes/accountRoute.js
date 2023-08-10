const app = require('express');
const accountRouter = app.Router();

// Import the openAiController.js module with the functions to handle openAI-related requests.
const { registerUser, verifyEmail, forgotPassword, verifyResetPassword } = require('../controllers/accountController.js');

// Route to register a new user
accountRouter.post('/api/accounts/register', registerUser);

// Route to verify the user's email
accountRouter.patch('/api/accounts/:auth_token/verify-email', verifyEmail);

// Route to send a reset password email
accountRouter.post('/api/accounts/forgot-password', forgotPassword);

// Route to change the account password
accountRouter.patch('/api/accounts/:auth_token/reset-password', verifyResetPassword);

module.exports = accountRouter;