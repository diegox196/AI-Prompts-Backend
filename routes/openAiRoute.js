const app = require('express');
const openAiRouter = app.Router();

// Middleware
const checkUserAuth = require('../middlewares/userAuth'); // Import the userAuth middleware for user authentication.
const checkUserRoleAuth = require('../middlewares/userRole'); // Import the userRole middleware for user role authorization.
const requiredRole = "user"; // Set the required user role to 'user'.

// Import the openAiController.js module with the functions to handle openAI-related requests.
const { createImage, createCompletion, createEdit } = require('../controllers/openAiController.js');

/* OpenAI http methods
Define various routes for openAI handling and specify the required authentication and role authorization middleware for each route.*/
openAiRouter.post("/api/openai/image", checkUserAuth, checkUserRoleAuth([requiredRole]), createImage);
openAiRouter.post("/api/openai/completion", checkUserAuth, checkUserRoleAuth([requiredRole]), createCompletion);
openAiRouter.post("/api/openai/edit", checkUserAuth, checkUserRoleAuth([requiredRole]), createEdit);

module.exports = openAiRouter;