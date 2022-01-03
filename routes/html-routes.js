const path = require("path")
const express = require('express');
const exphbs = require("express-handlebars")
const router = express.Router();
const app = express();

app.engine
//go to index.js and pull all those lines

module.exports = function(app){
    app.get("/login", (req, res) => {
        if (req.user) {
            return res.redirect("/")
        }
        res.sendFile(path.join(__dir, "../login.html"))
    });

    app.get('/', (req, res) => {
        res.render('index')
    })
}

