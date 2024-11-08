document.getElementById("submit-btn").addEventListener("click", async () => {
  const city = document.getElementById("city").value;
  console.log(`in frontend ${city}`);

  if (!city) {
    alert("Enter the city ");
    return;
  }

  // Show loading message
  document.getElementById("weather-output").innerHTML = "<p>Loading...</p>";
  document.getElementById("weather-output").style.display = "block";

  const response = await fetch(`/weather?city=${city}`);

  if (!response.ok) {
    document.getElementById("weather-output").innerHTML = "City not found";
    return;
  }

  const data = await response.json();
  console.log("Got data from backend");
  console.log(data);

  const weatherInfo = `
          <h3>${data.name}, ${data.sys.country}</h3>
          <p>Weather: ${data.weather[0].description}</p>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

  document.getElementById("weather-output").innerHTML = weatherInfo;
});
