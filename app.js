const express = require('express');
const app = express();

// Convert the data received in requests to the server into JSON objects. (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

module.exports = app;