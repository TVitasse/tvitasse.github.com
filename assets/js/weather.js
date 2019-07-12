document.addEventListener('DOMContentLoaded', function() {
  var city = "lyon"
  var pos = document.getElementById("geoloc");
  document.getElementById("city").innerHTML = city.charAt(0).toUpperCase() + city.slice(1);

  new getLocalWeather(city);

  // new getLocation(pos);

}, false);

function getLocalWeather(cityname){
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      var response = JSON.parse(this.responseText);
			// id='condition_img'
      var condition_img = "<img class='condition_img center' src='" + response.current_condition.icon_big + "' alt='" + response.current_condition.condition + "' />"
      document.getElementById("condition").innerHTML = condition_img;
      document.getElementById("temperature").innerHTML = response.current_condition.tmp + "°C";
      document.getElementById("date").innerHTML = response.current_condition.date;
      document.getElementById("time").innerHTML = response.current_condition.hour;
    }
  };
  request.open("GET", "https://www.prevision-meteo.ch/services/json/".concat(cityname));
  request.send();
};
