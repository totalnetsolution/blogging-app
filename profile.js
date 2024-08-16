import { auth, 
db, 
storage 
} from './firebase-config.js';
import { updateProfile, 
updatePassword 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { ref, 
uploadBytes, 
getDownloadURL 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { doc, 
updateDoc 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const profilePicture = document.getElementById('profile-picture').files[0];
    const newPassword = document.getElementById('password').value;

    try {
     if (profilePicture) {
    const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, profilePicture);
    const profilePictureUrl = await getDownloadURL(storageRef);
    await updateProfile(auth.currentUser, { photoURL: profilePictureUrl });
  }

    await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}` });

     if (newPassword) {
            await updatePassword(auth.currentUser, newPassword);
        }

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            firstName,
            lastName
        });

        alert("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile: " + error.message);
    }
});
