const express = require('express');
const app = express();
const PORT = 3201;

// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/aipromts", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// users
/*app.get("/api/users", usersGet);
app.post("/api/users", usersPost);*/

//session
//app.post("/api/session", sessionPost);

app.listen(PORT, () => {
  console.log(`The server is listening on the PORT ${PORT} (URL http://localhost:${PORT} )`);
})