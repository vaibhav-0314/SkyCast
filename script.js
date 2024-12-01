async function fetchWeather(city) {
    if (city) {
        const apiKey = '52dd6ca7391c31d8d706dac05682694c'; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod === '404') {
                alert('City not found');
            } else {
                const weather = data.weather[0].description;
                const temp = data.main.temp;
                const humidity = data.main.humidity;
                const wind = data.wind.speed;
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                // Update Main Weather Icon
                document.getElementById('weather-icon').src = iconUrl;

                // Update Weather Details
                const weatherInfo = `
                    <h2>${city}</h2>
                    <p><strong>Condition:</strong> ${weather}</p>
                    <p><strong>Temperature:</strong> ${temp}°C</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${wind} m/s</p>
                `;
                document.getElementById('weather-details').innerHTML = weatherInfo;

                // Update Additional Info
                document.getElementById('wind-info').textContent = `${wind} m/s`;
                document.getElementById('temp-info').textContent = `${temp}°C`;
                document.getElementById('humidity-info').textContent = `${humidity}%`;

                document.getElementById('weather-info').style.display = 'block';
            }
        } catch (error) {
            alert('Error fetching weather data');
        }
    } else {
        alert('Please enter a city name');
    }
}

function searchOnEnter(event) {
    if (event.key === 'Enter') {
        const city = document.getElementById('search-bar').value;
        fetchWeather(city);
    }
}

function searchCity() {
    const city = document.getElementById('search-bar').value;
    fetchWeather(city);
}
