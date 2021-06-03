function sendMail(contactForm) {
    emailjs.send("service_dqz0v8x","template_vnrzsbx", {
       "from_name": contactForm.name.value,
       "from_email": contactForm.emailaddress.value,
       "project_request": contactForm.usermessage.value
    })
    .then(
        function(response){
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        });
        return false;}

function thankYou() {

    document.querySelector(".contact-form").innerHTML = `<h4>Thank you for your message.</h4>
    <p>We will be in contact with you shortly.</p>`
};