

document.getElementById("registrationForm").addEventListener("submit", function(event){
    let userFnameInput = document.getElementById("fname").value.trim();
    let userLnameInput = document.getElementById("lname").value.trim();
    let userEmailInput = document.getElementById("Email").value.trim();
    let userPasswordInput = document.getElementById("Password").value;
    let userConfirmPasswordInput = document.getElementById("confirmPassword").value;


    document.querySelectorAll(".error").forEach(span => span.textContent = "");

    let nameRegex = /^[A-Za-z]{2,}$/;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    let valid = true;

    if (!nameRegex.test(userFnameInput)) {
        document.getElementById("fnameError").textContent = "Enter your first name";
        valid = false;
    }

    if (!nameRegex.test(userLnameInput)) {
        document.getElementById("lnameError").textContent = "Enter your last name";
        valid = false;
    }

    if (!emailRegex.test(userEmailInput)) {
        document.getElementById("emailError").textContent = "Enter a valid email.";
        valid = false;
    }

    if (!passwordRegex.test(userPasswordInput)) {
        document.getElementById("passwordError").textContent = "Password must be at least 8 characters";
        valid = false;
    }

    if (userPasswordInput !== userConfirmPasswordInput) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
        valid = false;
    }

    if (!valid) {
        event.preventDefault();
        return;
    }

    localStorage.setItem("userEmail", userEmailInput);
    localStorage.setItem("userPassword", userPasswordInput);

let users = JSON.parse(localStorage.getItem("users")) || [];

if (!users.some(user => user.email === "Admin")) {
    users.push({
        email: "Admin",
        password: "Admin",
        role: "admin"
    });
}

users.push({
    email: userEmailInput,
    password: userPasswordInput,
    role: "user"
});

localStorage.setItem("users", JSON.stringify(users));


    window.location.href = "Login.html";
});



