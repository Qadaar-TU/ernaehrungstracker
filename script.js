document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('food-form');
  const tbody = document.getElementById('food-table-body');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const foodName = document.getElementById('food-name').value.trim();
    const calories = document.getElementById('calories').value;
    const protein = document.getElementById('protein').value;
    const carbs = document.getElementById('carbs').value;
    const fats = document.getElementById('fats').value;

    const row = document.createElement('tr');
    [foodName, calories, protein, carbs, fats].forEach((text) => {
      const cell = document.createElement('td');
      cell.textContent = text;
      row.appendChild(cell);
    });

    tbody.appendChild(row);
    form.reset();
    document.getElementById('food-name').focus();
  });
});
