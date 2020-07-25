var nodeMailer = require("nodemailer");
var transporter = nodeMailer.createTransport({
        service: "gmail",
    auth:{
        user: 'galdhaym@gmail.com',
        pass: 'zlatovdima'
    }
});

module.exports = transporter;