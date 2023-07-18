const app = require('express');
const openAiRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');

//Import open ai http methods
const {createImage, createCompletion, createEdit} = require('../controllers/openAiController.js');

// open ai http methods
openAiRouter.post("/api/openai/image", checkUserAuth, createImage);
openAiRouter.post("/api/openai/completion", checkUserAuth, createCompletion);
openAiRouter.post("/api/openai/edit", checkUserAuth, createEdit);

module.exports = openAiRouter;