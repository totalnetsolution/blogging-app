import { auth, db } from './firebase-config.js';
import { updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const password = document.getElementById('password').value;
    const user = auth.currentUser;

    if (user) {
        if (firstName && lastName) {
            await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        }
        if (password) {
            await updatePassword(user, password);
        }
        window.location.reload();
    }
});
