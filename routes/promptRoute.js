const app = require('express');
const promptRouter = app.Router();

// Middleware
const checkUserAuth = require('../middlewares/userAuth'); // Import the userAuth middleware for user authentication.
const checkUserRoleAuth = require('../middlewares/userRole'); // Import the userRole middleware for user role authorization.
const requiredRole = 'user'; // Set the required user role to 'user'.

// Import the promptController.js module with the functions to handle prompt-related requests.
const { getPromptById, getPromptByUserId, getAllPrompts, getPromptsTags, addNewPrompt, updatePromptById, deletePromptById } = require('../controllers/promptController.js');

/* Prompt http methods
Define various routes for prompt handling and specify the required authentication and role authorization middleware for each route.
Route to get all prompts. Requires user authentication and 'user' role authorization. */
promptRouter.get('/api/prompts', checkUserAuth, checkUserRoleAuth([requiredRole]), getAllPrompts);
promptRouter.get('/api/prompts/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), getPromptById);
promptRouter.get('/api/prompts/tags', checkUserAuth, checkUserRoleAuth([requiredRole]), getPromptsTags);
promptRouter.get('/api/prompts/user/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), getPromptByUserId);

promptRouter.post('/api/prompts', checkUserAuth, checkUserRoleAuth([requiredRole]), addNewPrompt);
promptRouter.patch('/api/prompts/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), updatePromptById);
promptRouter.delete('/api/prompts/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), deletePromptById);

module.exports = promptRouter;