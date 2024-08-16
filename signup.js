import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const auth = getAuth();

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           
            alert('User registered successfully!');
           
            document.getElementById('signup-form').reset();
        })
        .catch((error) => {
            console.error("Error registering user:", error);
            alert("Error: " + error.message);
        });
});
