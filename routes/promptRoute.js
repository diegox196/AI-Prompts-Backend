const app = require('express');
const promptRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');

//Import user http methods
const { promptGet, promptPost, promptPatch, promptDelete } = require('../controllers/promptController.js');

// User http methods
promptRouter.get("/api/prompt", checkUserAuth, promptGet);
promptRouter.post("/api/prompt", checkUserAuth, promptPost);
promptRouter.patch("/api/prompt", checkUserAuth, promptPatch);
promptRouter.delete("/api/prompt", checkUserAuth, promptDelete);

module.exports = promptRouter;