/* Function to POST data */


/* Function to GET Project Data */

/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=38dc2cc844dff231254225ded0287cc9&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeather);

/* Function called by event listener */
function getWeather(event) {
    let zip = document.getElementById('zip').value;
    getWeatherData(baseURL, zip, apiKey);
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zip, key) => {
    const res = await fetch(baseURL+zip+key);
    console.log(res);
    try {
        const data = await res.json();
        console.log(data);
        // chain promise here

        // postData('/weather', data)
    } catch(error) {
        console.log('error', error);
    }
}



