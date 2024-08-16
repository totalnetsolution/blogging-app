import { auth, 
db, 
storage 
} from './firebase-config.js';
import { createUserWithEmailAndPassword, 
updateProfile 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { doc, 
    setDoc 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { ref, 
uploadBytes, 
getDownloadURL 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat-password').value;
    const profilePicture = document.getElementById('profile-picture').files[0];

    if (password !== repeatPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, profilePicture);
        const profilePictureUrl = await getDownloadURL(storageRef);

        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
            photoURL: profilePictureUrl
        });

        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email,
            profilePictureUrl,
            createdAt: new Date()
        });

        alert("User registered successfully!");
        window.location.href = "login.html";

    } catch (error) {
        console.error("Error signing up:", error);
        alert("Error signing up: " + error.message);
    }
});
