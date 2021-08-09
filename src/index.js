import { weatherData } from './weatherData.js';
import { slider } from './slider.js';

const unitToggle = document.querySelector('.switch');
unitToggle.addEventListener('click', () => {
  const units = unitToggle.checked === true ? 'metric' : 'imperial';
  weatherData.display(weatherData.current.current.name, units);
});

const hourlyDailyWrapper = document.querySelector('.hourly-daily-wrapper');
const [leftNavBtn, rightNavBtn] = slider.navBtns;
const hourlyBtn = document.getElementById('hourly-btn');
hourlyBtn.addEventListener('click', () => {
  slider.changeActive();
  slider.changeNumOfSliderBtns();
  const active = slider.findActive();
  slider.adjustActiveCounter(active, slider.sliderBtnCtn, slider.ctn, 'active');
  slider.checkForDisableNavBtn(
    slider.getTranslateValue(active),
    slider.ctn,
    active,
    leftNavBtn,
    rightNavBtn
  );
  slider.checkForEnableNavBtn(
    slider.getTranslateValue(active),
    slider.ctn,
    active,
    leftNavBtn,
    rightNavBtn
  );
  hourlyDailyWrapper.style.transform = 'translateY(0px)';
});
const dailyBtn = document.getElementById('daily-btn');
dailyBtn.addEventListener('click', () => {
  slider.changeActive();
  slider.changeNumOfSliderBtns();
  const active = slider.findActive();
  slider.adjustActiveCounter(active, slider.sliderBtnCtn, slider.ctn, 'active');
  slider.checkForDisableNavBtn(
    slider.getTranslateValue(active),
    slider.ctn,
    active,
    leftNavBtn,
    rightNavBtn
  );
  slider.checkForEnableNavBtn(
    slider.getTranslateValue(active),
    slider.ctn,
    active,
    leftNavBtn,
    rightNavBtn
  );
  hourlyDailyWrapper.style.transform = 'translateY(-236px)';
});

const cityInput = document.querySelector('.info-city');
cityInput.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    document.documentElement.style.setProperty('--loading', '0');
    const units = unitToggle.checked === true ? 'metric' : 'imperial';
    weatherData.display(cityInput.value, units);
  }
});

leftNavBtn.addEventListener('click', () => {
  const active = slider.findActive();
  slider.onNav('left', active, slider.ctn, leftNavBtn, rightNavBtn);
  slider.adjustActiveCounter(active, slider.sliderBtnCtn, slider.ctn, 'active');
});
rightNavBtn.addEventListener('click', () => {
  const active = slider.findActive();
  slider.onNav(
    'right',
    slider.findActive(),
    slider.ctn,
    rightNavBtn,
    leftNavBtn
  );
  slider.adjustActiveCounter(active, slider.sliderBtnCtn, slider.ctn, 'active');
});
slider.sliderBtns.forEach((counter) =>
  counter.addEventListener('click', (e) => {
    slider.onCounter(
      e,
      slider.sliderBtnCtn,
      slider.findActive(),
      'active',
      slider.ctn,
      slider.navBtns[0],
      slider.navBtns[1]
    );
  })
);
window.addEventListener('resize', () => {
  slider.resetWrapperPos();
  slider.showOrHideSliderBtns();
  slider.adjustActiveCounter(
    slider.findActive(),
    slider.sliderBtnCtn,
    slider.ctn,
    'active'
  );
});
const init = (() => {
  weatherData
    .display('san francisco', 'imperial')
    .then(() => slider.showOrHideSliderBtns());
})();
