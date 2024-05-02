// Define your API key and API URL
const apiKey = "0ef5405a4a3a45b735f7deb0b4099025";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Get references to HTML elements
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

// Add an event listener to the search button
searchButton.addEventListener("click", () => {
  // Get the value entered in the location input field
  const location = locationInput.value;
  // If the location is not empty
  if (location) {
    // Call the fetchWeather function with the location as an argument
    fetchWeather(location);
  }
});

// Function to fetch weather data from the API
function fetchWeather(location) {
  // Construct the URL with the location and API key
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  // Fetch data from the API using the constructed URL
  fetch(url)
    // Parse the response as JSON
    .then((response) => response.json())
    // Handle the data
    .then((data) => {
      // Update the location element with the name of the location
      locationElement.textContent = data.name;
      // Update the temperature element with the temperature data
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      // Update the description element with the weather description
      descriptionElement.textContent = data.weather[0].description;

      // Dynamically update background based on weather condition
      const weatherCondition = data.weather[0].main.toLowerCase();
      document.body.style.backgroundImage = `url('https://via.placeholder.com/1920x1080?text=${weatherCondition}')`;
    })
    // Handle errors
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
