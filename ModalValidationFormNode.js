//express modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { body, validationResult} = require('express-validator');
var passwordHash = require('password-hash');
var session = require("express-session");
var http = require('http').Server(app);
var io = require('socket.io')(http);
const FileStore = require('session-file-store')(session);
const uuid = require('uuid')
var MySQLStore = require('express-mysql-session')(session);

app.set("view engine", "hbs");
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);

const passport = require('passport');

var localStrategies = require('./Strategies');
const { config } = require("process");

var options = ({
  host: "localhost",
  user: "root",
  database: "sessionStorage",
  password: "zlatodima"
});

//var sessionStore = new MySQLStore(options);

app.use(session({
  //store: sessionStore,
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}));

/*passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));*/

passport.use("local-log-in", localStrategies.localStrategyLogin);
passport.use("local-sign-up", localStrategies.localStrategySignUp);

app.use(passport.initialize());
app.use(passport.session());

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
          return res.redirect("/profile");

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
              req.login(user, (err) => {
                if (err) { return next(err); }
                return res.redirect('/profile/' + user.id);
              })
            })(req, res, next);
        }
      });
});

    app.get("/profile/:id", checkAuthentication, function(req, res, next) {
      if(req.sessionID == req.params.id){
        res.render("User.hbs", 
        {
          username: req.body.username,
        });
      }
      else{
        console.log("Page is not found!");
        res.send("Page is not found!");
      }
    });

    app.post("/profile/:id",checkAuthentication, function(req, res, next) {
      res.clearCookie('connect.sid');
      res.redirect('/register');
    });

    function checkAuthentication(req,res,next){
      if(req.isAuthenticated()){
        console.log("isAuthenticated!");
          next();
      } else{
        console.log("isNotAuthenticated!");
          res.send("Page is not found!");
      }
    }
http.listen(process.env.PORT);


