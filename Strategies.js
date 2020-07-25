//All user strategies for signup and login 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require("password-hash");
const mysql = require("mysql");

//login strategy
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "FormDataBase",
    password: "zlatodima"
  });

var localStrategyLogin = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
},function(username, password, done){
    var passwordLength = 10;
    var Hashedpassword = passwordHash.generate(password);
    console.log(username);
    
    connection.query("Select * from users where username = ?", [username], function(err, results){
        console.log(results);
        console.log(Hashedpassword);
        if(results == ""){
            console.log("Not found user with this name!");
            return done(null, false, 'Not found user with this name!.');
        }
        else if(!passwordHash.verify(password, results[0].password)){
            console.log("Incorrect password!");
            return done(null, false, 'Incorrect password.');
        }
        var user = {
            username,
            password
        }
        return done(null, user); 
    });
});

//signup strategy
var localStrategySignUp = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    emailField: "email",
    session: false
}, function(username, password, email, done){
    var Hashedpassword = passwordHash.generate(password);
    connection.query("Select * from users where username = ? and email = ?", [username, email], function(err, results){
        console.log("Registrated users: ", results);
        if(results == ""){
            var user = {
                username,
                email,
                password
            }
            //insert user data in sql table with sql query
            const sql = "insert into users(username, email, password) values(?, ?, ?)";
            connection.query(sql, [user.username, user.email, user.hashedPassword], function(err,results){
                if(err) console.log(err);
                else console.log("Data is added!");        
            });

            connection.query("Select * from users",function(err,results){
                console.log("ALL DATA: ", results);
            });
            
            const mail = require("./Send Mail"); 

            var mailOptions = {
                from: 'galdhaym@gmail.com',
                to: email,
                subject: 'Sending Email using Node.js',
                text: "Your username: " + username + "\n" 
                + "Your password: " + password + "\n"
            };

            mail.sendMail(mailOptions,function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        else{
            console.log("User with this username or email exists!");
        }

        return done(null, user); 
    });
});

connection.connect();

module.exports = {
    localStrategyLogin,
    localStrategySignUp
}