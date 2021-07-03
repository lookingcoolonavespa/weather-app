export { forecast };

const forecast = (() => {
  const ctn = document.getElementById('forecast-wrapper');
  const days = ctn.children;
  return { days };
})();
