// Створення динамічної таблиці 6x6
document.addEventListener("DOMContentLoaded", function () {
    const variant = 5; // Варіант користувача
    const table = document.getElementById("taskTable");
    let selectedCell;
    const colorPicker = document.getElementById("colorPicker");

    // Генерація таблиці
    let number = 1;
    for (let i = 0; i < 6; i++) {
        let row = table.insertRow();
        for (let j = 0; j < 6; j++) {
            let cell = row.insertCell();
            cell.textContent = number++;
            cell.addEventListener('mouseover', () => hoverCell(cell, variant));
            cell.addEventListener('click', () => clickCell(cell));
            cell.addEventListener('dblclick', () => dblClickCell(cell));
        }
    }

    // Наведення на клітинку
    function hoverCell(cell, variant) {
        if (parseInt(cell.textContent) === variant) {
            const randomColor = getRandomColor();
            cell.style.backgroundColor = randomColor;
        }
    }

    // Клік на клітинку
    function clickCell(cell) {
        selectedCell = cell;
        const userColor = colorPicker.value; // Вибір кольору з палітри
        cell.style.backgroundColor = userColor;
    }

    // Подвійний клік на клітинку
    function dblClickCell(cell) {
        const row = cell.parentElement.rowIndex;
        const col = cell.cellIndex;

        // Логіка зміни кольору всіх клітинок крім обраної
        for (let i = 0; i < table.rows.length; i++) {
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                const currentCell = table.rows[i].cells[j];
                // Якщо клітинка з числом 5, залишаємо білим
                if (currentCell.textContent === '5') {
                    currentCell.style.backgroundColor = 'white';
                } else if (!(i === row && j === col)) {
                    currentCell.style.backgroundColor = getRandomColor();
                }
            }
        }
    }

    // Функція для отримання випадкового кольору
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});

// Валідація форми
document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const group = document.getElementById('group').value.trim();
    const variant = document.getElementById('variant').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    // Регулярні вирази для валідації
    const namePattern = /^[А-ЯІЇЄа-яіїє\s]+$/;
    const groupPattern = /^[А-ЯІЇЄҐ]{2}-\d{2}$/;
    const phonePattern = /^\+?3?8?(0\d{9})$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!namePattern.test(name)) {
        alert("Помилка: Неправильний ПІБ");
        return;
    }
    if (!groupPattern.test(group)) {
        alert("Помилка: Неправильний формат групи. Формат має бути 'ІК-22'.");
        return;
    }
    if (!phonePattern.test(phone)) {
        alert("Помилка: Неправильний формат телефону");
        return;
    }
    if (!emailPattern.test(email)) {
        alert("Помилка: Неправильний формат пошти");
        return;
    }

    // Якщо все валідно, виводимо дані
    document.getElementById('outputName').textContent = name;
    document.getElementById('outputGroup').textContent = group;
    document.getElementById('outputVariant').textContent = variant;
    document.getElementById('outputPhone').textContent = phone;
    document.getElementById('outputEmail').textContent = email;
});

