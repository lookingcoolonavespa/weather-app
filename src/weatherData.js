export { weatherData };

const weatherData = (() => {
  return {
    pullCurrent(city) {
      return fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2014da1160c5b3c595c8a87ba282f13a`
      ).then((response) => response.json());
    },
    pullEverything({ lat, lon }, units, cityName) {
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=2014da1160c5b3c595c8a87ba282f13a`
      ).then((response) => response.json());
    },
    parseHourly(dataObj) {
      let hourlyData = [];
      for (var i = 1; i < 8; i++) {
        hourlyData.push(dataObj.hourly[i]);
      }
      return hourlyData;
    },
    parseDaily(dataObj) {
      let dailyData = [];
      for (var i = 1; i < 8; i++) {
        dailyData.push(dataObj.daily[i]);
      }
      return dailyData;
    },
  };
})();
