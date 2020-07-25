//express modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { body, validationResult} = require('express-validator');
var passwordHash = require('password-hash');

app.set("view engine", "hbs");
app.use(express.static(__dirname));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedParser);

const passport = require('passport');

var localStrategies = require('./Strategies');
passport.use("local-log-in",localStrategies.localStrategyLogin);
passport.use("local-sign-up",localStrategies.localStrategySignUp);

app.use(passport.initialize());  

app.get("/register",
    function(request,response){
        response.render("Modal Validation Form.hbs");   
    }); 

app.post("/register", [//validation
    body("username","Username is empty!").not().isEmpty(),
    body("email","Email is invalid!").isEmail(),
    body("password","Password must be atleast 10 characters!").isLength({ min: 10, max: 20})],
    function(request, response){
        //get user data from form
        var username = request.body.username;
        var email = request.body.email;
        var password = request.body.password;
        console.log("username: ", username); 
        console.log("email: ", email);
        console.log("password: ", password);
        //hashed password
        var hashedPassword = passwordHash.generate(password);
        console.log("Hashed password: ", hashedPassword);
        const errors = validationResult(request);
        //create struct user
        
        if (!errors.isEmpty()) {
            console.log("errors:", JSON.stringify(errors.array()));
        }
        else{

            //check existing accounts with same username or email

        }
});
    

    app.get("/login",function(req,res){
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local-log-in', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) { return console.log("User is not found!");}
          res.render("User.hbs", 
          {
            username: req.body.username,
          });
          console.log("The user was found!");
        })(req, res, next);
      });

    app.listen(3000);


