import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Signup
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;

    if (password !== repeatPassword) {
        alert("Passwords do not match");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateProfile(userCredential.user, {
                displayName: `${firstName} ${lastName}`
            }).then(() => {
                window.location.href = './dashboard.html';
            });
        })
        .catch((error) => {
            console.error("Error signing up:", error);
        });
});

// Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = './dashboard.html';
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
});

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('nav-login').style.display = 'none';
        document.getElementById('nav-signup').style.display = 'none';
        document.getElementById('nav-user').style.display = 'block';
        document.getElementById('user-name').textContent = user.displayName;
        if (window.location.pathname.includes('./login.html') || window.location.pathname.includes('./signup.html')) {
            window.location.href = './dashboard.html';
        }
    } else {
        document.getElementById('nav-login').style.display = 'block';
        document.getElementById('nav-signup').style.display = 'block';
        document.getElementById('nav-user').style.display = 'none';
    }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = './index.html';
    });
});
