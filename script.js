const form = document.getElementById('entry-form');
const tbody = document.querySelector('#entries tbody');
const totals = {
  calories: document.getElementById('total-calories'),
  protein: document.getElementById('total-protein'),
  carbs: document.getElementById('total-carbs'),
  fat: document.getElementById('total-fat')
};

let entries = [];
let editingIndex = null;

form.addEventListener('submit', event => {
  event.preventDefault();
  const entry = {
    food: document.getElementById('food').value.trim(),
    calories: parseFloat(document.getElementById('calories').value) || 0,
    protein: parseFloat(document.getElementById('protein').value) || 0,
    carbs: parseFloat(document.getElementById('carbs').value) || 0,
    fat: parseFloat(document.getElementById('fat').value) || 0
  };

  if (editingIndex !== null) {
    entries[editingIndex] = entry;
    editingIndex = null;
  } else {
    entries.push(entry);
  }

  form.reset();
  render();
});

tbody.addEventListener('click', event => {
  if (event.target.classList.contains('edit')) {
    const index = Number(event.target.dataset.index);
    const entry = entries[index];
    document.getElementById('food').value = entry.food;
    document.getElementById('calories').value = entry.calories;
    document.getElementById('protein').value = entry.protein;
    document.getElementById('carbs').value = entry.carbs;
    document.getElementById('fat').value = entry.fat;
    editingIndex = index;
  }

  if (event.target.classList.contains('delete')) {
    const index = Number(event.target.dataset.index);
    entries.splice(index, 1);
    render();
  }
});

function render() {
  tbody.innerHTML = '';
  entries.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.food}</td>
      <td>${entry.calories}</td>
      <td>${entry.protein}</td>
      <td>${entry.carbs}</td>
      <td>${entry.fat}</td>
      <td>
        <button class="edit" data-index="${index}">Edit</button>
        <button class="delete" data-index="${index}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  recalcTotals();
}

function recalcTotals() {
  const totalsData = entries.reduce((acc, entry) => {
    acc.calories += entry.calories;
    acc.protein += entry.protein;
    acc.carbs += entry.carbs;
    acc.fat += entry.fat;
    return acc;
  }, {calories:0, protein:0, carbs:0, fat:0});

  totals.calories.textContent = totalsData.calories;
  totals.protein.textContent = totalsData.protein;
  totals.carbs.textContent = totalsData.carbs;
  totals.fat.textContent = totalsData.fat;
}
