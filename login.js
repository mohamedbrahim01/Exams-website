document.getElementById("loginForm").addEventListener("submit", function(event){
    let userEmailInput = document.getElementById("Email").value.trim();
    let userPasswordInput = document.getElementById("Password").value;


    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    let valid = true;

    if (!emailRegex.test(userEmailInput)) {
        document.getElementById("emailError").textContent = "Enter a valid email address.";
        valid = false;
    }

    if (!passwordRegex.test(userPasswordInput)) {
        document.getElementById("passwordError").textContent = "Password must be at least 8 characters";
        valid = false;
    }

    if (!valid) {
        event.preventDefault();
        return;
    }


    let storedEmail = localStorage.getItem("userEmail");
    let storedPassword = localStorage.getItem("userPassword");

    if (userEmailInput !== storedEmail || userPasswordInput !== storedPassword) {
        event.preventDefault();
        if (userEmailInput !== storedEmail) {
            document.getElementById("emailError").textContent = "Email not found.";
        }
        if (userEmailInput === storedEmail && userPasswordInput !== storedPassword) {
            document.getElementById("passwordError").textContent = "Incorrect password.";
        }
        return;
    }
    
    window.location.href = "quiz.html";
});

