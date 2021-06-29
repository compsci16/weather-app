import { tempState } from './formHandler';
import { iconSetter } from './iconSetter';

function getTimeStrings(times) {
    return times.map((time) => {
      const hr = ('0' + time.getHours()).slice(-2);
      const min = ('0' + time.getMinutes()).slice(-2);
      return `${hr}:${min}`;
    });
  }

function currentWeatherUI(city, { description, temperature, max, min, day }) {
  document.getElementById('city').innerText = city;
  document.getElementById('des').innerText = description;
  document.getElementById('current-temp').innerHTML = `${(+temperature).toFixed(
    2,
  )} &deg;C`;
  document.getElementById('today-day').innerText = day;
  document.getElementById('today-min').innerText = min.toFixed(2);
  document.getElementById('today-max').innerText = max.toFixed(2);
  tempState.push(temperature, max, min);
}

function hourlyForecastUI({ times, icons, temperatures }) {
  times = getTimeStrings(times);
  const blocks = Array.from(
    document.querySelectorAll('#today-forecast .today-item'),
  );
  let i = 0;
  blocks.forEach((block) => {
    block.querySelector('.time').innerText = times[i];
    iconSetter(block.querySelector('.icon'), icons[i]);
    // block.querySelector('.icon').innerHTML = icons[i];
    block.querySelector('.temp').innerText = temperatures[i].toFixed(2);
    tempState.push(temperatures[i]);
    i++;
  });
}

function dailyForecastUI({ days, icons, maxs, mins }) {
  const rows = Array.from(
    document.querySelectorAll('#weekly-forecast .weekly-item'),
  );
  let i = 0;
  rows.forEach((row) => {
    row.querySelector('.day').innerText = days[i];
    iconSetter(row.querySelector('.icon'), icons[i]);
    // row.querySelector('.icon').innerHTML = icons[i];
    row.querySelector('.max').innerText = maxs[i].toFixed(2);
    row.querySelector('.min').innerText = mins[i].toFixed(2);
    tempState.push(maxs[i], mins[i]);
    i++;
  });
}

export { currentWeatherUI, dailyForecastUI, hourlyForecastUI };
