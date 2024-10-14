var express = require('express');
var http = require('http');
var path = require('path');
//nodemailer
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "docs/careers.html")));

// routing
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "docs/careers.html"));
})

// post
app.post('/', function(req, res) {
    var name = req.body.fullName;
    var email = req.body.email;
    var phone = req.body.phone;
    var applicationTypedropdown = req.body.applicationType;
    // var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ibelete2000@gmail.com',
            pass: 'snsrdvhcokrogsef'
        }   
    });
    
    var mailOptions = {
        from: 'ibelete2000@gmail.com',
        to: 'ibelete2000@gmail.com',
        subject: subject,
        text: fullName + " " + email + " " + phone + applicationTypedropdown
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            // res.redirect('');
        } else {
            console.log('Email sent: ' + info.res);
            res.redirect('docs/careers.html');
        }
    })
})

// web server
server.listen(port, function() {
    console.log("Express server listening on port " + port);
})