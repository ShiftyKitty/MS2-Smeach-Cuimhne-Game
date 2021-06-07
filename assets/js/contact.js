
// Sends mail to my email address when user submits message on Contact Us page
// Code retrieved from Code Institute and altered for my assignment.
function sendMail(contactForm) {
    emailjs.send("service_dqz0v8x","template_vnrzsbx", {
       "from_name": contactForm.name.value,
       "from_email": contactForm.emailaddress.value,
       "project_request": contactForm.usermessage.value,
       "sign_up": contactForm.signup.value
    })
    .then(
        //Thank you for contacting message to appear once user has successfully submitted a message
        function thankYou() {
            document.querySelector(".contact-form").innerHTML = `<h4>Thank you for your message.</h4>
            <p>We will be in contact with you shortly.</p>`
        },
        function(response){
            
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        });

        return false;}


