const app = require('express');
const promptRouter = app.Router();

//Middleware
//const checkUserAuth = require('../middlewares/userAuth');

//Import user http methods
const { promptGet, promptPost, promptPatch, promptDelete } = require('../controllers/promptController.js');

// User http methods
promptRouter.get("/api/prompt", promptGet);
promptRouter.post("/api/prompt", promptPost);
promptRouter.patch("/api/prompt", promptPatch);
promptRouter.delete("/api/prompt", promptDelete);

module.exports = promptRouter;