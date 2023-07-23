const app = require('express');
const promptRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');
const checkUserRoleAuth = require('../middlewares/userRole');
const requiredRole = 'user';

//Import user http methods
const { getPromptById, getPromptByUserId, getAllPrompts, getPromptsTags, addNewPrompt, updatePromptById, deletePromptById } = require('../controllers/promptController.js');

// User http methods
promptRouter.get('/api/prompts', checkUserAuth, checkUserRoleAuth([requiredRole]), getAllPrompts);
promptRouter.get('/api/prompts/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), getPromptById);
promptRouter.get('/api/prompts/tags', checkUserAuth, checkUserRoleAuth([requiredRole]), getPromptsTags);
promptRouter.get('/api/prompts/user/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), getPromptByUserId);

promptRouter.post('/api/prompts', checkUserAuth, checkUserRoleAuth([requiredRole]), addNewPrompt);
promptRouter.patch('/api/prompts/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), updatePromptById);
promptRouter.delete('/api/prompts/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), deletePromptById);

module.exports = promptRouter;