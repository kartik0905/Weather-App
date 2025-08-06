document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-butt");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "";


    getWeatherBtn.addEventListener('click',async()=>{
        const city = cityInput.value.trim();
        if(!city) return;

        //It may throw an error 
        //Databases are always in another country

        try {
            const weatherData = await fetchWeatherData(city);
            DisplayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city)
    {
        //Fetches the data

        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        console.log(typeof response);
        console.log(response);

        if(!response.ok)
        {
            throw new Error("City Not Found!")
        }
        const data = await response.json();
        return data;
    }
    function DisplayWeatherData(data)
    {
        console.log(data);
        const {name,main,weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`
        descriptionDisplay.textContent = `Temperature : ${weather[0].description}`;
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");

    }
    function showError()
    {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden')
    }
})

