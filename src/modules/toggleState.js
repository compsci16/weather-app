export function setToggle() {
  document.querySelector('#temp-toggle-check').disabled = false;
  document.querySelector('#temp-toggle-check').checked = false;
}

export function disableToggle() {
  document.querySelector('#temp-toggle-check').disabled = true;
}
