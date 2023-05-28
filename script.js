// Temperature units
let units = 'celcius';

// Weather api key (add key here for app to work)
const key = '';

// Output results of get weather to dom
const outputWeather = (city, region, temp, description, humidity, wind, uv) => {
  const output = document.getElementById('output');
  output.innerHTML = '';

  const top = document.createElement('div');
  top.className = 'top';

  const main = document.createElement('div');
  main.className = 'main';
  const temperature = document.createElement('p');
  temperature.innerHTML = temp;
  const desc = document.createElement('p');
  desc.innerHTML = description;
  main.append(temperature, desc);

  const location = document.createElement('div');
  location.className = 'location';
  const cityName = document.createElement('p');
  cityName.innerHTML = city;
  const regionName = document.createElement('p');
  regionName.innerHTML = region;
  location.append(cityName, regionName);

  top.append(main, location);

  const extra = document.createElement('div');
  extra.className = 'extra';
  const humid = document.createElement('p');
  humid.innerHTML = humidity;
  const windSpeed = document.createElement('p');
  windSpeed.innerHTML = wind;
  const uvDesc = document.createElement('p');
  uvDesc.innerHTML = uv;
  extra.append(humid, windSpeed, uvDesc);

  output.appendChild(top);
  output.appendChild(extra);
};

// Process weather info & extract what's needed
const processWeather = (data) => {
  // Get the info wanted out & format it
  const city = `${data.location.name}, `;
  const { region } = data.location;
  let temp = '';
  if (units === 'celcius') {
    temp = `${data.current.temp_c} °C`;
  } else {
    temp = `${data.current.temp_f} °F`;
  }
  const description = data.current.condition.text;
  const humidity = `Humidity - ${data.current.humidity}%`;
  const wind = `Wind - ${data.current.wind_mph}`;
  let uv = '';
  const uvNum = parseInt(data.current.uv, 10);
  if (uvNum <= 2) {
    uv = 'UV - Low';
  } else if (uvNum > 2 && uvNum <= 5) {
    uv = 'UV - Medium';
  } else if (uvNum > 5 && uvNum <= 7) {
    uv = 'UV - High';
  } else {
    uv = 'UV - Very high';
  }
  // Send to ouput function
  outputWeather(city, region, temp, description, humidity, wind, uv);
};

// Async call to weather api
async function getWeather(city) {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`, { mode: 'cors' });
  const weatherData = await response.json();
  // Filter data
  processWeather(weatherData);
}

// Search form submittion handler
const form = document.getElementById('searchForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formValue = event.target.elements;
  getWeather(formValue.city.value);
});

// Listener to swap between C & F units with button click
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
