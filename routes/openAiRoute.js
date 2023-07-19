const app = require('express');
const openAiRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');
const checkUserRoleAuth = require('../middlewares/userRole');
const requiredRole = "user";

//Import open ai http methods
const { createImage, createCompletion, createEdit } = require('../controllers/openAiController.js');

// open ai http methods
openAiRouter.post("/api/openai/image", checkUserAuth, checkUserRoleAuth([requiredRole]), createImage);
openAiRouter.post("/api/openai/completion", checkUserAuth, checkUserRoleAuth([requiredRole]), createCompletion);
openAiRouter.post("/api/openai/edit", checkUserAuth, checkUserRoleAuth([requiredRole]), createEdit);

module.exports = openAiRouter;