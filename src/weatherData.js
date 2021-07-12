export { weatherData };
import { helpers } from './helpers.js';
import { card } from './card.js';

const weatherData = (() => {
  return {
    current: null,
    pullCurrent(city) {
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2014da1160c5b3c595c8a87ba282f13a`
      )
        .then((response) => {
          console.log(response);
          if (response.ok) return response.json();
          throw new Error(response.statusText);
        })
        .catch((err) => {
          return err;
        });
    },
    pullEverything({ lat, lon }, units) {
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=2014da1160c5b3c595c8a87ba282f13a`
      )
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error(response.statusText);
        })
        .catch((err) => {
          return err;
        });
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
    fillInfo(data, card, ...details) {
      const info = {
        city: data.name,
        date: helpers.getDateStr(data.dt),
        dateTime: helpers.getDateTimeStr(data.dt),
        time: helpers.getTimeStr(data.dt),
        condition: data.weather[0].description,
        conditionIcon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        sunrise: helpers.getTimeStr(data.sunrise),
        sunset: helpers.getTimeStr(data.sunset),
        temp: `${Math.round(data.temp)}<span class="info-unit">°</span>`,
        tempMax: `<span class="info-label">Max</span>${Math.round(
          data.temp.max
        )}<span class="info-unit">°</span>`,
        tempMin: `<span class="info-label">Min</span>${Math.round(
          data.temp.min
        )}<span class="info-unit">°</span>`,
        humidity: `${Math.round(
          data.humidity
        )}<span class="info-unit">%</span>`,
        pop: `${Math.round(data.pop)}<span class="info-unit">%</span>`,
        windSpeed: `${Math.round(
          data.wind_speed
        )}<span class="info-unit">mph</span>`,
        feelsLike: `${Math.round(
          data.feels_like
        )}<span class="info-unit">°</span>`,
      };

      details.forEach((param) => {
        const element = card.querySelector(
          `.info-${param.replace(/[A-Z]/g, '-$&').toLowerCase()}` //turn camelCase into slug-case
        );
        if (param.includes('Icon'))
          return element.setAttribute('src', info[param]);
        if (param === 'city') return (element.value = info[param]);
        element.innerHTML = info[param];
      });
    },
    display(cityName, units) {
      return this.pullCurrent(cityName)
        .then((currentData) => {
          if (currentData.constructor === Error) throw currentData;
          const lat = currentData.coord.lat;
          const lon = currentData.coord.lon;
          return this.pullEverything({ lat, lon }, units);
        })
        .then((oneCall) => {
          this.refresh();
          const hourly = this.parseHourly(oneCall);
          const daily = this.parseDaily(oneCall);

          const current = oneCall.current;
          current.pop = oneCall.hourly[0].pop;
          current.name = cityName;
          this.current = oneCall;

          this.fillInfo(
            current,
            card.main,
            'city',
            'dateTime', //arg must match this.fillInfo.info.key
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
            this.fillInfo(
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
            this.fillInfo(
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
          return 'empty';
        })
        .catch((err) => {
          const errorMsg = document.querySelector('.error-msg');
          errorMsg.classList.remove('inactive');
          errorMsg.textContent = err;
          setTimeout(() => errorMsg.classList.add('inactive'), 2000);
          this.refresh();
        });
    },
    refresh() {
      document.documentElement.style.setProperty('--loading', '1');
    },
  };
})();
