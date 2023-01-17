var fetchButton = document.getElementById("search-button");
var historyButton_1 = document.getElementById("searchHistory-row1");
var historyButton_2 = document.getElementById("searchHistory-row2");
var historyButton_3 = document.getElementById("searchHistory-row3");

var key = "497fd51b34d3ddbe8299072198e254e7";

// Create current time
var today = new Date();
var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);
var hours = today.getHours(); 
var minutes = today.getMinutes();  
var seconds = today.getSeconds();
var date = year + '-' + month  + '-' + day + '   ' + hours + ':' + minutes + ':' + seconds

// values which will be stored to a localstorage
var searchHistory1 = ""
var searchHistory2 = ""
var searchHistory3 = ""

// bring saved history data from localstorage and write text on the web page
$(function(){ 
  for (i=1; i<4; i++){ 
      if (localStorage.getItem("key"+(i).toString()) != "null"){
        document.getElementById("searchHistory-row" + (i).toString()).innerHTML = localStorage.getItem("key"+(i).toString()); 
      } 
  }
})

// Search weather information if user click the button.
fetchButton.addEventListener("click", showWeather);
// buttons in history section
historyButton_1.addEventListener("click", histWeather_1);
historyButton_2.addEventListener("click", histWeather_2);
historyButton_3.addEventListener("click", histWeather_3);

// Save the user input into a localstorage and show the current and the future weather information
function showWeather(event) {
  saveHistory();
  todayWeather("search");
  forcastWeather();
  event.preventDefault();
  updateHistory();
}

function histWeather_1(event) {
  todayWeather("history1");
  forcastWeather();
  event.preventDefault();
}
function histWeather_2(event) {
  todayWeather("history2");
  forcastWeather();
  event.preventDefault();
}
function histWeather_3(event) {
  todayWeather("history3");
  forcastWeather();
  event.preventDefault();
}

// Bring weather information using Google API and ajax.

function todayWeather(status){

  $("#mainBody").show()

  if (status == "search"){
    city = document.getElementById("location-search").value;
  } else if (status == "history1"){
    city = document.getElementById("searchHistory-row1").innerText;
  } else if (status == "history2"){
    city = document.getElementById("searchHistory-row2").innerText;
  } else if (status == "history3"){
    city = document.getElementById("searchHistory-row3").innerText;
  }
    
  var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
  $.ajax({
		url: getUrlCurrent,
		method: 'GET',
	}).then((res) => {
    console.log(res)
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
    document.getElementById("cityName").innerHTML = "City:   " + res.name
    document.getElementById("date").innerHTML = "Date:   " + date
    document.getElementById("Temp").innerHTML = "Temperature:   " + res.main.temp + " °F"
    document.getElementById("humidity").innerHTML = "Humidity:   " + res.main.humidity + " %"
    document.getElementById("windSpeed").innerHTML = "windSpeed:  " + res.wind.speed + " mph"
  }) 
}

// Bring future weather information.

function forcastWeather(){
  var weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;
  $.ajax({
		url: weatherAPI,
		method: 'GET',
	}).then((res) => {
    console.log(res.list)
    for (let i = 0; i < 5; i++) {

      index = 8*i
      futureDate = res.list[index].dt_txt

      document.getElementById("weatherIcon_"+(i).toString()).src = `https://openweathermap.org/img/wn/${res.list[index].weather[0].icon}@2x.png`
      document.getElementById("date_"+(i).toString()).innerHTML = "Date:   " + futureDate.slice(0,10)
      document.getElementById("Temp_"+(i).toString()).innerHTML = "Temp:   " + res.list[index].main.temp + " °F"
      document.getElementById("humidity_"+(i).toString()).innerHTML = "Humidity:   " + res.list[index].main.humidity + " %"
      document.getElementById("windSpeed_"+(i).toString()).innerHTML = "windSpeed:  " + res.list[index].wind.speed + " mph"

    }
  })
}

// Save history to a local stoarage.

function saveHistory(){
  searchHistory3 = localStorage.getItem("key2");
  searchHistory2 = localStorage.getItem("key1");
  searchHistory1 = document.getElementById("location-search").value;
  localStorage.setItem("key1", searchHistory1);
  localStorage.setItem("key2", searchHistory2);
  localStorage.setItem("key3", searchHistory3);
}

//update search history

function updateHistory(){
  for (i=1; i<4; i++){ 
    if (localStorage.getItem("key"+(i).toString()) != "null"){
      document.getElementById("searchHistory-row" + (i).toString()).innerHTML = localStorage.getItem("key"+(i).toString()); 
    } 
  }
}


