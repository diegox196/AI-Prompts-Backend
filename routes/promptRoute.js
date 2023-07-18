const app = require('express');
const promptRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');

//Import user http methods
const { getPromptById, getPromptByUserId, getAllPrompts, getPromptsTags, addNewPrompt, updatePromptById, deletePromptById } = require('../controllers/promptController.js');

// User http methods
promptRouter.get('/api/prompt/tags', getPromptsTags);
promptRouter.get("/api/prompt/:id", checkUserAuth, getPromptById);
promptRouter.get("/api/prompt/user/:id", checkUserAuth, getPromptByUserId);
promptRouter.get("/api/prompt", checkUserAuth, getAllPrompts);

promptRouter.post("/api/prompt", checkUserAuth, addNewPrompt);
promptRouter.patch("/api/prompt/:id", checkUserAuth, updatePromptById);
promptRouter.delete("/api/prompt/:id", checkUserAuth, deletePromptById);

module.exports = promptRouter;