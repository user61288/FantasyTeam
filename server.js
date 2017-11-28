// *** Dependencies

var path = require('path');
var methodOverride = require("method-override");
var LocalStrategy = require('passport-local');

var express = require("express");
var bodyParser = require("body-parser");
var passport   = require('passport');
var session    = require('express-session');
var exphbs = require('express-handlebars');
var env = require('dotenv').load();

// Requiring our models for syncing
var db = require("./models");
//console.log(db);
//console.log(db.Users);

require('./config/passport/passport.js')(passport, db.Users);

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(session({ secret: 'en veetu thotathil',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static("public"));

//For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

var authRoute = require('./routes/auth.js')(app, passport);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});