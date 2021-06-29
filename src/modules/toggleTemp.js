import {
  getCelsiusFromFahrenheit,
  getFahrenheitFromCelsius,
} from './temp-converter';

import { tempState } from './formHandler';

const checkBox = document.querySelector('#temp-toggle-check');
const tempHolders = Array.from(document.querySelectorAll('.temp'));

checkBox.addEventListener('change', toggleTemps);

function toggleTemps() {
  const currentTempElem = document.querySelector('#current-temp');
  let i = 1;
  if (checkBox.checked) {
    tempHolders.forEach((tempHolder) => {
      tempHolder.innerText = getFahrenheitFromCelsius(tempState[i++]).toFixed(
        2,
      );
    });
    currentTempElem.innerHTML = `${getFahrenheitFromCelsius(
      +tempState[0],
    ).toFixed(2)}&deg;F`;
  } else {
    tempHolders.forEach((tempHolder) => {
      tempHolder.innerText = getCelsiusFromFahrenheit(
        +tempHolder.innerText,
      ).toFixed(2);
    });
    currentTempElem.innerHTML = `${(+tempState[0]).toFixed(2)}&deg;C`;
  }
}


