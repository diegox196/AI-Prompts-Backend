const app = require('./app'); // app.js file with the Express configuration
require('dotenv').config()

// database connection
const { PORT } = process.env;
require('./database');

//const { login } = require('');

//app.post("/api/login",) 

//user
const userRouter = require('./routes/userRoute');
app.use(userRouter); // Routes for the user http method

//session
const sessionRouter = require('./routes/sessionRoute');
app.use(sessionRouter); // Routes for the session http method

//prompt
const promptRouter = require('./routes/promptRoute');
app.use(promptRouter); // Routes for the prompt http method

//tag
const tagRouter = require('./routes/tagRoute');
app.use(tagRouter); // Routes for the prompt http method

app.listen(PORT, () => {
  console.log(`The server is listening on the PORT ${PORT} (URL http://localhost:${PORT})`);
})