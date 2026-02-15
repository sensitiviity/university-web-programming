import { Post } from "./types.js";

const postsContainer = document.getElementById("posts") as HTMLDivElement;
const counterElem = document.getElementById("counter") as HTMLParagraphElement;
const openFormBtn = document.getElementById("openFormBtn") as HTMLButtonElement;
const formSection = document.getElementById("postFormSection") as HTMLElement;
const addBtn = document.getElementById("addPost") as HTMLButtonElement;
const clearBtn = document.getElementById("clearPosts") as HTMLButtonElement;
const titleInput = document.getElementById("titleInput") as HTMLInputElement;
const bodyInput = document.getElementById("bodyInput") as HTMLTextAreaElement;

let posts: Post[] = [];

function renderPost(post: Post): HTMLElement {
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

function clearPosts(): void {
    postsContainer.innerHTML = "";
    posts = [];
    updateCounter();
}

function updateCounter(): void {
    const count = postsContainer.children.length;
    counterElem.textContent = `Усього постів: ${count}`;
}

function toggleForm(): void {
    formSection.hidden = !formSection.hidden;
}

addBtn.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();

    const newPost: Post = {
        id: Date.now(),
        title: titleInput.value.trim(),
        body: bodyInput.value.trim(),
        createdAt: new Date()
    };

    if(!newPost.title || !newPost.body) return;

    const postElement = renderPost(newPost);
    postsContainer.appendChild(postElement);

    updateCounter();
    titleInput.value = "";
    bodyInput.value = "";
}); 

openFormBtn.addEventListener("click", (e: MouseEvent) => toggleForm());

clearBtn.addEventListener("click", (e: MouseEvent) => clearPosts());




