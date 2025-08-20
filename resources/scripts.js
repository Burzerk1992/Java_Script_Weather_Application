//API Key and Base URl
const apiKey = '767ef3d274ebb5bf667c5ab9ae0f78fc';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather';

//Getting elements from the UI by ID
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const tempratureElement = document.getElementById("temprature");
const highTempElement = document.getElementById("high-temp");
const lowTempElement = document.getElementById("low-temp");
const descriptionElement = document.getElementById("description");
const resetButton = document.getElementById("resetButton");
const historicalLocationTitle = document.getElementById('search-history-header');
const historicalLocationOne = document.getElementById("location-one");
const historicalLocationTwo = document.getElementById("location-two");
const historicalLocationThree = document.getElementById("location-three");
const historicalLocationFour = document.getElementById("location-four");
const searchDataBackground = document.getElementById("search-history-box");
const errorMessage = document.getElementById("error-message");

//This is the array to store the last five cities
let historicalLocations = []

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
    if (historicalLocations.length < 4) {
        historicalLocations.push(location);
    } else {
        historicalLocations.shift();
        historicalLocations.push(location);
        console.log(historicalLocations);
    }
});

resetButton.addEventListener('click', resetApp);

function fetchWeather(location) {
    const url = `${apiURL}?q=${location}&appid=${apiKey}&units=metric`;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(`Found weather data for location ${location}`);
            locationElement.textContent = data.name;
            descriptionElement.textContent = `Current Coniditions: ${data.weather[0].description}`;
            tempratureElement.textContent = `Current Temprature: ${Math.round(data.main.temp)}°C`;
            highTempElement.textContent = `Daily High: ${Math.round(data.main.temp_max)}°C`;
            lowTempElement.textContent = `Daily Low: ${Math.round(data.main.temp_max)}°C`;
        })

        .catch(error => {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Invalid City. Please try again"
            console.error("Invalid City Value Entered!");
            console.error('Error fetching weather data:', error);
        })

        locationInput.style.display = "none";
        searchButton.style.display = "none";
        resetButton.style.display = "inline";
        historicalLocationTitle.style.display = "none";
        searchDataBackground.style.display = "none";
        historicalLocationOne.textContent = "";
        historicalLocationTwo.textContent = "";
        historicalLocationThree.textContent = "";
        historicalLocationFour.textContent = "";
};

function resetApp() {
    locationInput.value = "";
    locationInput.style.display = "block";
    searchButton.style.display = "initial";
    resetButton.style.display = "";
    locationElement.textContent = "";
    descriptionElement.textContent = "";
    tempratureElement.textContent = "";
    highTempElement.textContent = "";
    lowTempElement.textContent = "";
    searchDataBackground.style.display = "block";
    historicalLocationTitle.style.display = "block";
    historicalLocationOne.textContent = historicalLocations[0];
    historicalLocationTwo.textContent = historicalLocations[1];
    historicalLocationThree.textContent = historicalLocations[2];
    historicalLocationFour.textContent = historicalLocations[3];
    errorMessage.style.display = "initial";
    errorMessage.textContent = "";
}