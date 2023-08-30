const app = require('express');
const twoFactorAuthRouter = app.Router();

// Middleware
const checkUserAuth = require('../middlewares/userAuth'); // Import the userAuth middleware for user authentication.
const checkUserRoleAuth = require('../middlewares/userRole'); // Import the userRole middleware for user role authorization.
const requiredRole = "user"; // Set the required user role to 'user'.

// Import the openAiController.js module with the functions to handle openAI-related requests.
const { sendCode, verifyCode } = require('../controllers/2FAController.js');

twoFactorAuthRouter.post("/api/2fa/send", checkUserAuth, checkUserRoleAuth([requiredRole]), sendCode);
twoFactorAuthRouter.post("/api/2fa/verify", checkUserAuth, checkUserRoleAuth([requiredRole]), verifyCode);

module.exports = twoFactorAuthRouter;