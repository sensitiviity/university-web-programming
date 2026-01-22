const articles = [
    {
        title: "Використання clamp()",
        author: "Охріменко Валерія",
        date: "2025-10-31",
        category: "CSS",
        content: "Як використовувати clamp() для масштабування шрифтів без медіазапитів."
    },
    {
        title: "Різниця між ref() і reactive() у Vue 3",
        author: "Охріменко Валерія",
        date: "2025-11-01",
        category: "JavaScript",
        content: "Просте пояснення того, коли варто використовувати ref(), а коли - reactive(), та чому це важливо для глобального стану."
    },
    {
        title: "Навіщо потрібні хуки навігації у Vue Router",
        author: "Охріменко Валерія",
        date: "2025-11-02",
        category: "JavaScript",
        content: "Прості приклади beforeEach та beforeResolve і пояснення, де який хук доцільніше застосовувати."
    },
    {
        title: "Семантичні теги HTML",
        author: "Охріменко Валерія",
        date: "2025-10-29",
        category: "HTML",
        content: "Як семантика впливає на доступність, структурність та читабельність коду."
    }
];

const postsContainer = document.querySelector("#blog-posts");
const counterEl = document.querySelector("#counter");
const toolbar = document.querySelector("#toolbar");
const btnAll = document.querySelector("#btnAll");
const searchInput = document.querySelector("#searchTitle");
const searchBtn = document.querySelector("#searchBtn");

const renderArticle = ({ title, author, date, category, content }) => `
    <article class="post" data-category="${category}">
        <h2>${title}</h2>
        <p class="meta">
            Автор: <b>${author}</b> |
            Категорія: <i>${category}</i> |
            ${new Date(date).toLocaleDateString("uk-UA")}
        </p>
        <p>${content}</p>
    </article>
`;

const countArticles = list => list.length;

const renderAll = (list = articles) => {
    postsContainer.innerHTML = list.map(renderArticle).join("");
    counterEl.textContent = `Кількість нотаток: ${countArticles(list)}`;
};

const getCategories = () => Array.from(new Set(articles.map(a => a.category)));

const renderCategoryButtons = () => { 
    toolbar.querySelectorAll("[data-filter]").forEach(b => b.remove());

    getCategories().forEach(category => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = category;
        btn.dataset.filter = category;
        btn.setAttribute("aria-pressed", "false");
        btnAll.insertAdjacentElement("afterend", btn);
    });        
};

const filterByCategory = category => articles.filter(a => a.category === category);

const findByTitle = query => articles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));

toolbar.addEventListener("click", e => {
    const btn = e.target.closest(".btn");
    if (!btn) return;

    toolbar.querySelectorAll(".btn").forEach(b => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");

    if (btn.id === "btnAll") {
        renderAll(articles);
        return;
    }

    if (btn.dataset.filter) {
        const list = filterByCategory(btn.dataset.filter);
        console.log(list);
        renderAll(list);
    }
});

const doSearch = () => {
    const query = searchInput.value.trim();
    if (!query) return;

    const results = findByTitle(query);
    console.log(results);

    renderAll(results);
};

searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", e => { 
    if (e.key === "Enter") doSearch();
});

renderCategoryButtons();
renderAll();

