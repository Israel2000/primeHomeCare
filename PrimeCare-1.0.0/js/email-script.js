function sendMail(){
    let params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    }
    
    emailjs.send("service_2351vj5", "template_3d0969z", params)
    .then(function(response) {
        alert("Email has been sent!"); // Display alert after email is sent successfully
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        alert("There was an error sending the email."); // Display alert if there's an error
        console.log('FAILED...', error);
    });
}
