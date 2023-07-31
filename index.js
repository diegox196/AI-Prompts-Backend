const app = require('./app'); // app.js file with the Express configuration
require('dotenv').config()

const { PORT } = process.env; // Get the PORT from environment variables
require('./database'); // Import and establish the database connection from database.js

// Import and use userRoute for user-related routes
const userRouter = require('./routes/userRoute');
app.use(userRouter); // Routes for the user http method

// Import and use sessionRoute for session-related routes
const sessionRouter = require('./routes/sessionRoute');
app.use(sessionRouter); // Routes for the session http method

// Import and use promptRoute for prompt-related routes
const promptRouter = require('./routes/promptRoute');
app.use(promptRouter); // Routes for the prompt http method

// Import and use openAiRoute for OpenAI API related routes
const openAiRouter = require('./routes/openAiRoute');
app.use(openAiRouter); // Routes for the open AI http method

const sendSMS = require('./helpers/sendSMS');

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`The server is listening on the PORT ${PORT} (URL http://localhost:${PORT})`);
})