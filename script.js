let foods = [];

function saveFoods() {
    localStorage.setItem('foods', JSON.stringify(foods));
}

function renderFoods() {
    const tbody = document.querySelector('#food-table tbody');
    tbody.innerHTML = '';
    foods.forEach((food, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${food.name}</td>
            <td>${food.calories}</td>
            <td>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    const total = foods.reduce((sum, f) => sum + Number(f.calories), 0);
    document.getElementById('total-calories').textContent = total;
}

function loadFoods() {
    const stored = localStorage.getItem('foods');
    if (stored) {
        foods = JSON.parse(stored);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadFoods();
    renderFoods();

    document.getElementById('food-form').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('food-name').value.trim();
        const calories = parseInt(document.getElementById('food-calories').value, 10);
        if (!name) return;
        foods.push({ name, calories });
        saveFoods();
        renderFoods();
        e.target.reset();
    });

    document.getElementById('food-table').addEventListener('click', e => {
        if (e.target.classList.contains('edit')) {
            const idx = e.target.dataset.index;
            const food = foods[idx];
            const newName = prompt('Food name', food.name);
            const newCal = prompt('Calories', food.calories);
            if (newName !== null && newCal !== null) {
                foods[idx] = { name: newName.trim(), calories: parseInt(newCal, 10) };
                saveFoods();
                renderFoods();
            }
        } else if (e.target.classList.contains('delete')) {
            const idx = e.target.dataset.index;
            foods.splice(idx, 1);
            saveFoods();
            renderFoods();
        }
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        foods = [];
        localStorage.removeItem('foods');
        renderFoods();
    });
});
