import { getCelsiusFromKelvin } from './temp-converter';
import { toDay } from './toDay';

const API_KEY = '8126b905d6c992123f033e88e0c0bc59';

function getTime(utc) {
  return new Date(utc * 1000);
}

function fetchCoords(cityName) {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`,
  )
    .then((response) => response.json())
    .then((data) => {
      return { lat: data[0].lat, lon: data[0].lon };
    });
}

function getCurrentContent(data) {
  return {
    time: [getTime(data.current.dt)],
    icon: [data.current.weather[0].icon],
    temperature: [getCelsiusFromKelvin(data.current.temp)],
    description: data.current.weather[0].description,
    max: getCelsiusFromKelvin(data.daily[0].temp.max),
    min: getCelsiusFromKelvin(data.daily[0].temp.min),
    day: toDay(data.current.dt),
  };
}

function getNext4HourContent(data) {
  const next4HoursData = {
    times: [],
    icons: [],
    temperatures: [],
  };

  data.hourly.slice(2, 6).forEach((hourData) => {
    next4HoursData.times.push(getTime(+hourData.dt));
    next4HoursData.icons.push(hourData.weather[0].icon);
    next4HoursData.temperatures.push(getCelsiusFromKelvin(hourData.temp));
  });

  return next4HoursData;
}

export function getHourlyForecast(data) {
  const current = getCurrentContent(data);
  const next4Hour = getNext4HourContent(data);
  return {
    times: current.time.concat(next4Hour.times),
    icons: current.icon.concat(next4Hour.icons),
    temperatures: current.temperature.concat(next4Hour.temperatures),
  };
}

export function getDailyForecast(data) {
  const next5DayData = data.daily.slice(1, 6);
  const days = [];
  const icons = [];
  const maxs = [];
  const mins = [];
  next5DayData.forEach((data) => {
    days.push(toDay(data.dt));
    icons.push(data.weather[0].icon);
    maxs.push(getCelsiusFromKelvin(data.temp.max));
    mins.push(getCelsiusFromKelvin(data.temp.min));
  });
  return { days, icons, maxs, mins };
}

export function getForecast(cityName) {
  return fetchCoords(cityName)
    .then(({ lat, lon }) => {
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      );
    })
    .then((response) => response.json())
    .then((data) => {
      return {
        hourly: getHourlyForecast(data),
        daily: getDailyForecast(data),
        current: getCurrentContent(data),
      };
    });
}
