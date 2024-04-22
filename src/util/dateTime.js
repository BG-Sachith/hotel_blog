const moment = require('moment-timezone');

export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function dateTimeNow() {
  return new Date().toLocaleString('en-US', {
    timeZone: timeZone,
  });
}

export function dateTimeFrom(v) {
  return moment.tz(v, timeZone).format('YYYY-MM-DD, HH:mm:ss');
}

export function dateFrom(v) {
  return moment.tz(v, timeZone).format('YYYY-MM-DD');
}
