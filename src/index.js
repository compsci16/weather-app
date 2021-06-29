import './modules/utils';
import './index.css';
import { getForecast } from './modules/getForecast';
import {
  currentWeatherUI,
  hourlyForecastUI,
  dailyForecastUI,
} from './modules/UI';

import { setToggle, disableToggle } from './modules/toggleState';

function initialState() {
  const city = document.querySelector('form input').value;
  disableToggle();
  getForecast(city).then(({ hourly, daily, current }) => {
    currentWeatherUI(city, current);
    hourlyForecastUI(hourly);
    dailyForecastUI(daily);
    setToggle();
  });
}

initialState();