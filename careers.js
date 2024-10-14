var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 5000;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "docs")));

// GET route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "docs/careers.html"));
});

// POST route for sending email
app.post('/send_email', function (req, res) {
    var fullName = req.body.fullName;
    var email = req.body.email;
    var phone = req.body.phone;
    var applicationType = req.body.applicationType; // Capture the correct selected value

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ibelete2000@gmail.com', // Your email
            pass: 'snsrdvhcokrogsef' // Use environment variables for security in production
        }
    });

    var mailOptions = {
        from: email, // Applicant's email
        to: 'ibelete2000@gmail.com', // Replace with the recipient's email
        subject: `Application Type: ${applicationType}`,
        text: `Full Name: ${fullName}\nPhone: ${phone}\nApplication Type: ${applicationType}` // Email content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true }); // Send a JSON response after successful email sending
        }
    });
});

// web server
server.listen(port, function () {
    console.log("Express server listening on port " + port);
});
