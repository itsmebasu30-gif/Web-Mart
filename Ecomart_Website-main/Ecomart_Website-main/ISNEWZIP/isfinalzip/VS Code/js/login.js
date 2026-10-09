document.addEventListener('DOMContentLoaded', function () {
    // Get the modal
    let modal = document.getElementById("loginModal");

    // Get the button that opens the modal
    let btn = document.querySelector(".login-btn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    if (btn) {
        btn.onclick = function (event) {
            event.preventDefault(); // Prevent navigation to Login.html
            modal.style.display = "block";
        }
    }

    // When the user clicks on <span> (x), close the modal
    if (span) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Login Form Validation
    const loginForm = document.querySelector("#loginModal .login-form");
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {

            const usernameInput = loginForm.querySelector('input[name="username"]');
            const passwordInput = loginForm.querySelector('input[name="password"]');

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Check if all fields are empty
            if (username === "" && password === "") {
                alert("You must fill out the form first.");
                event.preventDefault();
                return false;
            }

            // Validate Username
            if (username === "") {
                alert("Please enter your username.");
                event.preventDefault();
                return false;
            }

            // Validate Password
            if (password === "") {
                alert("Please enter your password.");
                event.preventDefault();
                return false;
            }

            // If all validations pass
            alert("Login Successful!");
            event.preventDefault(); // Prevent actual submission as per requirement
            modal.style.display = "none";
            loginForm.reset();
        });
    }
});
     