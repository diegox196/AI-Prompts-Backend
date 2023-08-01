const app = require('express');
const accountRouter = app.Router();

// Middleware
const checkUserAuth = require('../middlewares/userAuth'); // Import the userAuth middleware for user authentication.
const checkUserRoleAuth = require('../middlewares/userRole'); // Import the userRole middleware for user role authorization.
const requiredRole = "user"; // Set the required user role to 'user'.

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