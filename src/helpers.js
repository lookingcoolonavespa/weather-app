export { helpers };

const helpers = (() => ({
  getDateStr(unix) {
    const dateObj = new Date(+unix * 1000);
    const dayOfWeek = dateObj.toLocaleDateString('en-us', {
      weekday: 'short',
    });
    const month = dateObj.toLocaleDateString('en-us', {
      month: 'short',
    });
    const date = dateObj.getDate();
    const dateStr = `${dayOfWeek} ${month} ${date}`;
    return dateStr;
  },
  getDateTimeStr(unix) {
    const dateStr = this.getDateStr(unix);
    const timeStr = this.getTimeStr(unix);

    return `${dateStr} ${timeStr}`;
  },
  getTimeStr(unix) {
    const dateObj = new Date(+unix * 1000);
    const timeStr = dateObj.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return timeStr;
  },
}))();
