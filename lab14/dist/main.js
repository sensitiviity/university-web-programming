const postsContainer = document.getElementById("posts");
const counterElem = document.getElementById("counter");
const openFormBtn = document.getElementById("openFormBtn");
const formSection = document.getElementById("postFormSection");
const addBtn = document.getElementById("addPost");
const clearBtn = document.getElementById("clearPosts");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
let posts = [];
function renderPost(post) {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.dataset.id = post.id.toString();
    const title = document.createElement("h3");
    title.textContent = post.title;
    const body = document.createElement("p");
    body.textContent = post.body;
    const date = document.createElement("small");
    date.textContent = post.createdAt.toLocaleString();
    postElement.append(title, body, date);
    return postElement;
}
function clearPosts() {
    postsContainer.innerHTML = "";
    posts = [];
    updateCounter();
}
function updateCounter() {
    const count = postsContainer.children.length;
    counterElem.textContent = `Усього постів: ${count}`;
}
function toggleForm() {
    formSection.hidden = !formSection.hidden;
}
addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const newPost = {
        id: Date.now(),
        title: titleInput.value.trim(),
        body: bodyInput.value.trim(),
        createdAt: new Date()
    };
    if (!newPost.title || !newPost.body)
        return;
    const postElement = renderPost(newPost);
    postsContainer.appendChild(postElement);
    updateCounter();
    titleInput.value = "";
    bodyInput.value = "";
});
openFormBtn.addEventListener("click", (e) => toggleForm());
clearBtn.addEventListener("click", (e) => clearPosts());
export {};
