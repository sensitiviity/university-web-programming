const form = document.getElementById("postForm");
const titleInput = document.getElementById("postTitle");
const contentInput = document.getElementById("postContent");
const postsContainer = document.getElementById("postsContainer");
const clearBtn = document.getElementById("clearBtn");
const counter = document.getElementById("counter");
if (!form || !titleInput || !contentInput || !postsContainer || !clearBtn || !counter) {
    throw new Error("DOM elements not found");
}
export function renderPost(post) {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.dataset.id = post.id.toString();
    const title = document.createElement("h3");
    title.textContent = post.title;
    const content = document.createElement("p");
    content.textContent = post.content;
    const date = document.createElement("small");
    date.textContent = post.createdAt.toLocaleString();
    postElement.appendChild(title);
    postElement.appendChild(content);
    postElement.appendChild(date);
    return postElement;
}
export function clearPosts() {
    postsContainer.innerHTML = "";
    updateCounter();
}
export function updateCounter() {
    const count = postsContainer.children.length;
    counter.textContent = count.toString();
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newPost = {
        id: Date.now(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        createdAt: new Date()
    };
    if (!newPost.title || !newPost.content)
        return;
    const postElement = renderPost(newPost);
    postsContainer.appendChild(postElement);
    updateCounter();
    form.reset();
});
clearBtn.addEventListener("click", () => {
    clearPosts();
});
