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
    current.pop = oneCall.hourly[0].pop;
    displayWeatherData(
      current,
      card.main,
      'dateTime', //arg must match displayWeatherData.info.key
      'humidity',
      'condition',
      'temp',
      'pop',
      'windSpeed',
      'sunrise',
      'sunset',
      'feelsLike'
    );

    hourly.forEach((day, index) => {
      displayWeatherData(
        day,
        card.hourly[index],
        'time',
        'conditionIcon',
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
        'conditionIcon',
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
    conditionIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    sunrise: helpers.getTimeStr(data.sunrise),
    sunset: helpers.getTimeStr(data.sunset),
    temp: Math.round(data.temp),
    tempMax: Math.round(data.temp.max),
    tempMin: Math.round(data.temp.min),
    humidity: Math.round(data.humidity),
    pop: `${Math.round(data.pop)}%`,
    windSpeed: `${Math.round(data.wind_speed)}mph`,
    feelsLike: Math.round(data.feels_like),
  };

  details.forEach((param) => {
    const element = card.querySelector(
      `.info-${param.replace(/[A-Z]/g, '-$&').toLowerCase()}` //turn camelCase into slug-case
    );
    if (param.includes('Icon')) return element.setAttribute('src', info[param]);

    element.innerHTML = info[param];
  });
}

const hourlyDailyWrapper = document.querySelector('.hourly-daily-wrapper');
const hourlyBtn = document.getElementById('hourly-btn');
hourlyBtn.addEventListener('click', () => {
  hourlyDailyWrapper.style.transform = 'translateY(0px)';
});
const dailyBtn = document.getElementById('daily-btn');
dailyBtn.addEventListener('click', () => {
  hourlyDailyWrapper.style.transform = 'translateY(-174px)';
});
