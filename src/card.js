export { card };

const card = (() => {
  const daily = document.getElementById('daily-wrapper').children;
  const main = document.getElementById('main-details');
  const hourly = document.getElementById('hourly-wrapper').children;

  const create = (() => ({
    infoDiv(className) {
      const div = document.createElement('div');
      div.classList.add(className);
      return div;
    },
    infoDivWithLabel(className, labelText) {
      const div = this.infoCtn();
      const label = document.createElement('span');
      label.className = 'info-label';
      label.textContent = `${labelText}`;
      const info = document.createElement('span');
      info.className = className;

      div.appendChild(label);
      div.appendChild(info);

      return div;
    },
    infoDivWithIcon(className, labelText, iconClass) {
      const ctn = document.createElement('div');
      ctn.classList.add('info-icon-ctn');
      let info;
      labelText
        ? (info = this.infoDivWithLabel(className, labelText))
        : (info = this.infoDiv(className));
      const icon = document.createElement('i');
      icon.classList.add('flaticon', iconClass);
      ctn.appendChild(icon);
      ctn.appendChild(info);
      return ctn;
    },
    weatherConditionIcon() {
      const img = document.createElement('img');
      img.classList.add('info-condition-icon');
      return img;
    },
    infoCtn() {
      const ctn = document.createElement('div');
      ctn.classList.add('info-ctn');
      return ctn;
    },
    infoWrapper() {
      const wrapper = document.createElement('div');
      wrapper.classList.add('info-wrapper');
      return wrapper;
    },
  }))();

  // (function mainInfoElements() {
  //   const dateTime = create.infoDiv('info-date-time');
  //   const conditionWrapper = create.infoWrapper();
  //   conditionWrapper.classList.add('condition-wrapper');
  //   const conditionIcon = create.weatherConditionIcon();
  //   const condition = create.infoDiv('info-condition');
  //   conditionWrapper.appendChild(conditionIcon);
  //   conditionWrapper.appendChild(condition);

  //   const temp = create.infoDiv('info-temp');
  //   const cityInput = document.createElement('input');
  //   cityInput.type = 'text';
  //   cityInput.classList.add('info-city');

  //   const sunWrapper = create.infoWrapper();
  //   const sunrise = create.infoDivWithIcon(
  //     'info-sunrise',
  //     'Sunrise',
  //     'flaticon-sunrise'
  //   );
  //   const sunset = create.infoDivWithIcon(
  //     'info-sunset',
  //     'Sunset',
  //     'flaticon-sunset'
  //   );
  //   sunWrapper.appendChild(sunrise);
  //   sunWrapper.appendChild(sunset);

  //   const waterWrapper = create.infoWrapper();
  //   const humidity = create.infoDivWithIcon(
  //     'info-humidity',
  //     'Humidity',
  //     'flaticon-humidity'
  //   );
  //   const pop = create.infoDivWithIcon('info-pop', 'Rain', 'flaticon-water');
  //   waterWrapper.appendChild(humidity);
  //   waterWrapper.appendChild(pop);

  //   const windWrapper = create.infoWrapper();
  //   const windSpeed = create.infoDivWithIcon(
  //     'info-wind-speed',
  //     'Wind',
  //     'flaticon-wind'
  //   );
  //   const feelsLike = create.infoDivWithIcon(
  //     'info-feels-like',
  //     'Feels Like',
  //     'flaticon-thermometer'
  //   );
  //   windWrapper.appendChild(windSpeed);
  //   windWrapper.appendChild(feelsLike);

  //   main.appendChild(dateTime);
  //   main.appendChild(temp);
  //   main.appendChild(conditionWrapper);
  //   main.appendChild(cityInput);
  //   main.appendChild(sunWrapper);
  //   main.appendChild(waterWrapper);
  //   main.appendChild(windWrapper);
  // })();

  // (function dailyInfoElements() {
  //   [...daily].forEach((card) => {
  //     const date = create.infoDiv('info-date');
  //     const conditionIcon = create.weatherConditionIcon();
  //     const tempWrapper = create.infoWrapper();
  //     const tempMax = create.infoDiv('info-temp-max');
  //     const tempMin = create.infoDiv('info-temp-min');
  //     tempWrapper.appendChild(tempMax);
  //     tempWrapper.appendChild(tempMin);
  //     const iconWrapper = create.infoWrapper();
  //     const pop = create.infoDivWithIcon('info-pop', '', 'flaticon-water');
  //     const windSpeed = create.infoDivWithIcon(
  //       'info-wind-speed',
  //       '',
  //       'flaticon-wind'
  //     );
  //     iconWrapper.appendChild(pop);
  //     iconWrapper.appendChild(windSpeed);

  //     card.appendChild(date);
  //     card.appendChild(conditionIcon);
  //     card.appendChild(tempWrapper);
  //     card.appendChild(iconWrapper);
  //   });
  // })();

  // (function hourlyInfoElements() {
  //   [...hourly].forEach((card) => {
  //     const time = create.infoDiv('info-time');
  //     const conditionIcon = create.weatherConditionIcon();
  //     const temp = create.infoDiv('info-temp');
  //     const iconWrapper = create.infoWrapper();
  //     const pop = create.infoDivWithIcon('info-pop', '', 'flaticon-water');
  //     const windSpeed = create.infoDivWithIcon(
  //       'info-wind-speed',
  //       '',
  //       'flaticon-wind'
  //     );
  //     iconWrapper.appendChild(pop);
  //     iconWrapper.appendChild(windSpeed);

  //     card.appendChild(time);
  //     card.appendChild(conditionIcon);
  //     card.appendChild(temp);
  //     card.appendChild(iconWrapper);
  //   });
  // })();

  return { daily, main, hourly };
})();
