let searchBox = document.querySelector(".search-box");
searchBox.addEventListener('keypress', setQuery);
init();

function init() {
    //update current date
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    //current year in footer
    let cur_year = document.querySelector('.curr-year');
    cur_year.innerText = new Date().getFullYear();
}


function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    const api = {
        key: "7cec6c901ffb9f9f63470b8264122580",
        base: "https://api.openweathermap.org/data/2.5/"
    }
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayResults);
}

function displayResults(response) {
    //console.log(weather);

    //display the city and country
    let city = document.querySelector(".location .city");
    city.innerText = `${response.name}, ${response.sys.country}`;

    //display the temperature of the city
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(response.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = response.weather[0].main;

    //display the high temp and low temp
    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${Math.round(response.main.temp_min)}°c / ${Math.round(response.main.temp_max)}°c`;

}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`;
}