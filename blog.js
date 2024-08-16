import { db } from './firebase-config.js';
import { collection, 
getDocs, 
query, 
orderBy 
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    const allBlogsContainer = document.getElementById('all-blogs');
    allBlogsContainer.innerHTML = '';

    const blogsQuery = query(
        collection(db, "blogs"),
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
        <small>By ${blog.authorName} on ${blog.createdAt.toDate().toLocaleString()}</small>
        `;
    allBlogsContainer.appendChild(blogDiv);
    });

    // Set local time Greetings
    const now = new Date();
    const hours = now.getHours();
    const greetingElement = document.getElementById('greeting');
    if (hours < 12) {
    greetingElement.textContent = "Good Morning";
    } else if (hours < 18) {
    greetingElement.textContent = "Good Afternoon";
    } else {
    greetingElement.textContent = "Good Evening";
    }
});
