const app = require('express');
const sessionRouter = app.Router();

// Import the sessionAuth function from the sessionController.js module.
const { sessionAuth } = require('../controllers/sessionController.js');

// Define a single route to handle session authentication via HTTP POST request.
sessionRouter.post("/api/sessions", sessionAuth);

module.exports = sessionRouter;