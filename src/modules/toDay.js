export function toDay(utc) {
  const dateVal = new Date(utc * 1000);
  const options = { weekday: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(dateVal);
}
