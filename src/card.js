export { card };

const card = (() => {
  const daily = document.getElementById('daily-wrapper').children;
  const main = document.getElementById('main-details');
  const hourly = document.getElementById('hourly-wrapper').children;

  const create = (() => ({
    infoDiv(className) {
      const div = document.createElement('div');
      div.className = className;
      return div;
    },
    infoDivWithLabel(className, labelText) {
      const div = document.createElement('div');
      div.className = 'info-ctn';
      const label = document.createElement('span');
      label.textContent = `${labelText}:`;
      const info = document.createElement('span');
      info.className = className;

      div.appendChild(label);
      div.appendChild(info);

      return div;
    },
    infoCtn() {
      const ctn = document.createElement('div');
      ctn.className = 'info-ctn';
      return ctn;
    },
  }))();

  (function mainInfoElements() {
    const dateTime = create.infoDiv('info-date-time');
    const temp = create.infoDiv('info-temp');
    const condition = create.infoDiv('info-condition');
    const sunrise = create.infoDivWithLabel('info-sunrise', 'Sunrise');
    const sunset = create.infoDivWithLabel('info-sunset', 'Sunset');
    const humidity = create.infoDivWithLabel('info-humidity', 'Humidity');
    const pop = create.infoDivWithLabel('info-pop', 'Chance of Rain');
    const windSpeed = create.infoDivWithLabel('info-wind-speed', 'Wind');

    main.appendChild(dateTime);
    main.appendChild(temp);
    main.appendChild(condition);
    main.appendChild(sunrise);
    main.appendChild(sunset);
    main.appendChild(humidity);
    main.appendChild(pop);
    main.appendChild(windSpeed);
  })();

  (function dailyInfoElements() {
    [...daily].forEach((card) => {
      const date = create.infoDiv('info-date');
      const condition = create.infoDiv('info-condition');
      const tempCtn = create.infoCtn();
      const tempMax = create.infoDiv('info-temp-max');
      const tempMin = create.infoDiv('info-temp-min');
      tempCtn.appendChild(tempMax);
      tempCtn.appendChild(tempMin);
      const pop = create.infoDivWithLabel('info-pop', 'Chance of rain');
      const windSpeed = create.infoDivWithLabel('info-wind-speed', 'Wind');

      card.appendChild(date);
      card.appendChild(condition);
      card.appendChild(tempCtn);
      card.appendChild(pop);
      card.appendChild(windSpeed);
    });
  })();

  (function hourlyInfoElements() {
    [...hourly].forEach((card) => {
      const time = create.infoDiv('info-time');
      const condition = create.infoDiv('info-condition');
      const temp = create.infoDiv('info-temp');
      const pop = create.infoDivWithLabel('info-pop', 'Chance of Rain');
      const windSpeed = create.infoDivWithLabel('info-wind-speed', 'Wind');

      card.appendChild(time);
      card.appendChild(condition);
      card.appendChild(temp);
      card.appendChild(pop);
      card.appendChild(windSpeed);
    });
  })();

  return { daily, main, hourly };
})();
