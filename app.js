import { db } from './firebase-config.js';
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Greeting based on time
const hours = new Date().getHours();
let greeting = 'Good Night';
if (hours >= 6 && hours < 12) {
    greeting = 'Good Morning';
} else if (hours >= 12 && hours < 18) {
    greeting = 'Good Afternoon';
} else if (hours >= 18 && hours < 22) {
    greeting = 'Good Evening';
}
document.getElementById('greeting').textContent = greeting;

// Display all blogs
const displayAllBlogs = async () => {
    const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(blogsQuery);
    const allBlogsList = document.getElementById('all-blogs');
    allBlogsList.innerHTML = '';
    querySnapshot.forEach((doc) => {
        const blog = doc.data();
        allBlogsList.innerHTML += `
            <div class="blog-post">
                <h4>${blog.title}</h4>
                <p>${blog.body}</p>
                <small>${blog.createdAt.toDate().toLocaleString()} by ${blog.userName}</small>
                <button class="btn btn-link" onclick="viewAuthorBlogs('${blog.userId}')">See all blogs from this author</button>
            </div>
        `;
    });
};

displayAllBlogs();

window.viewAuthorBlogs = (userId) => {
    // Implement viewing all blogs from the same author
};
