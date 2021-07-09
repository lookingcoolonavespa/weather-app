const slider = () => {
  const ctn = document.querySelector('.hourly-daily-wrapper');
  const hourly = document.getElementById('hourly-wrapper');
  const daily = document.getElementById('daily-wrapper');
  const sliderBtnCtn = document.querySelector('.slider-btn-ctn');
  const seriesWrappers = [...hourly, daily];
  return {
    findActive() {
      return seriesWrappers.find((wrapper) =>
        wrapper.classList.contains('active')
      );
    },
    showSliderBtns() {
      const active = this.findActive;
      if (ctn.offSetWidth < active.scrollWidth)
        sliderBtnCtn.classList.add('active');
    },
  };
};
