import { getForecast } from './getForecast';
import {setToggle, disableToggle} from './toggleState';
import { currentWeatherUI, dailyForecastUI, hourlyForecastUI } from './UI';

const form = document.querySelector('form');
form.addEventListener('submit', formSubmitHandler);
let tempState = [];



function formSubmitHandler(e) {
  tempState = [];
  e.preventDefault();
  const city = document.querySelector('form input').value;
  disableToggle();
  getForecast(city).then(({ hourly, daily, current }) => {
    currentWeatherUI(city, current);
    hourlyForecastUI(hourly);
    dailyForecastUI(daily);
    setToggle();
  });
}

export { tempState };
