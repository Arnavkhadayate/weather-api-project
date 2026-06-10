document.addEventListener('DOMContentLoaded', ()=>{
   const cityInput =  document.getElementById("city-input");
   const getWeatherBtn = document.getElementById("get-weather-btn");
   const weatherInfo = document.getElementById("weather-info");
   const cityName = document.getElementById("city-name");
   const descriptionDisplay = document.getElementById("description");
   const temperature = document.getElementById("temperature");
   const errorMsg = document.getElementById("error-message");

   const API_KEY = "1ee84d43bb6640c3bb3aa92fe7cb4645";
   getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if(!city) return;

    try{
       const weatherData = await fetchWeatherData(city);
       displayWeather(weatherData);
   } catch(error){
        showError();
   }
   })

   async function fetchWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=
                 ${city}&units=metric&appid=${API_KEY}`;
   const response = await fetch(url);
   console.log(typeof response);
   console.log("Response", response);

   if(!response.ok){
      throw new Error("city not found");
   }

   const data = await response.json();
   return data;

   }
   function displayWeather(data){
      console.log(data);
      const {name, main, weather} = data;
      cityName.textContent = name;
      temperature.textContent = `Temperature: ${main.temp}`;
      descriptionDisplay.textContent = `description: ${weather[0].description}`;

      weatherInfo.classList.remove('hidden');
      errorMsg.classList.add('hidden');

      
   }
   function showError(){
    weatherInfo.classList.remove('hidden');
    errorMsg.classList.add('hidden');
   }
})