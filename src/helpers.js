export { helpers };

const helpers = (() => ({
  convertTemp(num, unit) {
    switch (unit) {
      case 'F': {
        return ((num - 273.15) * 9) / 5 + 32;
      }
      case 'C': {
        return num - 273.15;
      }
    }
  },
}))();
