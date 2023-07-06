const app = require('express');
const sessionRouter = app.Router();

//Import user http methods
const { sessionAuth } = require('../controllers/sessionController.js');

// Session http methods
sessionRouter.post("/api/session", sessionAuth);

module.exports = sessionRouter;