const SegmentModel = Backbone.Model.extend({
  normalizeDigitOut(digits) {
    digits = digits.toString();
    return digits.length === 1 ? `0${digits}` : digits;
  },

  getStrDuration() {
    let durationHours = Math.floor(this.get('duration') / 1000 / 60 / 60);
    let durationMinutes = this.get('duration') - durationHours * 60 * 60 * 1000;
    durationHours = this.normalizeDigitOut((durationHours));
    durationMinutes = this.normalizeDigitOut((durationMinutes / 100 / 60 / 60));
    return {
      duration: this.get('duration'),
      formatted:`${durationHours}ч ${durationMinutes}м`
    };
  },

  stopsParse() {
    const ending = (arr) => {
      const arrStopsStr = ['ОСТАНОВКА', 'ОСТАНОВКИ', 'ОСТАНОВОК'];
      const cases = [2, 0, 1, 1, 1, 2];
      let stopsLength = arr.length;
      if (stopsLength) {
        return stopsLength + ' ' + arrStopsStr[
          (stopsLength % 100 > 4 && stopsLength % 100 < 20)
            ? 2
            : cases[(stopsLength % 10 < 5) ? stopsLength % 10 : 5]
          ];
      } else {
        return 'БЕЗ ОСТАНОВОК';
      }
    };

    const stops = this.get('stops');
    const stopsObject = {};
    stopsObject.stops = stops.join(', ');
    stopsObject.description = ending(stops);
    stopsObject.stopsArr = stops;

    return stopsObject;
  },

  timeFormat(utcTime) {
    const time = new Date(utcTime);
    let hours = this.normalizeDigitOut(time.getHours());
    let minutes = this.normalizeDigitOut(time.getMinutes());

    return `${hours}:${minutes}`;
  }
});