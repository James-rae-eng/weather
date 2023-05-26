let units = 'celcius';

// Search form submittion handler
const form = document.getElementById('searchForm');
form.addEventListener('submit', (event) => {
  const formValue = event.target.elements;
  console.log(formValue.city);
});

const unitsBtn = document.getElementById('unitsBtn');
unitsBtn.addEventListener('click', () => {
  if (units === 'celcius') {
    units = 'fahrenheit';
    unitsBtn.innerHTML = 'Fahrenheit';
  } else {
    units = 'celcius';
    unitsBtn.innerHTML = 'Celcius';
  }
});
