const app = require('./app'); // app.js file with the Express configuration
require('dotenv').config()

// database connection
const {PORT} = process.env;
require('./database');

//const { login } = require('');

//app.post("/api/login",) 

const userRouter = require('./routes/userRoute');
app.use(userRouter); // Routes for the user http method
 
//session
//app.post("/api/session", sessionPost);

app.listen(PORT, () => {
  console.log(`The server is listening on the PORT ${PORT} (URL http://localhost:${PORT})`);
})