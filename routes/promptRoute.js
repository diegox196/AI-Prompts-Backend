const app = require('express');
const promptRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');
const checkUserRoleAuth = require('../middlewares/userRole');
const requiredRole = "user";

//Import user http methods
const { getPromptById, getPromptByUserId, getAllPrompts, getPromptsTags, addNewPrompt, updatePromptById, deletePromptById } = require('../controllers/promptController.js');

// User http methods
promptRouter.get('/api/prompt/tags', checkUserAuth, checkUserRoleAuth([requiredRole]), getPromptsTags);
promptRouter.get("/api/prompt/:id", checkUserAuth, checkUserRoleAuth([requiredRole]), getPromptById);
promptRouter.get("/api/prompt/user/:id", checkUserAuth, checkUserRoleAuth([requiredRole]), getPromptByUserId);
promptRouter.get("/api/prompt", checkUserAuth, checkUserRoleAuth([requiredRole]), getAllPrompts);

promptRouter.post("/api/prompt", checkUserAuth, checkUserRoleAuth([requiredRole]), addNewPrompt);
promptRouter.patch("/api/prompt/:id", checkUserAuth, checkUserRoleAuth([requiredRole]), updatePromptById);
promptRouter.delete("/api/prompt/:id", checkUserAuth, checkUserRoleAuth([requiredRole]), deletePromptById);

module.exports = promptRouter;