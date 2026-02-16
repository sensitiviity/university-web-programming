import { Post, PostsState } from "./types.js";
import { fetchPosts } from "./postsApi.js";

const statusElement = document.querySelector<HTMLParagraphElement>("#status");
const reloadBtn = document.querySelector<HTMLButtonElement>("#reload-posts");
const latestPostsContainer = document.querySelector<HTMLDivElement>("#latestPosts");

let state: PostsState = {status: 'idle'};

function renderState(): void {
    if (!latestPostsContainer || !statusElement) return;

    statusElement.textContent = "";
    latestPostsContainer.innerHTML = "";

    if (state.status === "idle") {
        statusElement.textContent = "Натисніть «Оновити пости», щоб завантажити дані.";
    }

    if (state.status === "loading") {
        statusElement.textContent = "Завантаження постів…";
    }

    if (state.status === "error") {
        statusElement.textContent = state.message;
    }

    if (state.status === "success") {
        statusElement.textContent = `Показано ${state.data.length} постів`;

        state.data.forEach((post: Post) => {
            const article = document.createElement("article");
            article.className = "post";

            const title = document.createElement("h3");
            title.textContent = post.title;

            const body = document.createElement("p");
            body.textContent = post.body.slice(0, 115) + "...";

            article.append(title, body);
            latestPostsContainer.appendChild(article);
        });
    }
}

async function loadPosts(): Promise<void> {
    state = {status: "loading"};
    renderState();

    try{
        const posts = await fetchPosts(5);
        state = {status: "success", data: posts};
    }catch(err){
        state = {status: "error", message: "Сталася помилка. Спробуйте пізніше."}
    }

    renderState();
}

reloadBtn?.addEventListener("click", () => {
    void loadPosts();
})

renderState();



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

    postElement.append(title, body);

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
        userId: 1,
        id: Date.now(),
        title: titleInput.value.trim(),
        body: bodyInput.value.trim()
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




