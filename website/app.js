/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeather);

// Function called by event listener
function getWeather(event) {
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

    getWeatherData(baseURL, zip, apiKey)
        // Chain promise that makes a POST request to add API data and user entered content
        .then(data => {
            postData('/addWeather', {
                temp: data.main.temp, 
                date: newDate, 
                feelings: feelings,
            })
            // Chain promise that updates UI dynamically
            .then(()=> 
                updateUI());
        })
}

// Function to GET Web API Data
const getWeatherData = async (baseURL, zip, key) => {
    const res = await fetch(baseURL+zip+key);
    console.log(res);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
    }
};

// Async postData function
const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

// Async funtion to update UI dynamically
const updateUI = async() => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp + '° F';
        document.querySelector('#content').innerHTML = allData.feelings;
    } catch(error) {
        console.log('error', error);
    }
}



