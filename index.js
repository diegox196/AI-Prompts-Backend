const express = require('express');
const app = express();
const PORT = 3201;

// database connection
const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1:27017/aipromts";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

//Import user http methods
const {userGet, userPost, userPatch, userDelete} = require('./controllers/userController.js');

// User http methods
app.get("/api/user", userGet);
app.post("/api/user", userPost);
app.patch("/api/user", userPatch);
app.delete("/api/user", userDelete);

//session
//app.post("/api/session", sessionPost);

app.listen(PORT, () => {
  console.log(`The server is listening on the PORT ${PORT} (URL http://localhost:${PORT})`);
})