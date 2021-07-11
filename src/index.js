import { weatherData } from './weatherData.js';
import { card } from './card.js';
import { helpers } from './helpers.js';
function showWeatherData(cityName) {
  weatherData
    .pullCurrent(cityName)
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
      current.name = cityName;
      displayWeatherData(
        current,
        card.main,
        'city',
        'dateTime', //arg must match displayWeatherData.info.key
        'humidity',
        'condition',
        'conditionIcon',
        'temp',
        'pop',
        'windSpeed',
        'sunrise',
        'sunset',
        'feelsLike'
      );

      hourly.forEach((hour, index) => {
        displayWeatherData(
          hour,
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
}

function displayWeatherData(data, card, ...details) {
  const info = {
    city: data.name,
    date: helpers.getDateStr(data.dt),
    dateTime: helpers.getDateTimeStr(data.dt),
    time: helpers.getTimeStr(data.dt),
    condition: data.weather[0].description,
    conditionIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    sunrise: helpers.getTimeStr(data.sunrise),
    sunset: helpers.getTimeStr(data.sunset),
    temp: `${Math.round(data.temp)}<span class="info-unit">°</span>`,
    tempMax: `${Math.round(data.temp.max)}<span class="info-unit">°</span>`,
    tempMin: `${Math.round(data.temp.min)}<span class="info-unit">°</span>`,
    humidity: `${Math.round(data.humidity)}<span class="info-unit">%</span>`,
    pop: `${Math.round(data.pop)}<span class="info-unit">%</span>`,
    windSpeed: `${Math.round(
      data.wind_speed
    )}<span class="info-unit">mph</span>`,
    feelsLike: `${Math.round(data.feels_like)}<span class="info-unit">°</span>`,
  };

  details.forEach((param) => {
    const element = card.querySelector(
      `.info-${param.replace(/[A-Z]/g, '-$&').toLowerCase()}` //turn camelCase into slug-case
    );
    if (param.includes('Icon')) return element.setAttribute('src', info[param]);
    if (param === 'city') return (element.value = info[param]);
    console.log(element);
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
  hourlyDailyWrapper.style.transform = 'translateY(-225px)';
});

showWeatherData('san francisco');
