export { slider };
const slider = (() => {
  const ctn = document.querySelector('.hourly-daily-wrapper');
  const hourly = document.getElementById('hourly-wrapper');
  const daily = document.getElementById('daily-wrapper');
  const sliderBtnCtn = document.querySelector('.slider-btn-ctn');
  const sliderBtns = document.querySelectorAll('.slider-btn');
  const navBtns = document.querySelectorAll('.nav-btn');
  const seriesWrappers = [hourly, daily];

  function getTranslateValue(imageCtn) {
    const transformStyle = imageCtn.style.transform;
    const translateX = transformStyle.replace(/[^-?\d.]/g, '');
    const translateX_Value = +translateX;
    return translateX_Value;
  }
  return {
    ctn,
    navBtns,
    sliderBtnCtn,
    sliderBtns,
    getTranslateValue,
    changeActive() {
      seriesWrappers.forEach((wrapper) => wrapper.classList.toggle('active'));
    },
    findActive() {
      return seriesWrappers.find((wrapper) =>
        wrapper.classList.contains('active')
      );
    },
    changeNumOfSliderBtns() {
      const active = this.findActive();
      let numOfBtns = Math.ceil(active.scrollWidth / ctn.offsetWidth);

      for (var i = 0; i < numOfBtns; i++) {
        sliderBtns[i].classList.remove('inactive');
      }
      for (var j = numOfBtns; j < sliderBtns.length; j++) {
        sliderBtns[j].classList.add('inactive');
      }
    },
    showOrHideSliderBtns() {
      if (ctn.offsetWidth < ctn.scrollWidth) {
        sliderBtnCtn.classList.remove('inactive');
        this.changeNumOfSliderBtns();
        return;
      }
      sliderBtnCtn.classList.add('inactive');
    },
    resetWrapperPos() {
      hourly.style.transform = 'translateX(0px)';
      daily.style.transform = 'translateX(0px)';
    },
    onNav(direction, imageCtn, frame, navBtnClicked, otherNavBtn) {
      slide();
      const newTranslateX = getTranslateValue(imageCtn);
      this.checkForDisableNavBtn(newTranslateX, frame, imageCtn, navBtnClicked);
      this.checkForEnableNavBtn(newTranslateX, frame, imageCtn, otherNavBtn);

      function slide() {
        const transformStyle = imageCtn.style.transform;
        if (!transformStyle)
          imageCtn.style.transform = `translateX(-${frame.offsetWidth}px)`;
        if (transformStyle) {
          const translateX_Value = getTranslateValue(imageCtn);
          switch (direction) {
            case 'left': {
              imageCtn.style.transform = `translateX(${
                translateX_Value + frame.offsetWidth
              }px)`;
              break;
            }
            case 'right': {
              imageCtn.style.transform = `translateX(${
                translateX_Value - frame.offsetWidth
              }px)`;
              break;
            }
          }
        }
      }
    },
    checkForDisableNavBtn(translateX_Val, frame, imageCtn, ...navBtn) {
      const [leftNavBtn, rightNavBtn] = navBtn;
      if (translateX_Val === 0) disableNavBtn(leftNavBtn);
      if (+translateX_Val - frame.offsetWidth <= -imageCtn.scrollWidth)
        navBtn[1] ? disableNavBtn(rightNavBtn) : disableNavBtn(leftNavBtn);

      function disableNavBtn(btn) {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '.3';
      }
    },
    checkForEnableNavBtn(translateX_Val, frame, imageCtn, ...navBtn) {
      const [leftNavBtn, rightNavBtn] = navBtn;
      if (translateX_Val < 0) removeStyling(leftNavBtn);
      if (+translateX_Val - frame.offsetWidth > -imageCtn.scrollWidth)
        navBtn[1] ? removeStyling(rightNavBtn) : removeStyling(leftNavBtn);

      function removeStyling(btn) {
        btn.style.pointerEvents = 'all';
        btn.style.opacity = '1';
      }
    },
    adjustActiveCounter(imageCtn, counterCtn, frame, activeClass) {
      const counters = counterCtn.querySelectorAll('.slider-btn');
      counters.forEach((counter) => counter.classList.remove(activeClass));
      let translateX_Value = getTranslateValue(imageCtn);
      let currentImageIndex = -translateX_Value / frame.offsetWidth;
      counters[currentImageIndex].classList.add(activeClass);
    },
    onCounter(
      e,
      counterCtn,
      imageCtn,
      activeClass,
      frame,
      leftNavBtn,
      rightNavBtn
    ) {
      const counterClicked = e.target;
      const counters = [...counterCtn.querySelectorAll('.slider-btn')];
      const activeCounter = counters.find((counter) =>
        counter.classList.contains(activeClass)
      );
      activeCounter.classList.remove(activeClass);
      counterClicked.classList.add(activeClass);

      const activeCounterIndex = counters.findIndex(
        (counter) => counter === activeCounter
      );
      const counterClickedIndex = counters.findIndex(
        (counter) => counter === counterClicked
      );
      const numOfPlacesMoved = counterClickedIndex - activeCounterIndex;
      const translateX_Val = getTranslateValue(imageCtn);
      imageCtn.style.transform = `translateX(${
        -numOfPlacesMoved * imageCtn.parentNode.offsetWidth + translateX_Val
      }px)`;

      const newTranslateX = getTranslateValue(imageCtn);
      this.checkForDisableNavBtn(
        newTranslateX,
        frame,
        imageCtn,
        leftNavBtn,
        rightNavBtn
      );
      this.checkForEnableNavBtn(
        newTranslateX,
        frame,
        imageCtn,
        leftNavBtn,
        rightNavBtn
      );
    },
  };
})();
