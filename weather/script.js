
// If the user allows the location access, run the sucessCallback function
const sucessCallback = (position) => {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude; 
    //Run the getWeather function
    getWeather(lat, lon);
}

// If the user denies the location access, run the errorCallback function
const errorCallback = (error) => {
    console.log(error);
    // Run the getWeather function of the default city (New York, USA)
    getWeather(40.714, -74.006, "New York City, USA");
}   

// Get the current location of the user
navigator.geolocation.getCurrentPosition(sucessCallback, errorCallback);

let searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", updateWeather);

// Function to get the latitude and longitude of the city
function getLatLon() {
    // Get the value of the search input
    let searchInput = document.querySelector(".search-bar").value;
    // API call to get the latitude and longitude of the city
    fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q="+searchInput+"&limit=1&appid=b222be32564b5a976119b9aed1c84a8d"
    )
    .then(response => {
        // handle the response
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    })
    .catch(error => {
        // handle the error
        console.log(error);
    });
}

// Function to get the weather data
function getWeather(lat, lon, name) {
    // API call to get the weather data
    fetch(
        "https://api.openweathermap.org/data/3.0/onecall?lat="+lat+"&lon="+lon+"&units=metric&appid=b222be32564b5a976119b9aed1c84a8d"
    )
    .then(response => {
        // handle the response
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    })
    .then(data => {
        // handle the data
        console.log(data);
        let temp = data.current.temp;
        temp = Math.round(temp);
        let discription = data.current.weather[0].description;
        let humidity = data.current.humidity;
        let windSpeed = data.current.wind_speed;
        console.log(name, temp, discription, humidity, windSpeed);
        // Update the weather data
        document.querySelector(".city-name").innerText = name;
        document.querySelector(".city-temp").innerText = temp + "°C";
        document.querySelector(".city-description").innerText = discription;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = windSpeed + " km/h";
        document.querySelector(".search-bar").value = "";
    })
    .catch(error => {
        // handle the error
        console.log(error);
    });
}

// Function to update the weather data on search
function updateWeather(){
    // Get the value of the search input
    let searchInput = document.querySelector(".search-bar").value;
    // API call to get the latitude and longitude of the city
    fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q="+searchInput+"&limit=1&appid=b222be32564b5a976119b9aed1c84a8d"
    )
    .then(response => {
        // handle the response
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
    })
    .then(data => {
        // handle the data
        let lat = data[0].lat;
        let lon = data[0].lon;
        let city = data[0].name
        let state = data[0].state;
        let country = data[0].country;
        let name = city + ", " + state + ", " + country;
        getWeather(lat, lon, name);
    })
    .catch(error => {
        // handle the error
        console.log(error);
    });
}
