document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', function (event) {
        // Getting form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const message = document.getElementById('message').value.trim();

        // Checking if all fields are empty
        if (name === "" && email === "" && phone === "" && address === "" && message === "") {
            alert("You must fill out the form first.");
            event.preventDefault();
            return false;
        }

        // Validating Name
        if (name === "") {
            alert("Please enter your name.");
            event.preventDefault();
            return false;
        }

        // Validating Email
        if (email === "") {
            alert("Please enter your email address.");
            event.preventDefault();
            return false;
        }

        // Validating Email format (must contain @)
        if (!email.includes("@")) {
            alert("Email must contain '@' symbol.");
            event.preventDefault();
            return false;
        }

        // Validatng Phone
        if (phone === "") {
            alert("Please enter your phone number.");
            event.preventDefault();
            return false;
        }

        // Validating Phone length (must be 10 digits)
        if (phone.length !== 10 || isNaN(phone)) {
            alert("Phone number must be exactly 10 digits.");
            event.preventDefault();
            return false;
        }
        // Validating Address
        if (address === "") {
            alert("Please enter your address.");
            event.preventDefault();
            return false;
        }
        // Validating Message section
        if (message === "") {
            alert("Please enter your message.");
            event.preventDefault();
            return false;
        }
        alert("Form submitted successfully!");

        // Prevent default submission to stay on the same page as requested
        event.preventDefault();
        return false;
    });
});
