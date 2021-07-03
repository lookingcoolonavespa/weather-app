import { weatherData } from './weatherData.js';
import { forecast } from './forecast.js';
import { helpers } from './helpers.js';

weatherData
  .pullCurrent('paris, id, us')
  .then((response) => {
    const lat = response.coord.lat;
    const lon = response.coord.lon;
    return weatherData.pullEverything({ lat, lon }, 'imperial');
  })
  .then((response) => {
    console.log(response);

    const hourly = weatherData.parseHourly(response);
    const daily = weatherData.parseDaily(response);
    displayDaily(daily);
  });

function displayDaily(data) {
  const dataKeys = Object.keys(data);
  console.log(dataKeys);
  for (var i = 0; i < dataKeys.length; i++) {
    console.log(i);
    const dateEl = forecast.days[i].querySelector('.date');
    dateEl.textContent = dataKeys[i];
    const infoCondition = forecast.days[i].querySelector('.info-condition');
    const tempHigh = forecast.days[i].querySelector('.info-high');
    (tempHigh.textContent = data[dataKeys[i]].temp.max), 'F';
    const tempLow = forecast.days[i].querySelector('.info-low');
    (tempHigh.textContent = data[dataKeys[i]].temp.min), 'F';
    const infoRain = forecast.days[i].querySelector('.info-rain');
    infoRain.textContent = `${data[dataKeys[i]].pop * 100}%`;
    const infoWind = forecast.days[i].querySelector('.info-wind');
    infoWind.textContent = data[dataKeys[i]].wind_speed;
  }
}
