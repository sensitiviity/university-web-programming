import { Post } from "./types";

const form = document.getElementById("postForm") as HTMLFormElement;
const titleInput = document.getElementById("postTitle") as HTMLInputElement;
const contentInput = document.getElementById("postContent") as HTMLTextAreaElement;
const postsContainer = document.getElementById("postsContainer") as HTMLDivElement;
const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement;
const counter = document.getElementById("counter") as HTMLSpanElement;

if (!form || !titleInput || !contentInput || !postsContainer || !clearBtn || !counter) {
    throw new Error("DOM elements not found");
}

export function renderPost(post: Post): HTMLElement {
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

export function clearPosts(): void {
    postsContainer.innerHTML = "";
    updateCounter();
}

export function updateCounter(): void {
    const count = postsContainer.children.length;
    counter.textContent = count.toString();
}

form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const newPost: Post = {
        id: Date.now(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        createdAt: new Date()
    };

    if(!newPost.title || !newPost.content) return;

    const postElement = renderPost(newPost);
    postsContainer.appendChild(postElement);

    updateCounter();
    form.reset();
}); 

clearBtn.addEventListener("click", () => {
    clearPosts();
});

