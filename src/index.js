import { weatherData } from './weatherData.js';
import { card } from './card.js';
import { helpers } from './helpers.js';

weatherData
  .pullCurrent('san francisco, us')
  .then((currentData) => {
    const lat = currentData.coord.lat;
    const lon = currentData.coord.lon;
    return weatherData.pullEverything({ lat, lon }, 'imperial');
  })
  .then((oneCall) => {
    console.log(oneCall);
    const hourly = weatherData.parseHourly(oneCall);
    const daily = weatherData.parseDaily(oneCall);

    const current = oneCall.current;
    displayWeatherData(
      current,
      card.main,
      'dateTime',
      'humidity',
      'condition',
      'pop',
      'windSpeed',
      'sunrise',
      'sunset'
    );

    hourly.forEach((day, index) => {
      displayWeatherData(
        day,
        card.hourly[index],
        'time',
        'condition',
        'temp',
        'pop',
        'windSpeed'
      );
    });

    daily.forEach((day, index) => {
      displayWeatherData(
        day,
        card.daily[index],
        'date',
        'condition',
        'tempMax',
        'tempMin',
        'pop',
        'windSpeed'
      );
    });
  });

function displayWeatherData(data, card, ...details) {
  const info = {
    date: helpers.getDateStr(data.dt),
    dateTime: helpers.getDateTimeStr(data.dt),
    time: helpers.getTimeStr(data.dt),
    condition: data.weather[0].description,
    sunrise: helpers.getTimeStr(data.sunrise),
    sunset: helpers.getTimeStr(data.sunset),
    temp: Math.round(data.temp),
    tempMax: Math.round(data.temp.max),
    tempMin: Math.round(data.temp.min),
    humidity: data.humidity,
    pop: data.pop,
    windSpeed: data.wind_speed,
  };

  details.forEach((param) => {
    const element = card.querySelector(
      `.info-${param.replace(/[A-Z]/g, '-$&').toLowerCase()}` //turn camelCase into slug-case
    );
    element.textContent = info[param];
  });
}
