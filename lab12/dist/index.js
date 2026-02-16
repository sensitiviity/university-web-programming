var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchPosts } from "./postsApi.js";
const statusElement = document.querySelector("#status");
const reloadBtn = document.querySelector("#reload-posts");
const latestPostsContainer = document.querySelector("#latestPosts");
let state = { status: 'idle' };
function renderState() {
    if (!latestPostsContainer || !statusElement)
        return;
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
        state.data.forEach((post) => {
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
function loadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        state = { status: "loading" };
        renderState();
        try {
            const posts = yield fetchPosts(5);
            state = { status: "success", data: posts };
        }
        catch (err) {
            state = { status: "error", message: "Сталася помилка. Спробуйте пізніше." };
        }
        renderState();
    });
}
reloadBtn === null || reloadBtn === void 0 ? void 0 : reloadBtn.addEventListener("click", () => {
    void loadPosts();
});
renderState();
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
    postElement.append(title, body);
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
        userId: 1,
        id: Date.now(),
        title: titleInput.value.trim(),
        body: bodyInput.value.trim()
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
