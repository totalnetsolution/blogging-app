import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { collection, addDoc, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadBlogs(user.uid);
    } else {
        window.location.href = 'login.html';
    }
});

document.getElementById('new-blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('blog-title').value;
    const body = document.getElementById('blog-body').value;

    try {
        await addDoc(collection(db, "blogs"), {
            uid: auth.currentUser.uid,
            title,
            body,
            createdAt: new Date()
        });

        alert("Blog posted successfully!");
        document.getElementById('new-blog-form').reset();
        loadBlogs(auth.currentUser.uid);
    } catch (error) {
        console.error("Error posting blog:", error);
        alert("Error posting blog: " + error.message);
    }
});

async function loadBlogs(uid) {
    const blogsList = document.getElementById('blogs-list');
    blogsList.innerHTML = '';

    const blogsQuery = query(
        collection(db, "blogs"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(blogsQuery);
    querySnapshot.forEach((doc) => {
        const blog = doc.data();
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog-post');
        blogDiv.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.body}</p>
            <small>${blog.createdAt.toDate().toLocaleString()}</small>
        `;
        blogsList.appendChild(blogDiv);
    });
}
