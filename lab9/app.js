document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

async function loadData(){
    const statusParag = document.getElementById('status');
    const userListUl = document.getElementById('userList');
    statusParag.textContent = 'Завантаження...';
    userListUl.textContent = '';

    try{
        const response = await fetch('datas.json');
        if(!response.ok){
            throw new Error(`not found ${response.status}`);
        }
        const data = await response.json();
        if(!Array.isArray(data)){
            throw new Error('Некоректний формат даних');
        }

        showDataList(data);
        console.log('Дані успішно отримано');
        statusParag.textContent = '';
    }catch(err){
        console.log(err);
        statusParag.textContent = 'Помилка: не вдалося відобразити дані';
    }
}

function showDataList(users){
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        userList.appendChild(li);
    });
}







/*
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});

async function loadData(){
    const statusEl = document.getElementById('status');
    const userList = document.getElementById('userList');
    statusEl.textContent = 'Завантаження…';
    userList.innerHTML = '';

    try{
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP помилка: ${response.status}`);
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('Некоректний формат даних');
        }

        renderUsers(data);
        statusEl.textContent = 'Дані успішно завантажено';
    } catch(error) {
        console.error('Помилка завантаження:', error);
        statusEl.textContent = 'Помилка: не вдалося завантажити дані';
    }
}

function renderUsers(users){
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        userList.appendChild(li);
    });
}
*/