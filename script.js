const foodList = JSON.parse(localStorage.getItem('foodList')) || [];
const totals = JSON.parse(localStorage.getItem('totals')) || {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
};

function renderData() {
    const tbody = document.querySelector('#foods-table tbody');
    tbody.innerHTML = '';
    foodList.forEach(({ name, calories, protein, carbs, fat }) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${calories}</td>
            <td>${protein}</td>
            <td>${carbs}</td>
            <td>${fat}</td>
        `;
        tbody.appendChild(row);
    });
    document.getElementById('total-calories').textContent = totals.calories;
    document.getElementById('total-protein').textContent = totals.protein;
    document.getElementById('total-carbs').textContent = totals.carbs;
    document.getElementById('total-fat').textContent = totals.fat;
}

renderData();

document.getElementById('food-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const calories = parseFloat(document.getElementById('calories').value);
    const protein = parseFloat(document.getElementById('protein').value);
    const carbs = parseFloat(document.getElementById('carbs').value);
    const fat = parseFloat(document.getElementById('fat').value);

    if (!name || [calories, protein, carbs, fat].some(Number.isNaN)) {
        alert('Please provide valid values for all fields.');
        return;
    }

    const food = { name, calories, protein, carbs, fat };
    foodList.push(food);

    totals.calories += calories;
    totals.protein += protein;
    totals.carbs += carbs;
    totals.fat += fat;

    localStorage.setItem('foodList', JSON.stringify(foodList));
    localStorage.setItem('totals', JSON.stringify(totals));

    renderData();

    event.target.reset();
});

// Expose foodList for potential further manipulation
window.foodList = foodList;
