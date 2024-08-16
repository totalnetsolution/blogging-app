import { db, auth } from './firebase-config.js';
import { collection, addDoc, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Posting a new blog
document.getElementById('blog-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const user = auth.currentUser;

    if (user) {
        await addDoc(collection(db, 'blogs'), {
            title: title,
            body: body,
            userId: user.uid,
            userName: user.displayName,
            createdAt: new Date()
        });
        window.location.reload();
    }
});

// Display user's blogs
const displayBlogs = async () => {
    const user = auth.currentUser;
    if (user) {
        const blogsQuery = query(collection(db, 'blogs'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(blogsQuery);
        const blogsList = document.getElementById('blogs-list');
        blogsList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const blog = doc.data();
            blogsList.innerHTML += `
                <div class="blog-post">
                    <h4>${blog.title}</h4>
                    <p>${blog.body}</p>
                    <small>${blog.createdAt.toDate().toLocaleString()}</small>
                </div>
            `;
        });
    }
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        displayBlogs();
    } else {
        window.location.href = './index.html';
    }
});
