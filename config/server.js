
require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const consign = require("consign");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



consign()
    .then("routes")
    .into(app);

module.exports = app;