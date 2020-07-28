//express modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { body, validationResult} = require('express-validator');
var passwordHash = require('password-hash');
var session = require("express-session");

app.set("view engine", "hbs");
app.use(express.static(__dirname));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));

const flash = require("connect-flash");
app.use(flash());

const passport = require('passport');

var localStrategies = require('./Strategies');
passport.use("local-log-in", localStrategies.localStrategyLogin);
passport.use("local-sign-up", localStrategies.localStrategySignUp);

app.use(passport.initialize());  

app.get("/register",
    function(request,response){
        response.render("Modal Validation Form.hbs");   
    }); 

app.post("/register",function(req, res, next) {
  passport.authenticate('local-sign-up', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return console.log("User exists!");}
    
    res.render("User.hbs", 
    {
      username: req.body.username,
    });

    console.log("The user was found!");
  })(req, res, next);     
});
    
    app.get("/login",function(req,res){
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-log-in', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) { return console.log("User does not exist!");}
          res.render("User.hbs", 
          {
            username: req.body.username,
          });
          console.log("The user was found!");
        })(req, res, next);
      });

    app.listen(3000);


