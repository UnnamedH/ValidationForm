//express modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { body, validationResult} = require('express-validator');
var passwordHash = require('password-hash');
var session = require("express-session");
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set("view engine", "hbs");
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);

app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));

const passport = require('passport');

var localStrategies = require('./Strategies');
passport.use("local-log-in", localStrategies.localStrategyLogin);
passport.use("local-sign-up", localStrategies.localStrategySignUp);

app.get("/register",
    function(request,response){
        response.render("Modal Validation Form.hbs");  
    }); 

io.on('connection', (socket) => {
  app.post("/register",[
    body("username","Username must be atleast 6 characters!!").isLength({min:6}),
    body("email","Email is not email!").isEmail(),
    body("password","Password must be atleast 10 characters!").isLength({min:10}),
  ], function(req, res, next) {
    const errors = validationResult(req);
    console.log("errors: ", errors);
    if(errors.isEmpty()){
      passport.authenticate('local-sign-up', function(err, user, info) {

          if (err) { return next(err); }
        
          if (!user) { 
              console.log('a user is connected');
              io.emit("message-sign", "The user with this username or email registered!");
              return;
          }
          console.log("The user was registrated!");
          return res.render("User.hbs",{
            username: req.body.username,
          });

      })(req, res, next);   
    }  
  });


    app.get("/login",function(req,res){
    });

    app.post('/login',[
      body("username","Username must be atleast 6 characters!!").isLength({min:6}),
      body("password","Password must be atleast 10 characters!").isLength({min:10}),
    ], function(req, res, next) {
      const errors = validationResult(req);
      console.log("errors: ", errors);
        if(errors.isEmpty()){
            passport.authenticate('local-log-in', function(err, user, info) {
              if (err) { return next(err); }
              if (!user) { 
                io.emit("message-login", "The user with this username or password was not registered!");
                return;
              }
              console.log("The user was found!");
                return res.render("User.hbs", 
                {
                  username: req.body.username,
                });
            })(req, res, next);
        }
      });
});
     

 http.listen(3000);


