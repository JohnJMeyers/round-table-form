const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

// var http = require('http');
// var path = require('path');
// var os = require('os');
// var fs = require('fs');

var Busboy = require('busboy');


app.engine('mustache', mustacheExpress() );
app.set('view engine', 'mustache')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/signup", function (req, res) {
  res.render("contact-form");
})

app.post("/contact", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const Birthyear = req.body.Birthyear;
  const position = req.body.position;
  const password = req.body.password;

  req.checkBody('name', 'You must enter your name!').notEmpty();
  req.checkBody('name', 'Your name cannot exceed 100 characters!').isLength({max: 100});
  req.checkBody('email', 'You must enter a valid email address!').isEmail();
  req.checkBody('email', 'Your email cannot exceed 100 characters!').isLength({max: 100});
  req.checkBody('Birthyear', "Your Birthyear must be a number between 1900 and 2017").isInt({min: 1900, max: 2017});
  req.checkBody('password', "You must enter your password!").notEmpty();
  req.checkBody('password', "Your password must be at least 8 characters long!").isLength({min: 8});
  var errors = req.validationErrors();

  if (errors) {
    res.render("contact-form", {
      errors: errors,
      name: name,
      email: email,
      Birthyear: Birthyear,
    })

  } else {

  res.render("contact-thanks", {
    name: name,
    email: email,
    Birthyear: Birthyear,
  })
}
})



app.listen(3000, function () {
  console.log('Successfully started express application!')
});
