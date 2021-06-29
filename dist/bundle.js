/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentWeatherUI": () => (/* binding */ currentWeatherUI),
/* harmony export */   "dailyForecastUI": () => (/* binding */ dailyForecastUI),
/* harmony export */   "hourlyForecastUI": () => (/* binding */ hourlyForecastUI)
/* harmony export */ });
/* harmony import */ var _formHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formHandler */ "./src/modules/formHandler.js");
/* harmony import */ var _iconSetter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iconSetter */ "./src/modules/iconSetter.js");



function getTimeStrings(times) {
  return times.map(function (time) {
    var hr = ('0' + time.getHours()).slice(-2);
    var min = ('0' + time.getMinutes()).slice(-2);
    return "".concat(hr, ":").concat(min);
  });
}

function currentWeatherUI(city, _ref) {
  var description = _ref.description,
      temperature = _ref.temperature,
      max = _ref.max,
      min = _ref.min,
      day = _ref.day;
  document.getElementById('city').innerText = city;
  document.getElementById('des').innerText = description;
  document.getElementById('current-temp').innerHTML = "".concat((+temperature).toFixed(2), " &deg;C");
  document.getElementById('today-day').innerText = day;
  document.getElementById('today-min').innerText = min.toFixed(2);
  document.getElementById('today-max').innerText = max.toFixed(2);
  _formHandler__WEBPACK_IMPORTED_MODULE_0__.tempState.push(temperature, max, min);
}

function hourlyForecastUI(_ref2) {
  var times = _ref2.times,
      icons = _ref2.icons,
      temperatures = _ref2.temperatures;
  times = getTimeStrings(times);
  var blocks = Array.from(document.querySelectorAll('#today-forecast .today-item'));
  var i = 0;
  blocks.forEach(function (block) {
    block.querySelector('.time').innerText = times[i];
    (0,_iconSetter__WEBPACK_IMPORTED_MODULE_1__.iconSetter)(block.querySelector('.icon'), icons[i]); // block.querySelector('.icon').innerHTML = icons[i];

    block.querySelector('.temp').innerText = temperatures[i].toFixed(2);
    _formHandler__WEBPACK_IMPORTED_MODULE_0__.tempState.push(temperatures[i]);
    i++;
  });
}

function dailyForecastUI(_ref3) {
  var days = _ref3.days,
      icons = _ref3.icons,
      maxs = _ref3.maxs,
      mins = _ref3.mins;
  var rows = Array.from(document.querySelectorAll('#weekly-forecast .weekly-item'));
  var i = 0;
  rows.forEach(function (row) {
    row.querySelector('.day').innerText = days[i];
    (0,_iconSetter__WEBPACK_IMPORTED_MODULE_1__.iconSetter)(row.querySelector('.icon'), icons[i]); // row.querySelector('.icon').innerHTML = icons[i];

    row.querySelector('.max').innerText = maxs[i].toFixed(2);
    row.querySelector('.min').innerText = mins[i].toFixed(2);
    _formHandler__WEBPACK_IMPORTED_MODULE_0__.tempState.push(maxs[i], mins[i]);
    i++;
  });
}



/***/ }),

/***/ "./src/modules/formHandler.js":
/*!************************************!*\
  !*** ./src/modules/formHandler.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tempState": () => (/* binding */ tempState)
/* harmony export */ });
/* harmony import */ var _getForecast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getForecast */ "./src/modules/getForecast.js");
/* harmony import */ var _toggleState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toggleState */ "./src/modules/toggleState.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ "./src/modules/UI.js");



var form = document.querySelector('form');
form.addEventListener('submit', formSubmitHandler);
var tempState = [];

function formSubmitHandler(e) {
  tempState = [];
  e.preventDefault();
  var city = document.querySelector('form input').value;
  (0,_toggleState__WEBPACK_IMPORTED_MODULE_1__.disableToggle)();
  (0,_getForecast__WEBPACK_IMPORTED_MODULE_0__.getForecast)(city).then(function (_ref) {
    var hourly = _ref.hourly,
        daily = _ref.daily,
        current = _ref.current;
    (0,_UI__WEBPACK_IMPORTED_MODULE_2__.currentWeatherUI)(city, current);
    (0,_UI__WEBPACK_IMPORTED_MODULE_2__.hourlyForecastUI)(hourly);
    (0,_UI__WEBPACK_IMPORTED_MODULE_2__.dailyForecastUI)(daily);
    (0,_toggleState__WEBPACK_IMPORTED_MODULE_1__.setToggle)();
  });
}



/***/ }),

/***/ "./src/modules/getCurrentWeather.js":
/*!******************************************!*\
  !*** ./src/modules/getCurrentWeather.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCurrentWeather)
/* harmony export */ });
var API_KEY = '8126b905d6c992123f033e88e0c0bc59';
function getCurrentWeather(cityName) {
  return fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(cityName, "&appid=").concat(API_KEY)).then(function (res) {
    return res.json();
  }).then(function (data) {
    return Promise.resolve({
      description: data.weather[0].main,
      temperature: data.main.temp
    });
  });
}

/***/ }),

/***/ "./src/modules/getForecast.js":
/*!************************************!*\
  !*** ./src/modules/getForecast.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHourlyForecast": () => (/* binding */ getHourlyForecast),
/* harmony export */   "getDailyForecast": () => (/* binding */ getDailyForecast),
/* harmony export */   "getForecast": () => (/* binding */ getForecast)
/* harmony export */ });
/* harmony import */ var _temp_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./temp-converter */ "./src/modules/temp-converter.js");
/* harmony import */ var _toDay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDay */ "./src/modules/toDay.js");


var API_KEY = '8126b905d6c992123f033e88e0c0bc59';

function getTime(utc) {
  return new Date(utc * 1000);
}

function fetchCoords(cityName) {
  return fetch("https://api.openweathermap.org/geo/1.0/direct?q=".concat(cityName, "&appid=").concat(API_KEY)).then(function (response) {
    return response.json();
  }).then(function (data) {
    return {
      lat: data[0].lat,
      lon: data[0].lon
    };
  });
}

function getCurrentContent(data) {
  return {
    time: [getTime(data.current.dt)],
    icon: [data.current.weather[0].icon],
    temperature: [(0,_temp_converter__WEBPACK_IMPORTED_MODULE_0__.getCelsiusFromKelvin)(data.current.temp)],
    description: data.current.weather[0].description,
    max: (0,_temp_converter__WEBPACK_IMPORTED_MODULE_0__.getCelsiusFromKelvin)(data.daily[0].temp.max),
    min: (0,_temp_converter__WEBPACK_IMPORTED_MODULE_0__.getCelsiusFromKelvin)(data.daily[0].temp.min),
    day: (0,_toDay__WEBPACK_IMPORTED_MODULE_1__.toDay)(data.current.dt)
  };
}

function getNext4HourContent(data) {
  var next4HoursData = {
    times: [],
    icons: [],
    temperatures: []
  };
  data.hourly.slice(2, 6).forEach(function (hourData) {
    next4HoursData.times.push(getTime(+hourData.dt));
    next4HoursData.icons.push(hourData.weather[0].icon);
    next4HoursData.temperatures.push((0,_temp_converter__WEBPACK_IMPORTED_MODULE_0__.getCelsiusFromKelvin)(hourData.temp));
  });
  return next4HoursData;
}

function getHourlyForecast(data) {
  var current = getCurrentContent(data);
  var next4Hour = getNext4HourContent(data);
  return {
    times: current.time.concat(next4Hour.times),
    icons: current.icon.concat(next4Hour.icons),
    temperatures: current.temperature.concat(next4Hour.temperatures)
  };
}
function getDailyForecast(data) {
  var next5DayData = data.daily.slice(1, 6);
  var days = [];
  var icons = [];
  var maxs = [];
  var mins = [];
  next5DayData.forEach(function (data) {
    days.push((0,_toDay__WEBPACK_IMPORTED_MODULE_1__.toDay)(data.dt));
    icons.push(data.weather[0].icon);
    maxs.push((0,_temp_converter__WEBPACK_IMPORTED_MODULE_0__.getCelsiusFromKelvin)(data.temp.max));
    mins.push((0,_temp_converter__WEBPACK_IMPORTED_MODULE_0__.getCelsiusFromKelvin)(data.temp.min));
  });
  return {
    days: days,
    icons: icons,
    maxs: maxs,
    mins: mins
  };
}
function getForecast(cityName) {
  return fetchCoords(cityName).then(function (_ref) {
    var lat = _ref.lat,
        lon = _ref.lon;
    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(lon, "&appid=").concat(API_KEY));
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return {
      hourly: getHourlyForecast(data),
      daily: getDailyForecast(data),
      current: getCurrentContent(data)
    };
  });
}

/***/ }),

/***/ "./src/modules/iconSetter.js":
/*!***********************************!*\
  !*** ./src/modules/iconSetter.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iconSetter": () => (/* binding */ iconSetter)
/* harmony export */ });
function iconSetter(img, name) {
  img.src = "https://openweathermap.org/img/wn/".concat(name, "@2x.png");
}

/***/ }),

/***/ "./src/modules/temp-converter.js":
/*!***************************************!*\
  !*** ./src/modules/temp-converter.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFahrenheitFromCelsius": () => (/* binding */ getFahrenheitFromCelsius),
/* harmony export */   "getCelsiusFromFahrenheit": () => (/* binding */ getCelsiusFromFahrenheit),
/* harmony export */   "getCelsiusFromKelvin": () => (/* binding */ getCelsiusFromKelvin)
/* harmony export */ });
function getFahrenheitFromCelsius(celsius) {
  return celsius * (9.0 / 5) + 32;
}
function getCelsiusFromFahrenheit(fahrenheit) {
  return (fahrenheit - 32.0) * (5 / 9);
}
function getCelsiusFromKelvin(kelvin) {
  return kelvin - 273.15;
}

/***/ }),

/***/ "./src/modules/toDay.js":
/*!******************************!*\
  !*** ./src/modules/toDay.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toDay": () => (/* binding */ toDay)
/* harmony export */ });
function toDay(utc) {
  var dateVal = new Date(utc * 1000);
  var options = {
    weekday: 'long'
  };
  return new Intl.DateTimeFormat('en-US', options).format(dateVal);
}

/***/ }),

/***/ "./src/modules/toggleState.js":
/*!************************************!*\
  !*** ./src/modules/toggleState.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setToggle": () => (/* binding */ setToggle),
/* harmony export */   "disableToggle": () => (/* binding */ disableToggle)
/* harmony export */ });
function setToggle() {
  document.querySelector('#temp-toggle-check').disabled = false;
  document.querySelector('#temp-toggle-check').checked = false;
}
function disableToggle() {
  document.querySelector('#temp-toggle-check').disabled = true;
}

/***/ }),

/***/ "./src/modules/toggleTemp.js":
/*!***********************************!*\
  !*** ./src/modules/toggleTemp.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _temp_converter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./temp-converter */ "./src/modules/temp-converter.js");
/* harmony import */ var _formHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formHandler */ "./src/modules/formHandler.js");


var checkBox = document.querySelector('#temp-toggle-check');
var tempHolders = Array.from(document.querySelectorAll('.temp'));
checkBox.addEventListener('change', toggleTemps);

function toggleTemps() {
  var currentTempElem = document.querySelector('#current-temp');
  var i = 1;

  if (checkBox.checked) {
    tempHolders.forEach(function (tempHolder) {
      tempHolder.innerText = (0,_temp_converter__WEBPACK_IMPORTED_MODULE_0__.getFahrenheitFromCelsius)(_formHandler__WEBPACK_IMPORTED_MODULE_1__.tempState[i++]).toFixed(2);
    });
    currentTempElem.innerHTML = "".concat((0,_temp_converter__WEBPACK_IMPORTED_MODULE_0__.getFahrenheitFromCelsius)(+_formHandler__WEBPACK_IMPORTED_MODULE_1__.tempState[0]).toFixed(2), "&deg;F");
  } else {
    tempHolders.forEach(function (tempHolder) {
      tempHolder.innerText = (0,_temp_converter__WEBPACK_IMPORTED_MODULE_0__.getCelsiusFromFahrenheit)(+tempHolder.innerText).toFixed(2);
    });
    currentTempElem.innerHTML = "".concat((+_formHandler__WEBPACK_IMPORTED_MODULE_1__.tempState[0]).toFixed(2), "&deg;C");
  }
}

/***/ }),

/***/ "./src/modules/utils.js":
/*!******************************!*\
  !*** ./src/modules/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getCurrentWeather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentWeather */ "./src/modules/getCurrentWeather.js");
/* harmony import */ var _formHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formHandler */ "./src/modules/formHandler.js");
/* harmony import */ var _toggleTemp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toggleTemp */ "./src/modules/toggleTemp.js");




/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css ***!
  \****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./node_modules/normalize.css/normalize.css"],"names":[],"mappings":"AAAA,2EAA2E;;AAE3E;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,iBAAiB,EAAE,MAAM;EACzB,8BAA8B,EAAE,MAAM;AACxC;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,SAAS;AACX;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;EACE,cAAc;EACd,gBAAgB;AAClB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;EACE,uBAAuB,EAAE,MAAM;EAC/B,SAAS,EAAE,MAAM;EACjB,iBAAiB,EAAE,MAAM;AAC3B;;AAEA;;;EAGE;;AAEF;EACE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,6BAA6B;AAC/B;;AAEA;;;EAGE;;AAEF;EACE,mBAAmB,EAAE,MAAM;EAC3B,0BAA0B,EAAE,MAAM;EAClC,iCAAiC,EAAE,MAAM;AAC3C;;AAEA;;EAEE;;AAEF;;EAEE,mBAAmB;AACrB;;AAEA;;;EAGE;;AAEF;;;EAGE,iCAAiC,EAAE,MAAM;EACzC,cAAc,EAAE,MAAM;AACxB;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,wBAAwB;AAC1B;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;;EAGE;;AAEF;;;;;EAKE,oBAAoB,EAAE,MAAM;EAC5B,eAAe,EAAE,MAAM;EACvB,iBAAiB,EAAE,MAAM;EACzB,SAAS,EAAE,MAAM;AACnB;;AAEA;;;EAGE;;AAEF;QACQ,MAAM;EACZ,iBAAiB;AACnB;;AAEA;;;EAGE;;AAEF;SACS,MAAM;EACb,oBAAoB;AACtB;;AAEA;;EAEE;;AAEF;;;;EAIE,0BAA0B;AAC5B;;AAEA;;EAEE;;AAEF;;;;EAIE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE;;AAEF;;;;EAIE,8BAA8B;AAChC;;AAEA;;EAEE;;AAEF;EACE,8BAA8B;AAChC;;AAEA;;;;;EAKE;;AAEF;EACE,sBAAsB,EAAE,MAAM;EAC9B,cAAc,EAAE,MAAM;EACtB,cAAc,EAAE,MAAM;EACtB,eAAe,EAAE,MAAM;EACvB,UAAU,EAAE,MAAM;EAClB,mBAAmB,EAAE,MAAM;AAC7B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;;EAGE;;AAEF;;EAEE,sBAAsB,EAAE,MAAM;EAC9B,UAAU,EAAE,MAAM;AACpB;;AAEA;;EAEE;;AAEF;;EAEE,YAAY;AACd;;AAEA;;;EAGE;;AAEF;EACE,6BAA6B,EAAE,MAAM;EACrC,oBAAoB,EAAE,MAAM;AAC9B;;AAEA;;EAEE;;AAEF;EACE,wBAAwB;AAC1B;;AAEA;;;EAGE;;AAEF;EACE,0BAA0B,EAAE,MAAM;EAClC,aAAa,EAAE,MAAM;AACvB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,cAAc;AAChB;;AAEA;;EAEE;;AAEF;EACE,kBAAkB;AACpB;;AAEA;+EAC+E;;AAE/E;;EAEE;;AAEF;EACE,aAAa;AACf;;AAEA;;EAEE;;AAEF;EACE,aAAa;AACf","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_normalize_css_normalize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!../node_modules/normalize.css/normalize.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _images_bg_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/bg.jpg */ "./src/images/bg.jpg");
// Imports





var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@100&display=swap);"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_node_modules_normalize_css_normalize_css__WEBPACK_IMPORTED_MODULE_2__.default);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(_images_bg_jpg__WEBPACK_IMPORTED_MODULE_4__);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  /* color: white; */\n  /* color: black;  */\n  /* border: 1px solid black; */\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n}\n\nhtml,\nbody {\n  height: 100vh;\n  overflow: hidden;\n}\nbody {\n  display: flex;\n  font-family: \"Libre Franklin\";\n  color: white;\n}\n\n.container {\n  flex: 1;\n  display: grid;\n  grid-template-rows: 10% 30% 5% 20% 35%;\n}\n\n#utilities {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n\n#search-form * {\n  flex-grow: 1;\n}\n\n#utilities form {\n  align-self: center;\n  display: flex;\n  border-radius: 10rem;\n  font-size: 1.1rem;\ncolor: white;\n  border: 1.5px solid teal;\n  width: 80%;\n  margin-top: 5px;\n}\n\n#utilities form:focus-within {\n  box-shadow: inset 0 0 2px white,\n    0 0 1px rgb(4, 250, 250);\n}\n\n#utilities form button {\n  all: unset;\n  padding-right: 0.5rem;\n  font-size: 120%;\n}\n\n#utilities form button:hover {\n  color: teal;\n}\n\n#utilities input[type=\"text\"] {\n  border: none;\n  background-image: none;\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n  padding-left: 0.8rem;\n  padding-top: 0.2rem;\n  padding-bottom: 0.2rem;\n  display: inline-flex;\n  align-items: center;\n  height: 2rem;\n  color: white; \n  /* color: black; */\n  line-height: normal;\n}\n\n#utilities input::placeholder {\n  /* color: black; */\n  color: white; \n}\n\n#utilities input[type=\"text\"]:focus {\n  outline: none;\n}\n\n#utilities #temp-toggle-bar {\n  margin-top: 7px;\n  margin-right: 6px;\n  align-self: flex-end;\n  position: relative;\n  width: 4rem;\n  max-height: 2rem;\n  min-height: 2rem;\n  background-color: rgba(5, 205, 255, 0.349);\n}\n\n#utilities #temp-toggle-check {\n  position: absolute;\n  cursor: pointer;\n  appearance: none;\n  background-color: white;\n  height: 1.6rem;\n  width: 1.6rem;\n  transition: transform 0.3s linear;\n  z-index: 10;\n  top: 0.2rem;\n  left: 0.2rem;\n}\n\n#utilities #temp-toggle-check:checked {\n  transform: translateX(2rem);\n}\n\n#utilities #temp-toggle-label {\n  position: absolute;\n  max-height: 2rem;\n  min-height: 2rem;\n  width: 4rem;\n  /* background-color: orange; */\n}\n\n#utilities #temp-toggle-label div {\n  position: absolute;\n  top: 1rem;\n  transform: translateY(-50%);\n  font-size: 1.5rem;\n  padding: 0 5px;\n}\n\n#utilities #temp-toggle-label div:last-child {\n  right: 0;\n}\n\n#current {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n#current #city {\n  font-size: 3.5rem;\n  font-weight: bold;\n}\n\n#current #des {\n  font-size: 1.2rem;\n}\n\n#current #current-temp {\n  font-size: 3rem;\n  padding-bottom: 40px;\n  font-weight: bold;\n}\n\n#today {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  font-weight: bold;\n}\n\n#today-forecast {\n  display: flex;\n  list-style: none;\n\n  align-items: flex-start;\n}\n\n#today-forecast .today-item {\n  height: 100%;\n  flex-grow: 1;\n  display: grid;\n  grid-template-rows: 15% 45% 15%;\n  grid-template-areas:\n    \"time\"\n    \"img\"\n    \"temp\";\n  place-items: center center;\n  align-content: center;\n}\n\n#today-forecast .today-item img {\n  display: block;\n  grid-area: img;\n  object-fit: cover;\n  width: 100%;\n  max-height: 100%;\n  padding: 0;\n  margin: 0;\n  /* transform: scale(0.9); */\n}\n\n#weekly-forecast {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n\n#weekly-forecast .weekly-item {\n  /* width: 50%;  */\n  width: 100%;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  height: 26%;\n  justify-content: center;\n}\n\n#weekly-forecast .weekly-item .day {\n  width: 9ch;\n}\n\n#weekly-forecast .weekly-item .min,\n.max {\n  width: 5ch;\n  /* text-align: center; */\n}\n\n.weekly-item:nth-child(n+2){\n  margin-top: -15px;\n\n}\n\n.weekly-item img {\n  transform: scale(0.6);\n}\n\n/* // Small devices (landscape phones, 576px and up) */\n@media (min-width: 576px) {\n  #utilities form {\n    width: 50%;\n    margin-left: -200px;\n  }\n\n  .weekly-item div:last-child {\n    padding-left: 30px;\n  }\n}\n\n/* // Medium devices (tablets, 768px and up) */\n@media (min-width: 768px) {\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 60px;\n  }\n  #utilities form {\n    width: 40%;\n    margin-left: -400px;\n  }\n\n  #utilities #temp-toggle-bar {\n    margin-right: 30px;\n  }\n}\n\n/* // Large devices (desktops, 992px and up) */\n@media (min-width: 992px) {\n\n.weekly-item:nth-child(n+2){\n  margin-top: -17px;\n}\n \n  .container {\n    grid-template-rows: 6% 22% 5% 20% 47%;\n  }\n\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 150px;\n  }\n  #utilities form {\n    margin-left: -90%;\n  }\n  #utilities #temp-toggle-bar {\n    margin-top: -2rem;\n    margin-right: -2rem;\n  }\n  .weekly-item img {\n    transform: scale(0.8);\n  }\n\n  /* #utilities form {\n    margin-left: -800px;\n    width: 40%;\n  }\n\n  #utilities #temp-toggle-bar {\n    margin-right: 10px;\n  }\n  .weekly-item div:last-child {\n    padding-left: 50px;\n  } */\n}\n\n\n\n/* // X-Large devices (large desktops, 1200px and up) */\n@media (min-width: 1200px) {\n \n\n.weekly-item:nth-child(n+2){\n  margin-top: -18px;\n}\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 200px;\n  }\n  #utilities form {\n    margin-left: -150px;\n    width: 35%;\n    align-self: flex-start;\n  }\n\n  .weekly-item div:first-child {\n    width: 10%;\n  }\n}\n\n/* // XX-Large devices (larger desktops, 1400px and up) */\n@media (min-width: 1400px) {\n}\n", "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@100&display=swap\");\n@import \"~normalize.css/normalize.css\";\n\n* {\n  /* color: white; */\n  /* color: black;  */\n  /* border: 1px solid black; */\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  background: url(./images/bg.jpg) no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n}\n\nhtml,\nbody {\n  height: 100vh;\n  overflow: hidden;\n}\nbody {\n  display: flex;\n  font-family: \"Libre Franklin\";\n  color: white;\n}\n\n.container {\n  flex: 1;\n  display: grid;\n  grid-template-rows: 10% 30% 5% 20% 35%;\n}\n\n#utilities {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n\n#search-form * {\n  flex-grow: 1;\n}\n\n#utilities form {\n  align-self: center;\n  display: flex;\n  border-radius: 10rem;\n  font-size: 1.1rem;\ncolor: white;\n  border: 1.5px solid teal;\n  width: 80%;\n  margin-top: 5px;\n}\n\n#utilities form:focus-within {\n  box-shadow: inset 0 0 2px white,\n    0 0 1px rgb(4, 250, 250);\n}\n\n#utilities form button {\n  all: unset;\n  padding-right: 0.5rem;\n  font-size: 120%;\n}\n\n#utilities form button:hover {\n  color: teal;\n}\n\n#utilities input[type=\"text\"] {\n  border: none;\n  background-image: none;\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n  padding-left: 0.8rem;\n  padding-top: 0.2rem;\n  padding-bottom: 0.2rem;\n  display: inline-flex;\n  align-items: center;\n  height: 2rem;\n  color: white; \n  /* color: black; */\n  line-height: normal;\n}\n\n#utilities input::placeholder {\n  /* color: black; */\n  color: white; \n}\n\n#utilities input[type=\"text\"]:focus {\n  outline: none;\n}\n\n#utilities #temp-toggle-bar {\n  margin-top: 7px;\n  margin-right: 6px;\n  align-self: flex-end;\n  position: relative;\n  width: 4rem;\n  max-height: 2rem;\n  min-height: 2rem;\n  background-color: rgba(5, 205, 255, 0.349);\n}\n\n#utilities #temp-toggle-check {\n  position: absolute;\n  cursor: pointer;\n  appearance: none;\n  background-color: white;\n  height: 1.6rem;\n  width: 1.6rem;\n  transition: transform 0.3s linear;\n  z-index: 10;\n  top: 0.2rem;\n  left: 0.2rem;\n}\n\n#utilities #temp-toggle-check:checked {\n  transform: translateX(2rem);\n}\n\n#utilities #temp-toggle-label {\n  position: absolute;\n  max-height: 2rem;\n  min-height: 2rem;\n  width: 4rem;\n  /* background-color: orange; */\n}\n\n#utilities #temp-toggle-label div {\n  position: absolute;\n  top: 1rem;\n  transform: translateY(-50%);\n  font-size: 1.5rem;\n  padding: 0 5px;\n}\n\n#utilities #temp-toggle-label div:last-child {\n  right: 0;\n}\n\n#current {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n#current #city {\n  font-size: 3.5rem;\n  font-weight: bold;\n}\n\n#current #des {\n  font-size: 1.2rem;\n}\n\n#current #current-temp {\n  font-size: 3rem;\n  padding-bottom: 40px;\n  font-weight: bold;\n}\n\n#today {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  font-weight: bold;\n}\n\n#today-forecast {\n  display: flex;\n  list-style: none;\n\n  align-items: flex-start;\n}\n\n#today-forecast .today-item {\n  height: 100%;\n  flex-grow: 1;\n  display: grid;\n  grid-template-rows: 15% 45% 15%;\n  grid-template-areas:\n    \"time\"\n    \"img\"\n    \"temp\";\n  place-items: center center;\n  align-content: center;\n}\n\n#today-forecast .today-item img {\n  display: block;\n  grid-area: img;\n  object-fit: cover;\n  width: 100%;\n  max-height: 100%;\n  padding: 0;\n  margin: 0;\n  /* transform: scale(0.9); */\n}\n\n#weekly-forecast {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n}\n\n#weekly-forecast .weekly-item {\n  /* width: 50%;  */\n  width: 100%;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  height: 26%;\n  justify-content: center;\n}\n\n#weekly-forecast .weekly-item .day {\n  width: 9ch;\n}\n\n#weekly-forecast .weekly-item .min,\n.max {\n  width: 5ch;\n  /* text-align: center; */\n}\n\n.weekly-item:nth-child(n+2){\n  margin-top: -15px;\n\n}\n\n.weekly-item img {\n  transform: scale(0.6);\n}\n\n/* // Small devices (landscape phones, 576px and up) */\n@media (min-width: 576px) {\n  #utilities form {\n    width: 50%;\n    margin-left: -200px;\n  }\n\n  .weekly-item div:last-child {\n    padding-left: 30px;\n  }\n}\n\n/* // Medium devices (tablets, 768px and up) */\n@media (min-width: 768px) {\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 60px;\n  }\n  #utilities form {\n    width: 40%;\n    margin-left: -400px;\n  }\n\n  #utilities #temp-toggle-bar {\n    margin-right: 30px;\n  }\n}\n\n/* // Large devices (desktops, 992px and up) */\n@media (min-width: 992px) {\n\n.weekly-item:nth-child(n+2){\n  margin-top: -17px;\n}\n \n  .container {\n    grid-template-rows: 6% 22% 5% 20% 47%;\n  }\n\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 150px;\n  }\n  #utilities form {\n    margin-left: -90%;\n  }\n  #utilities #temp-toggle-bar {\n    margin-top: -2rem;\n    margin-right: -2rem;\n  }\n  .weekly-item img {\n    transform: scale(0.8);\n  }\n\n  /* #utilities form {\n    margin-left: -800px;\n    width: 40%;\n  }\n\n  #utilities #temp-toggle-bar {\n    margin-right: 10px;\n  }\n  .weekly-item div:last-child {\n    padding-left: 50px;\n  } */\n}\n\n\n\n/* // X-Large devices (large desktops, 1200px and up) */\n@media (min-width: 1200px) {\n \n\n.weekly-item:nth-child(n+2){\n  margin-top: -18px;\n}\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 200px;\n  }\n  #utilities form {\n    margin-left: -150px;\n    width: 35%;\n    align-self: flex-start;\n  }\n\n  .weekly-item div:first-child {\n    width: 10%;\n  }\n}\n\n/* // XX-Large devices (larger desktops, 1400px and up) */\n@media (min-width: 1400px) {\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/images/bg.jpg":
/*!***************************!*\
  !*** ./src/images/bg.jpg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "481637b78de45ff833ff.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/utils */ "./src/modules/utils.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _modules_getForecast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/getForecast */ "./src/modules/getForecast.js");
/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/UI */ "./src/modules/UI.js");
/* harmony import */ var _modules_toggleState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/toggleState */ "./src/modules/toggleState.js");






function initialState() {
  var city = document.querySelector('form input').value;
  (0,_modules_toggleState__WEBPACK_IMPORTED_MODULE_4__.disableToggle)();
  (0,_modules_getForecast__WEBPACK_IMPORTED_MODULE_2__.getForecast)(city).then(function (_ref) {
    var hourly = _ref.hourly,
        daily = _ref.daily,
        current = _ref.current;
    (0,_modules_UI__WEBPACK_IMPORTED_MODULE_3__.currentWeatherUI)(city, current);
    (0,_modules_UI__WEBPACK_IMPORTED_MODULE_3__.hourlyForecastUI)(hourly);
    (0,_modules_UI__WEBPACK_IMPORTED_MODULE_3__.dailyForecastUI)(daily);
    (0,_modules_toggleState__WEBPACK_IMPORTED_MODULE_4__.setToggle)();
  });
}

initialState();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9mb3JtSGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9nZXRDdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9nZXRGb3JlY2FzdC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9pY29uU2V0dGVyLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL3RlbXAtY29udmVydGVyLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL3RvRGF5LmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL3RvZ2dsZVN0YXRlLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL3RvZ2dsZVRlbXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL21vZHVsZXMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldFRpbWVTdHJpbmdzIiwidGltZXMiLCJtYXAiLCJ0aW1lIiwiaHIiLCJnZXRIb3VycyIsInNsaWNlIiwibWluIiwiZ2V0TWludXRlcyIsImN1cnJlbnRXZWF0aGVyVUkiLCJjaXR5IiwiZGVzY3JpcHRpb24iLCJ0ZW1wZXJhdHVyZSIsIm1heCIsImRheSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJ0b0ZpeGVkIiwidGVtcFN0YXRlIiwiaG91cmx5Rm9yZWNhc3RVSSIsImljb25zIiwidGVtcGVyYXR1cmVzIiwiYmxvY2tzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJmb3JFYWNoIiwiYmxvY2siLCJxdWVyeVNlbGVjdG9yIiwiaWNvblNldHRlciIsImRhaWx5Rm9yZWNhc3RVSSIsImRheXMiLCJtYXhzIiwibWlucyIsInJvd3MiLCJyb3ciLCJmb3JtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvcm1TdWJtaXRIYW5kbGVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJkaXNhYmxlVG9nZ2xlIiwiZ2V0Rm9yZWNhc3QiLCJ0aGVuIiwiaG91cmx5IiwiZGFpbHkiLCJjdXJyZW50Iiwic2V0VG9nZ2xlIiwiQVBJX0tFWSIsImdldEN1cnJlbnRXZWF0aGVyIiwiY2l0eU5hbWUiLCJmZXRjaCIsInJlcyIsImpzb24iLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ3ZWF0aGVyIiwibWFpbiIsInRlbXAiLCJnZXRUaW1lIiwidXRjIiwiRGF0ZSIsImZldGNoQ29vcmRzIiwicmVzcG9uc2UiLCJsYXQiLCJsb24iLCJnZXRDdXJyZW50Q29udGVudCIsImR0IiwiaWNvbiIsImdldENlbHNpdXNGcm9tS2VsdmluIiwidG9EYXkiLCJnZXROZXh0NEhvdXJDb250ZW50IiwibmV4dDRIb3Vyc0RhdGEiLCJob3VyRGF0YSIsInB1c2giLCJnZXRIb3VybHlGb3JlY2FzdCIsIm5leHQ0SG91ciIsImNvbmNhdCIsImdldERhaWx5Rm9yZWNhc3QiLCJuZXh0NURheURhdGEiLCJpbWciLCJuYW1lIiwic3JjIiwiZ2V0RmFocmVuaGVpdEZyb21DZWxzaXVzIiwiY2Vsc2l1cyIsImdldENlbHNpdXNGcm9tRmFocmVuaGVpdCIsImZhaHJlbmhlaXQiLCJrZWx2aW4iLCJkYXRlVmFsIiwib3B0aW9ucyIsIndlZWtkYXkiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJmb3JtYXQiLCJkaXNhYmxlZCIsImNoZWNrZWQiLCJjaGVja0JveCIsInRlbXBIb2xkZXJzIiwidG9nZ2xlVGVtcHMiLCJjdXJyZW50VGVtcEVsZW0iLCJ0ZW1wSG9sZGVyIiwiaW5pdGlhbFN0YXRlIl0sIm1hcHBpbmdz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YSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxRQUFRLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLFlBQVksT0FBTyxLQUFLLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksTUFBTSxNQUFNLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE1BQU0sTUFBTSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksYUFB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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGO1dBQ0E7V0FDQSxDQUFDLEk7Ozs7O1dDUEQsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQU1BOztBQUVBLFNBQVN1RixZQUFULEdBQXdCO0FBQ3RCLE1BQU1oRyxJQUFJLEdBQUdLLFFBQVEsQ0FBQ2dCLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUNhLEtBQWxEO0FBQ0FDLHFFQUFhO0FBQ2JDLG1FQUFXLENBQUNwQyxJQUFELENBQVgsQ0FBa0JxQyxJQUFsQixDQUF1QixnQkFBZ0M7QUFBQSxRQUE3QkMsTUFBNkIsUUFBN0JBLE1BQTZCO0FBQUEsUUFBckJDLEtBQXFCLFFBQXJCQSxLQUFxQjtBQUFBLFFBQWRDLE9BQWMsUUFBZEEsT0FBYztBQUNyRHpDLGlFQUFnQixDQUFDQyxJQUFELEVBQU93QyxPQUFQLENBQWhCO0FBQ0E3QixpRUFBZ0IsQ0FBQzJCLE1BQUQsQ0FBaEI7QUFDQWYsZ0VBQWUsQ0FBQ2dCLEtBQUQsQ0FBZjtBQUNBRSxtRUFBUztBQUNWLEdBTEQ7QUFNRDs7QUFFRHVELFlBQVksRyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZW1wU3RhdGUgfSBmcm9tICcuL2Zvcm1IYW5kbGVyJztcbmltcG9ydCB7IGljb25TZXR0ZXIgfSBmcm9tICcuL2ljb25TZXR0ZXInO1xuXG5mdW5jdGlvbiBnZXRUaW1lU3RyaW5ncyh0aW1lcykge1xuICAgIHJldHVybiB0aW1lcy5tYXAoKHRpbWUpID0+IHtcbiAgICAgIGNvbnN0IGhyID0gKCcwJyArIHRpbWUuZ2V0SG91cnMoKSkuc2xpY2UoLTIpO1xuICAgICAgY29uc3QgbWluID0gKCcwJyArIHRpbWUuZ2V0TWludXRlcygpKS5zbGljZSgtMik7XG4gICAgICByZXR1cm4gYCR7aHJ9OiR7bWlufWA7XG4gICAgfSk7XG4gIH1cblxuZnVuY3Rpb24gY3VycmVudFdlYXRoZXJVSShjaXR5LCB7IGRlc2NyaXB0aW9uLCB0ZW1wZXJhdHVyZSwgbWF4LCBtaW4sIGRheSB9KSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5JykuaW5uZXJUZXh0ID0gY2l0eTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlcycpLmlubmVyVGV4dCA9IGRlc2NyaXB0aW9uO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudC10ZW1wJykuaW5uZXJIVE1MID0gYCR7KCt0ZW1wZXJhdHVyZSkudG9GaXhlZChcbiAgICAyLFxuICApfSAmZGVnO0NgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kYXktZGF5JykuaW5uZXJUZXh0ID0gZGF5O1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kYXktbWluJykuaW5uZXJUZXh0ID0gbWluLnRvRml4ZWQoMik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RheS1tYXgnKS5pbm5lclRleHQgPSBtYXgudG9GaXhlZCgyKTtcbiAgdGVtcFN0YXRlLnB1c2godGVtcGVyYXR1cmUsIG1heCwgbWluKTtcbn1cblxuZnVuY3Rpb24gaG91cmx5Rm9yZWNhc3RVSSh7IHRpbWVzLCBpY29ucywgdGVtcGVyYXR1cmVzIH0pIHtcbiAgdGltZXMgPSBnZXRUaW1lU3RyaW5ncyh0aW1lcyk7XG4gIGNvbnN0IGJsb2NrcyA9IEFycmF5LmZyb20oXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI3RvZGF5LWZvcmVjYXN0IC50b2RheS1pdGVtJyksXG4gICk7XG4gIGxldCBpID0gMDtcbiAgYmxvY2tzLmZvckVhY2goKGJsb2NrKSA9PiB7XG4gICAgYmxvY2sucXVlcnlTZWxlY3RvcignLnRpbWUnKS5pbm5lclRleHQgPSB0aW1lc1tpXTtcbiAgICBpY29uU2V0dGVyKGJsb2NrLnF1ZXJ5U2VsZWN0b3IoJy5pY29uJyksIGljb25zW2ldKTtcbiAgICAvLyBibG9jay5xdWVyeVNlbGVjdG9yKCcuaWNvbicpLmlubmVySFRNTCA9IGljb25zW2ldO1xuICAgIGJsb2NrLnF1ZXJ5U2VsZWN0b3IoJy50ZW1wJykuaW5uZXJUZXh0ID0gdGVtcGVyYXR1cmVzW2ldLnRvRml4ZWQoMik7XG4gICAgdGVtcFN0YXRlLnB1c2godGVtcGVyYXR1cmVzW2ldKTtcbiAgICBpKys7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkYWlseUZvcmVjYXN0VUkoeyBkYXlzLCBpY29ucywgbWF4cywgbWlucyB9KSB7XG4gIGNvbnN0IHJvd3MgPSBBcnJheS5mcm9tKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN3ZWVrbHktZm9yZWNhc3QgLndlZWtseS1pdGVtJyksXG4gICk7XG4gIGxldCBpID0gMDtcbiAgcm93cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICByb3cucXVlcnlTZWxlY3RvcignLmRheScpLmlubmVyVGV4dCA9IGRheXNbaV07XG4gICAgaWNvblNldHRlcihyb3cucXVlcnlTZWxlY3RvcignLmljb24nKSwgaWNvbnNbaV0pO1xuICAgIC8vIHJvdy5xdWVyeVNlbGVjdG9yKCcuaWNvbicpLmlubmVySFRNTCA9IGljb25zW2ldO1xuICAgIHJvdy5xdWVyeVNlbGVjdG9yKCcubWF4JykuaW5uZXJUZXh0ID0gbWF4c1tpXS50b0ZpeGVkKDIpO1xuICAgIHJvdy5xdWVyeVNlbGVjdG9yKCcubWluJykuaW5uZXJUZXh0ID0gbWluc1tpXS50b0ZpeGVkKDIpO1xuICAgIHRlbXBTdGF0ZS5wdXNoKG1heHNbaV0sIG1pbnNbaV0pO1xuICAgIGkrKztcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGN1cnJlbnRXZWF0aGVyVUksIGRhaWx5Rm9yZWNhc3RVSSwgaG91cmx5Rm9yZWNhc3RVSSB9O1xuIiwiaW1wb3J0IHsgZ2V0Rm9yZWNhc3QgfSBmcm9tICcuL2dldEZvcmVjYXN0JztcbmltcG9ydCB7c2V0VG9nZ2xlLCBkaXNhYmxlVG9nZ2xlfSBmcm9tICcuL3RvZ2dsZVN0YXRlJztcbmltcG9ydCB7IGN1cnJlbnRXZWF0aGVyVUksIGRhaWx5Rm9yZWNhc3RVSSwgaG91cmx5Rm9yZWNhc3RVSSB9IGZyb20gJy4vVUknO1xuXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmb3JtU3VibWl0SGFuZGxlcik7XG5sZXQgdGVtcFN0YXRlID0gW107XG5cblxuXG5mdW5jdGlvbiBmb3JtU3VibWl0SGFuZGxlcihlKSB7XG4gIHRlbXBTdGF0ZSA9IFtdO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtIGlucHV0JykudmFsdWU7XG4gIGRpc2FibGVUb2dnbGUoKTtcbiAgZ2V0Rm9yZWNhc3QoY2l0eSkudGhlbigoeyBob3VybHksIGRhaWx5LCBjdXJyZW50IH0pID0+IHtcbiAgICBjdXJyZW50V2VhdGhlclVJKGNpdHksIGN1cnJlbnQpO1xuICAgIGhvdXJseUZvcmVjYXN0VUkoaG91cmx5KTtcbiAgICBkYWlseUZvcmVjYXN0VUkoZGFpbHkpO1xuICAgIHNldFRvZ2dsZSgpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgdGVtcFN0YXRlIH07XG4iLCJjb25zdCBBUElfS0VZID0gJzgxMjZiOTA1ZDZjOTkyMTIzZjAzM2U4OGUwYzBiYzU5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q3VycmVudFdlYXRoZXIoY2l0eU5hbWUpIHtcbiAgcmV0dXJuIGZldGNoKFxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eU5hbWV9JmFwcGlkPSR7QVBJX0tFWX1gLFxuICApXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBkYXRhLndlYXRoZXJbMF0ubWFpbixcbiAgICAgICAgdGVtcGVyYXR1cmU6IGRhdGEubWFpbi50ZW1wXG4gICAgICB9KTsgXG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBnZXRDZWxzaXVzRnJvbUtlbHZpbiB9IGZyb20gJy4vdGVtcC1jb252ZXJ0ZXInO1xuaW1wb3J0IHsgdG9EYXkgfSBmcm9tICcuL3RvRGF5JztcblxuY29uc3QgQVBJX0tFWSA9ICc4MTI2YjkwNWQ2Yzk5MjEyM2YwMzNlODhlMGMwYmM1OSc7XG5cbmZ1bmN0aW9uIGdldFRpbWUodXRjKSB7XG4gIHJldHVybiBuZXcgRGF0ZSh1dGMgKiAxMDAwKTtcbn1cblxuZnVuY3Rpb24gZmV0Y2hDb29yZHMoY2l0eU5hbWUpIHtcbiAgcmV0dXJuIGZldGNoKFxuICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke2NpdHlOYW1lfSZhcHBpZD0ke0FQSV9LRVl9YCxcbiAgKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICByZXR1cm4geyBsYXQ6IGRhdGFbMF0ubGF0LCBsb246IGRhdGFbMF0ubG9uIH07XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRDb250ZW50KGRhdGEpIHtcbiAgcmV0dXJuIHtcbiAgICB0aW1lOiBbZ2V0VGltZShkYXRhLmN1cnJlbnQuZHQpXSxcbiAgICBpY29uOiBbZGF0YS5jdXJyZW50LndlYXRoZXJbMF0uaWNvbl0sXG4gICAgdGVtcGVyYXR1cmU6IFtnZXRDZWxzaXVzRnJvbUtlbHZpbihkYXRhLmN1cnJlbnQudGVtcCldLFxuICAgIGRlc2NyaXB0aW9uOiBkYXRhLmN1cnJlbnQud2VhdGhlclswXS5kZXNjcmlwdGlvbixcbiAgICBtYXg6IGdldENlbHNpdXNGcm9tS2VsdmluKGRhdGEuZGFpbHlbMF0udGVtcC5tYXgpLFxuICAgIG1pbjogZ2V0Q2Vsc2l1c0Zyb21LZWx2aW4oZGF0YS5kYWlseVswXS50ZW1wLm1pbiksXG4gICAgZGF5OiB0b0RheShkYXRhLmN1cnJlbnQuZHQpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXROZXh0NEhvdXJDb250ZW50KGRhdGEpIHtcbiAgY29uc3QgbmV4dDRIb3Vyc0RhdGEgPSB7XG4gICAgdGltZXM6IFtdLFxuICAgIGljb25zOiBbXSxcbiAgICB0ZW1wZXJhdHVyZXM6IFtdLFxuICB9O1xuXG4gIGRhdGEuaG91cmx5LnNsaWNlKDIsIDYpLmZvckVhY2goKGhvdXJEYXRhKSA9PiB7XG4gICAgbmV4dDRIb3Vyc0RhdGEudGltZXMucHVzaChnZXRUaW1lKCtob3VyRGF0YS5kdCkpO1xuICAgIG5leHQ0SG91cnNEYXRhLmljb25zLnB1c2goaG91ckRhdGEud2VhdGhlclswXS5pY29uKTtcbiAgICBuZXh0NEhvdXJzRGF0YS50ZW1wZXJhdHVyZXMucHVzaChnZXRDZWxzaXVzRnJvbUtlbHZpbihob3VyRGF0YS50ZW1wKSk7XG4gIH0pO1xuXG4gIHJldHVybiBuZXh0NEhvdXJzRGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhvdXJseUZvcmVjYXN0KGRhdGEpIHtcbiAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnRDb250ZW50KGRhdGEpO1xuICBjb25zdCBuZXh0NEhvdXIgPSBnZXROZXh0NEhvdXJDb250ZW50KGRhdGEpO1xuICByZXR1cm4ge1xuICAgIHRpbWVzOiBjdXJyZW50LnRpbWUuY29uY2F0KG5leHQ0SG91ci50aW1lcyksXG4gICAgaWNvbnM6IGN1cnJlbnQuaWNvbi5jb25jYXQobmV4dDRIb3VyLmljb25zKSxcbiAgICB0ZW1wZXJhdHVyZXM6IGN1cnJlbnQudGVtcGVyYXR1cmUuY29uY2F0KG5leHQ0SG91ci50ZW1wZXJhdHVyZXMpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGFpbHlGb3JlY2FzdChkYXRhKSB7XG4gIGNvbnN0IG5leHQ1RGF5RGF0YSA9IGRhdGEuZGFpbHkuc2xpY2UoMSwgNik7XG4gIGNvbnN0IGRheXMgPSBbXTtcbiAgY29uc3QgaWNvbnMgPSBbXTtcbiAgY29uc3QgbWF4cyA9IFtdO1xuICBjb25zdCBtaW5zID0gW107XG4gIG5leHQ1RGF5RGF0YS5mb3JFYWNoKChkYXRhKSA9PiB7XG4gICAgZGF5cy5wdXNoKHRvRGF5KGRhdGEuZHQpKTtcbiAgICBpY29ucy5wdXNoKGRhdGEud2VhdGhlclswXS5pY29uKTtcbiAgICBtYXhzLnB1c2goZ2V0Q2Vsc2l1c0Zyb21LZWx2aW4oZGF0YS50ZW1wLm1heCkpO1xuICAgIG1pbnMucHVzaChnZXRDZWxzaXVzRnJvbUtlbHZpbihkYXRhLnRlbXAubWluKSk7XG4gIH0pO1xuICByZXR1cm4geyBkYXlzLCBpY29ucywgbWF4cywgbWlucyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QoY2l0eU5hbWUpIHtcbiAgcmV0dXJuIGZldGNoQ29vcmRzKGNpdHlOYW1lKVxuICAgIC50aGVuKCh7IGxhdCwgbG9uIH0pID0+IHtcbiAgICAgIHJldHVybiBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZhcHBpZD0ke0FQSV9LRVl9YCxcbiAgICAgICk7XG4gICAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaG91cmx5OiBnZXRIb3VybHlGb3JlY2FzdChkYXRhKSxcbiAgICAgICAgZGFpbHk6IGdldERhaWx5Rm9yZWNhc3QoZGF0YSksXG4gICAgICAgIGN1cnJlbnQ6IGdldEN1cnJlbnRDb250ZW50KGRhdGEpLFxuICAgICAgfTtcbiAgICB9KTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBpY29uU2V0dGVyKGltZywgbmFtZSkge1xuICBpbWcuc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke25hbWV9QDJ4LnBuZ2A7IFxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldEZhaHJlbmhlaXRGcm9tQ2Vsc2l1cyhjZWxzaXVzKXtcbiAgICByZXR1cm4gKGNlbHNpdXMgKiAoOS4wIC8gNSkpICsgMzI7XG4gfVxuIFxuZXhwb3J0IGZ1bmN0aW9uIGdldENlbHNpdXNGcm9tRmFocmVuaGVpdChmYWhyZW5oZWl0KXtcbiAgICByZXR1cm4gKGZhaHJlbmhlaXQgLSAzMi4wKSAqICg1IC8gOSk7XG4gfVxuXG4gZXhwb3J0IGZ1bmN0aW9uIGdldENlbHNpdXNGcm9tS2VsdmluKGtlbHZpbil7XG4gICAgIHJldHVybiBrZWx2aW4gLSAyNzMuMTU7IFxuIH0iLCJleHBvcnQgZnVuY3Rpb24gdG9EYXkodXRjKSB7XG4gIGNvbnN0IGRhdGVWYWwgPSBuZXcgRGF0ZSh1dGMgKiAxMDAwKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHsgd2Vla2RheTogJ2xvbmcnIH07XG4gIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCgnZW4tVVMnLCBvcHRpb25zKS5mb3JtYXQoZGF0ZVZhbCk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc2V0VG9nZ2xlKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVtcC10b2dnbGUtY2hlY2snKS5kaXNhYmxlZCA9IGZhbHNlO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVtcC10b2dnbGUtY2hlY2snKS5jaGVja2VkID0gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlVG9nZ2xlKCkge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVtcC10b2dnbGUtY2hlY2snKS5kaXNhYmxlZCA9IHRydWU7XG59XG4iLCJpbXBvcnQge1xuICBnZXRDZWxzaXVzRnJvbUZhaHJlbmhlaXQsXG4gIGdldEZhaHJlbmhlaXRGcm9tQ2Vsc2l1cyxcbn0gZnJvbSAnLi90ZW1wLWNvbnZlcnRlcic7XG5cbmltcG9ydCB7IHRlbXBTdGF0ZSB9IGZyb20gJy4vZm9ybUhhbmRsZXInO1xuXG5jb25zdCBjaGVja0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0ZW1wLXRvZ2dsZS1jaGVjaycpO1xuY29uc3QgdGVtcEhvbGRlcnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZW1wJykpO1xuXG5jaGVja0JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0b2dnbGVUZW1wcyk7XG5cbmZ1bmN0aW9uIHRvZ2dsZVRlbXBzKCkge1xuICBjb25zdCBjdXJyZW50VGVtcEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VycmVudC10ZW1wJyk7XG4gIGxldCBpID0gMTtcbiAgaWYgKGNoZWNrQm94LmNoZWNrZWQpIHtcbiAgICB0ZW1wSG9sZGVycy5mb3JFYWNoKCh0ZW1wSG9sZGVyKSA9PiB7XG4gICAgICB0ZW1wSG9sZGVyLmlubmVyVGV4dCA9IGdldEZhaHJlbmhlaXRGcm9tQ2Vsc2l1cyh0ZW1wU3RhdGVbaSsrXSkudG9GaXhlZChcbiAgICAgICAgMixcbiAgICAgICk7XG4gICAgfSk7XG4gICAgY3VycmVudFRlbXBFbGVtLmlubmVySFRNTCA9IGAke2dldEZhaHJlbmhlaXRGcm9tQ2Vsc2l1cyhcbiAgICAgICt0ZW1wU3RhdGVbMF0sXG4gICAgKS50b0ZpeGVkKDIpfSZkZWc7RmA7XG4gIH0gZWxzZSB7XG4gICAgdGVtcEhvbGRlcnMuZm9yRWFjaCgodGVtcEhvbGRlcikgPT4ge1xuICAgICAgdGVtcEhvbGRlci5pbm5lclRleHQgPSBnZXRDZWxzaXVzRnJvbUZhaHJlbmhlaXQoXG4gICAgICAgICt0ZW1wSG9sZGVyLmlubmVyVGV4dCxcbiAgICAgICkudG9GaXhlZCgyKTtcbiAgICB9KTtcbiAgICBjdXJyZW50VGVtcEVsZW0uaW5uZXJIVE1MID0gYCR7KCt0ZW1wU3RhdGVbMF0pLnRvRml4ZWQoMil9JmRlZztDYDtcbiAgfVxufVxuXG5cbiIsImltcG9ydCAnLi9nZXRDdXJyZW50V2VhdGhlcic7XG5pbXBvcnQgJy4vZm9ybUhhbmRsZXInO1xuaW1wb3J0ICcuL3RvZ2dsZVRlbXAnO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLDJFQUEyRTs7QUFFM0U7K0VBQytFOztBQUUvRTs7O0VBR0U7O0FBRUY7RUFDRSxpQkFBaUIsRUFBRSxNQUFNO0VBQ3pCLDhCQUE4QixFQUFFLE1BQU07QUFDeEM7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLFNBQVM7QUFDWDs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtBQUNsQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjtFQUNFLHVCQUF1QixFQUFFLE1BQU07RUFDL0IsU0FBUyxFQUFFLE1BQU07RUFDakIsaUJBQWlCLEVBQUUsTUFBTTtBQUMzQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSxpQ0FBaUMsRUFBRSxNQUFNO0VBQ3pDLGNBQWMsRUFBRSxNQUFNO0FBQ3hCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSw2QkFBNkI7QUFDL0I7O0FBRUE7OztFQUdFOztBQUVGO0VBQ0UsbUJBQW1CLEVBQUUsTUFBTTtFQUMzQiwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGlDQUFpQyxFQUFFLE1BQU07QUFDM0M7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsbUJBQW1CO0FBQ3JCOztBQUVBOzs7RUFHRTs7QUFFRjs7O0VBR0UsaUNBQWlDLEVBQUUsTUFBTTtFQUN6QyxjQUFjLEVBQUUsTUFBTTtBQUN4Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLGNBQWM7RUFDZCxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7K0VBQytFOztBQUUvRTs7RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOzs7RUFHRTs7QUFFRjs7Ozs7RUFLRSxvQkFBb0IsRUFBRSxNQUFNO0VBQzVCLGVBQWUsRUFBRSxNQUFNO0VBQ3ZCLGlCQUFpQixFQUFFLE1BQU07RUFDekIsU0FBUyxFQUFFLE1BQU07QUFDbkI7O0FBRUE7OztFQUdFOztBQUVGO1FBQ1EsTUFBTTtFQUNaLGlCQUFpQjtBQUNuQjs7QUFFQTs7O0VBR0U7O0FBRUY7U0FDUyxNQUFNO0VBQ2Isb0JBQW9CO0FBQ3RCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsMEJBQTBCO0FBQzVCOztBQUVBOztFQUVFOztBQUVGOzs7O0VBSUUsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjs7QUFFQTs7RUFFRTs7QUFFRjs7OztFQUlFLDhCQUE4QjtBQUNoQzs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTs7Ozs7RUFLRTs7QUFFRjtFQUNFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsY0FBYyxFQUFFLE1BQU07RUFDdEIsY0FBYyxFQUFFLE1BQU07RUFDdEIsZUFBZSxFQUFFLE1BQU07RUFDdkIsVUFBVSxFQUFFLE1BQU07RUFDbEIsbUJBQW1CLEVBQUUsTUFBTTtBQUM3Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7OztFQUdFOztBQUVGOztFQUVFLHNCQUFzQixFQUFFLE1BQU07RUFDOUIsVUFBVSxFQUFFLE1BQU07QUFDcEI7O0FBRUE7O0VBRUU7O0FBRUY7O0VBRUUsWUFBWTtBQUNkOztBQUVBOzs7RUFHRTs7QUFFRjtFQUNFLDZCQUE2QixFQUFFLE1BQU07RUFDckMsb0JBQW9CLEVBQUUsTUFBTTtBQUM5Qjs7QUFFQTs7RUFFRTs7QUFFRjtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTs7O0VBR0U7O0FBRUY7RUFDRSwwQkFBMEIsRUFBRSxNQUFNO0VBQ2xDLGFBQWEsRUFBRSxNQUFNO0FBQ3ZCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxjQUFjO0FBQ2hCOztBQUVBOztFQUVFOztBQUVGO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBOytFQUMrRTs7QUFFL0U7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7O0VBRUU7O0FBRUY7RUFDRSxhQUFhO0FBQ2ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyohIG5vcm1hbGl6ZS5jc3MgdjguMC4xIHwgTUlUIExpY2Vuc2UgfCBnaXRodWIuY29tL25lY29sYXMvbm9ybWFsaXplLmNzcyAqL1xcblxcbi8qIERvY3VtZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBsaW5lIGhlaWdodCBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gUHJldmVudCBhZGp1c3RtZW50cyBvZiBmb250IHNpemUgYWZ0ZXIgb3JpZW50YXRpb24gY2hhbmdlcyBpbiBpT1MuXFxuICovXFxuXFxuaHRtbCB7XFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxufVxcblxcbi8qIFNlY3Rpb25zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbmRlciB0aGUgYG1haW5gIGVsZW1lbnQgY29uc2lzdGVudGx5IGluIElFLlxcbiAqL1xcblxcbm1haW4ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gRmlyZWZveC5cXG4gKiAyLiBTaG93IHRoZSBvdmVyZmxvdyBpbiBFZGdlIGFuZCBJRS5cXG4gKi9cXG5cXG5ociB7XFxuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDsgLyogMSAqL1xcbiAgaGVpZ2h0OiAwOyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmhlcml0YW5jZSBhbmQgc2NhbGluZyBvZiBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIENvcnJlY3QgdGhlIG9kZCBgZW1gIGZvbnQgc2l6aW5nIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5wcmUge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKiBUZXh0LWxldmVsIHNlbWFudGljc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBncmF5IGJhY2tncm91bmQgb24gYWN0aXZlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmEge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxufVxcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgYm90dG9tIGJvcmRlciBpbiBDaHJvbWUgNTctXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHdlaWdodCBpbiBDaHJvbWUsIEVkZ2UsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYixcXG5zdHJvbmcge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuY29kZSxcXG5rYmQsXFxuc2FtcCB7XFxuICBmb250LWZhbWlseTogbW9ub3NwYWNlLCBtb25vc3BhY2U7IC8qIDEgKi9cXG4gIGZvbnQtc2l6ZTogMWVtOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBmb250IHNpemUgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnNtYWxsIHtcXG4gIGZvbnQtc2l6ZTogODAlO1xcbn1cXG5cXG4vKipcXG4gKiBQcmV2ZW50IGBzdWJgIGFuZCBgc3VwYCBlbGVtZW50cyBmcm9tIGFmZmVjdGluZyB0aGUgbGluZSBoZWlnaHQgaW5cXG4gKiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3ViLFxcbnN1cCB7XFxuICBmb250LXNpemU6IDc1JTtcXG4gIGxpbmUtaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG5zdWIge1xcbiAgYm90dG9tOiAtMC4yNWVtO1xcbn1cXG5cXG5zdXAge1xcbiAgdG9wOiAtMC41ZW07XFxufVxcblxcbi8qIEVtYmVkZGVkIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAuXFxuICovXFxuXFxuaW1nIHtcXG4gIGJvcmRlci1zdHlsZTogbm9uZTtcXG59XFxuXFxuLyogRm9ybXNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENoYW5nZSB0aGUgZm9udCBzdHlsZXMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0OyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXSB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbm5lciBib3JkZXIgYW5kIHBhZGRpbmcgaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b246Oi1tb3otZm9jdXMtaW5uZXIsXFxuW3R5cGU9XFxcImJ1dHRvblxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJyZXNldFxcXCJdOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJzdWJtaXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lciB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZXN0b3JlIHRoZSBmb2N1cyBzdHlsZXMgdW5zZXQgYnkgdGhlIHByZXZpb3VzIHJ1bGUuXFxuICovXFxuXFxuYnV0dG9uOi1tb3otZm9jdXNyaW5nLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06LW1vei1mb2N1c3Jpbmcge1xcbiAgb3V0bGluZTogMXB4IGRvdHRlZCBCdXR0b25UZXh0O1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuZmllbGRzZXQge1xcbiAgcGFkZGluZzogMC4zNWVtIDAuNzVlbSAwLjYyNWVtO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSB0ZXh0IHdyYXBwaW5nIGluIEVkZ2UgYW5kIElFLlxcbiAqIDIuIENvcnJlY3QgdGhlIGNvbG9yIGluaGVyaXRhbmNlIGZyb20gYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBJRS5cXG4gKiAzLiBSZW1vdmUgdGhlIHBhZGRpbmcgc28gZGV2ZWxvcGVycyBhcmUgbm90IGNhdWdodCBvdXQgd2hlbiB0aGV5IHplcm8gb3V0XFxuICogICAgYGZpZWxkc2V0YCBlbGVtZW50cyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxubGVnZW5kIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIGNvbG9yOiBpbmhlcml0OyAvKiAyICovXFxuICBkaXNwbGF5OiB0YWJsZTsgLyogMSAqL1xcbiAgbWF4LXdpZHRoOiAxMDAlOyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAzICovXFxuICB3aGl0ZS1zcGFjZTogbm9ybWFsOyAvKiAxICovXFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCB2ZXJ0aWNhbCBhbGlnbm1lbnQgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgT3BlcmEuXFxuICovXFxuXFxucHJvZ3Jlc3Mge1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGRlZmF1bHQgdmVydGljYWwgc2Nyb2xsYmFyIGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZXh0YXJlYSB7XFxuICBvdmVyZmxvdzogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGJveCBzaXppbmcgaW4gSUUgMTAuXFxuICogMi4gUmVtb3ZlIHRoZSBwYWRkaW5nIGluIElFIDEwLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBpbiBDaHJvbWUgYW5kIFNhZmFyaSBvbiBtYWNPUy5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl06Oi13ZWJraXQtc2VhcmNoLWRlY29yYXRpb24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBpbmFiaWxpdHkgdG8gc3R5bGUgY2xpY2thYmxlIHR5cGVzIGluIGlPUyBhbmQgU2FmYXJpLlxcbiAqIDIuIENoYW5nZSBmb250IHByb3BlcnRpZXMgdG8gYGluaGVyaXRgIGluIFNhZmFyaS5cXG4gKi9cXG5cXG46Oi13ZWJraXQtZmlsZS11cGxvYWQtYnV0dG9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAxICovXFxuICBmb250OiBpbmhlcml0OyAvKiAyICovXFxufVxcblxcbi8qIEludGVyYWN0aXZlXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIEVkZ2UsIElFIDEwKywgYW5kIEZpcmVmb3guXFxuICovXFxuXFxuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxuc3VtbWFyeSB7XFxuICBkaXNwbGF5OiBsaXN0LWl0ZW07XFxufVxcblxcbi8qIE1pc2NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwKy5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMC5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8wX19fIGZyb20gXCItIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3NcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gZnJvbSBcIi4vaW1hZ2VzL2JnLmpwZ1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TGlicmUrRnJhbmtsaW46d2dodEAxMDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18uaShfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgLyogY29sb3I6IHdoaXRlOyAqL1xcbiAgLyogY29sb3I6IGJsYWNrOyAgKi9cXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrOyAqL1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmh0bWwge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciBmaXhlZDtcXG4gIC13ZWJraXQtYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIC1tb3otYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIC1vLWJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbmJvZHkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTGlicmUgRnJhbmtsaW5cXFwiO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGZsZXg6IDE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMCUgMzAlIDUlIDIwJSAzNSU7XFxufVxcblxcbiN1dGlsaXRpZXMge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiNzZWFyY2gtZm9ybSAqIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG59XFxuXFxuI3V0aWxpdGllcyBmb3JtIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBib3JkZXItcmFkaXVzOiAxMHJlbTtcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcbmNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlcjogMS41cHggc29saWQgdGVhbDtcXG4gIHdpZHRoOiA4MCU7XFxuICBtYXJnaW4tdG9wOiA1cHg7XFxufVxcblxcbiN1dGlsaXRpZXMgZm9ybTpmb2N1cy13aXRoaW4ge1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDJweCB3aGl0ZSxcXG4gICAgMCAwIDFweCByZ2IoNCwgMjUwLCAyNTApO1xcbn1cXG5cXG4jdXRpbGl0aWVzIGZvcm0gYnV0dG9uIHtcXG4gIGFsbDogdW5zZXQ7XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XFxuICBmb250LXNpemU6IDEyMCU7XFxufVxcblxcbiN1dGlsaXRpZXMgZm9ybSBidXR0b246aG92ZXIge1xcbiAgY29sb3I6IHRlYWw7XFxufVxcblxcbiN1dGlsaXRpZXMgaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTtcXG4gIC1tb3otYm94LXNoYWRvdzogbm9uZTtcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxuICBwYWRkaW5nLWxlZnQ6IDAuOHJlbTtcXG4gIHBhZGRpbmctdG9wOiAwLjJyZW07XFxuICBwYWRkaW5nLWJvdHRvbTogMC4ycmVtO1xcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAycmVtO1xcbiAgY29sb3I6IHdoaXRlOyBcXG4gIC8qIGNvbG9yOiBibGFjazsgKi9cXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxufVxcblxcbiN1dGlsaXRpZXMgaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXG4gIC8qIGNvbG9yOiBibGFjazsgKi9cXG4gIGNvbG9yOiB3aGl0ZTsgXFxufVxcblxcbiN1dGlsaXRpZXMgaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbiN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWJhciB7XFxuICBtYXJnaW4tdG9wOiA3cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDZweDtcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDRyZW07XFxuICBtYXgtaGVpZ2h0OiAycmVtO1xcbiAgbWluLWhlaWdodDogMnJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNSwgMjA1LCAyNTUsIDAuMzQ5KTtcXG59XFxuXFxuI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtY2hlY2sge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxLjZyZW07XFxuICB3aWR0aDogMS42cmVtO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgbGluZWFyO1xcbiAgei1pbmRleDogMTA7XFxuICB0b3A6IDAuMnJlbTtcXG4gIGxlZnQ6IDAuMnJlbTtcXG59XFxuXFxuI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtY2hlY2s6Y2hlY2tlZCB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMnJlbSk7XFxufVxcblxcbiN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWxhYmVsIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG1heC1oZWlnaHQ6IDJyZW07XFxuICBtaW4taGVpZ2h0OiAycmVtO1xcbiAgd2lkdGg6IDRyZW07XFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7ICovXFxufVxcblxcbiN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWxhYmVsIGRpdiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDFyZW07XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHBhZGRpbmc6IDAgNXB4O1xcbn1cXG5cXG4jdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1sYWJlbCBkaXY6bGFzdC1jaGlsZCB7XFxuICByaWdodDogMDtcXG59XFxuXFxuI2N1cnJlbnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4jY3VycmVudCAjY2l0eSB7XFxuICBmb250LXNpemU6IDMuNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4jY3VycmVudCAjZGVzIHtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbn1cXG5cXG4jY3VycmVudCAjY3VycmVudC10ZW1wIHtcXG4gIGZvbnQtc2l6ZTogM3JlbTtcXG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbiN0b2RheSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbiN0b2RheS1mb3JlY2FzdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG5cXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4jdG9kYXktZm9yZWNhc3QgLnRvZGF5LWl0ZW0ge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZmxleC1ncm93OiAxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTUlIDQ1JSAxNSU7XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICBcXFwidGltZVxcXCJcXG4gICAgXFxcImltZ1xcXCJcXG4gICAgXFxcInRlbXBcXFwiO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlciBjZW50ZXI7XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbiN0b2RheS1mb3JlY2FzdCAudG9kYXktaXRlbSBpbWcge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBncmlkLWFyZWE6IGltZztcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtaGVpZ2h0OiAxMDAlO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIC8qIHRyYW5zZm9ybTogc2NhbGUoMC45KTsgKi9cXG59XFxuXFxuI3dlZWtseS1mb3JlY2FzdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG5cXG4jd2Vla2x5LWZvcmVjYXN0IC53ZWVrbHktaXRlbSB7XFxuICAvKiB3aWR0aDogNTAlOyAgKi9cXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAyNiU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuI3dlZWtseS1mb3JlY2FzdCAud2Vla2x5LWl0ZW0gLmRheSB7XFxuICB3aWR0aDogOWNoO1xcbn1cXG5cXG4jd2Vla2x5LWZvcmVjYXN0IC53ZWVrbHktaXRlbSAubWluLFxcbi5tYXgge1xcbiAgd2lkdGg6IDVjaDtcXG4gIC8qIHRleHQtYWxpZ246IGNlbnRlcjsgKi9cXG59XFxuXFxuLndlZWtseS1pdGVtOm50aC1jaGlsZChuKzIpe1xcbiAgbWFyZ2luLXRvcDogLTE1cHg7XFxuXFxufVxcblxcbi53ZWVrbHktaXRlbSBpbWcge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjYpO1xcbn1cXG5cXG4vKiAvLyBTbWFsbCBkZXZpY2VzIChsYW5kc2NhcGUgcGhvbmVzLCA1NzZweCBhbmQgdXApICovXFxuQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSB7XFxuICAjdXRpbGl0aWVzIGZvcm0ge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBtYXJnaW4tbGVmdDogLTIwMHB4O1xcbiAgfVxcblxcbiAgLndlZWtseS1pdGVtIGRpdjpsYXN0LWNoaWxkIHtcXG4gICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xcbiAgfVxcbn1cXG5cXG4vKiAvLyBNZWRpdW0gZGV2aWNlcyAodGFibGV0cywgNzY4cHggYW5kIHVwKSAqL1xcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIDAuMTMpOyAqL1xcbiAgICBtYXJnaW46IDAgNjBweDtcXG4gIH1cXG4gICN1dGlsaXRpZXMgZm9ybSB7XFxuICAgIHdpZHRoOiA0MCU7XFxuICAgIG1hcmdpbi1sZWZ0OiAtNDAwcHg7XFxuICB9XFxuXFxuICAjdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1iYXIge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XFxuICB9XFxufVxcblxcbi8qIC8vIExhcmdlIGRldmljZXMgKGRlc2t0b3BzLCA5OTJweCBhbmQgdXApICovXFxuQG1lZGlhIChtaW4td2lkdGg6IDk5MnB4KSB7XFxuXFxuLndlZWtseS1pdGVtOm50aC1jaGlsZChuKzIpe1xcbiAgbWFyZ2luLXRvcDogLTE3cHg7XFxufVxcbiBcXG4gIC5jb250YWluZXIge1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDYlIDIyJSA1JSAyMCUgNDclO1xcbiAgfVxcblxcbiAgLmNvbnRhaW5lciB7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIDAuMTMpOyAqL1xcbiAgICBtYXJnaW46IDAgMTUwcHg7XFxuICB9XFxuICAjdXRpbGl0aWVzIGZvcm0ge1xcbiAgICBtYXJnaW4tbGVmdDogLTkwJTtcXG4gIH1cXG4gICN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWJhciB7XFxuICAgIG1hcmdpbi10b3A6IC0ycmVtO1xcbiAgICBtYXJnaW4tcmlnaHQ6IC0ycmVtO1xcbiAgfVxcbiAgLndlZWtseS1pdGVtIGltZyB7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcXG4gIH1cXG5cXG4gIC8qICN1dGlsaXRpZXMgZm9ybSB7XFxuICAgIG1hcmdpbi1sZWZ0OiAtODAwcHg7XFxuICAgIHdpZHRoOiA0MCU7XFxuICB9XFxuXFxuICAjdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1iYXIge1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxuICB9XFxuICAud2Vla2x5LWl0ZW0gZGl2Omxhc3QtY2hpbGQge1xcbiAgICBwYWRkaW5nLWxlZnQ6IDUwcHg7XFxuICB9ICovXFxufVxcblxcblxcblxcbi8qIC8vIFgtTGFyZ2UgZGV2aWNlcyAobGFyZ2UgZGVza3RvcHMsIDEyMDBweCBhbmQgdXApICovXFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiBcXG5cXG4ud2Vla2x5LWl0ZW06bnRoLWNoaWxkKG4rMil7XFxuICBtYXJnaW4tdG9wOiAtMThweDtcXG59XFxuICAuY29udGFpbmVyIHtcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMCwgMC4xMyk7ICovXFxuICAgIG1hcmdpbjogMCAyMDBweDtcXG4gIH1cXG4gICN1dGlsaXRpZXMgZm9ybSB7XFxuICAgIG1hcmdpbi1sZWZ0OiAtMTUwcHg7XFxuICAgIHdpZHRoOiAzNSU7XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICB9XFxuXFxuICAud2Vla2x5LWl0ZW0gZGl2OmZpcnN0LWNoaWxkIHtcXG4gICAgd2lkdGg6IDEwJTtcXG4gIH1cXG59XFxuXFxuLyogLy8gWFgtTGFyZ2UgZGV2aWNlcyAobGFyZ2VyIGRlc2t0b3BzLCAxNDAwcHggYW5kIHVwKSAqL1xcbkBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFHQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsaUZBQThEO0VBQzlELDhCQUE4QjtFQUM5QiwyQkFBMkI7RUFDM0IseUJBQXlCO0VBQ3pCLHNCQUFzQjtBQUN4Qjs7QUFFQTs7RUFFRSxhQUFhO0VBQ2IsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsNkJBQTZCO0VBQzdCLFlBQVk7QUFDZDs7QUFFQTtFQUNFLE9BQU87RUFDUCxhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0Us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OztFQUVBO0lBQ0Usa0JBQWtCO0VBQ3BCO0FBQ0Y7O0FBRUEsOENBQThDO0FBQzlDOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztFQUVFO0lBQ0UscUNBQXFDO0VBQ3ZDOztFQUVBO0lBQ0UsK0NBQStDO0lBQy9DLGVBQWU7RUFDakI7RUFDQTtJQUNFLGlCQUFpQjtFQUNuQjtFQUNBO0lBQ0UsaUJBQWlCO0lBQ2pCLG1CQUFtQjtFQUNyQjtFQUNBO0lBQ0UscUJBQXFCO0VBQ3ZCOztFQUVBOzs7Ozs7Ozs7O0tBVUc7QUFDTDs7OztBQUlBLHVEQUF1RDtBQUN2RDs7O0FBR0E7RUFDRSxpQkFBaUI7QUFDbkI7RUFDRTtJQUNFLCtDQUErQztJQUMvQyxlQUFlO0VBQ2pCO0VBQ0E7SUFDRSxtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLFVBQVU7RUFDWjtBQUNGOztBQUVBLHlEQUF5RDtBQUN6RDtBQUNBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUxpYnJlK0ZyYW5rbGluOndnaHRAMTAwJmRpc3BsYXk9c3dhcFxcXCIpO1xcbkBpbXBvcnQgXFxcIn5ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3NcXFwiO1xcblxcbioge1xcbiAgLyogY29sb3I6IHdoaXRlOyAqL1xcbiAgLyogY29sb3I6IGJsYWNrOyAgKi9cXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrOyAqL1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmh0bWwge1xcbiAgYmFja2dyb3VuZDogdXJsKC4vaW1hZ2VzL2JnLmpwZykgbm8tcmVwZWF0IGNlbnRlciBjZW50ZXIgZml4ZWQ7XFxuICAtd2Via2l0LWJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAtbW96LWJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAtby1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmb250LWZhbWlseTogXFxcIkxpYnJlIEZyYW5rbGluXFxcIjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuLmNvbnRhaW5lciB7XFxuICBmbGV4OiAxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMTAlIDMwJSA1JSAyMCUgMzUlO1xcbn1cXG5cXG4jdXRpbGl0aWVzIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jc2VhcmNoLWZvcm0gKiB7XFxuICBmbGV4LWdyb3c6IDE7XFxufVxcblxcbiN1dGlsaXRpZXMgZm9ybSB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYm9yZGVyLXJhZGl1czogMTByZW07XFxuICBmb250LXNpemU6IDEuMXJlbTtcXG5jb2xvcjogd2hpdGU7XFxuICBib3JkZXI6IDEuNXB4IHNvbGlkIHRlYWw7XFxuICB3aWR0aDogODAlO1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG5cXG4jdXRpbGl0aWVzIGZvcm06Zm9jdXMtd2l0aGluIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCAycHggd2hpdGUsXFxuICAgIDAgMCAxcHggcmdiKDQsIDI1MCwgMjUwKTtcXG59XFxuXFxuI3V0aWxpdGllcyBmb3JtIGJ1dHRvbiB7XFxuICBhbGw6IHVuc2V0O1xcbiAgcGFkZGluZy1yaWdodDogMC41cmVtO1xcbiAgZm9udC1zaXplOiAxMjAlO1xcbn1cXG5cXG4jdXRpbGl0aWVzIGZvcm0gYnV0dG9uOmhvdmVyIHtcXG4gIGNvbG9yOiB0ZWFsO1xcbn1cXG5cXG4jdXRpbGl0aWVzIGlucHV0W3R5cGU9XFxcInRleHRcXFwiXSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAtbW96LWJveC1zaGFkb3c6IG5vbmU7XFxuICBib3gtc2hhZG93OiBub25lO1xcbiAgcGFkZGluZy1sZWZ0OiAwLjhyZW07XFxuICBwYWRkaW5nLXRvcDogMC4ycmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDAuMnJlbTtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMnJlbTtcXG4gIGNvbG9yOiB3aGl0ZTsgXFxuICAvKiBjb2xvcjogYmxhY2s7ICovXFxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbn1cXG5cXG4jdXRpbGl0aWVzIGlucHV0OjpwbGFjZWhvbGRlciB7XFxuICAvKiBjb2xvcjogYmxhY2s7ICovXFxuICBjb2xvcjogd2hpdGU7IFxcbn1cXG5cXG4jdXRpbGl0aWVzIGlucHV0W3R5cGU9XFxcInRleHRcXFwiXTpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG5cXG4jdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1iYXIge1xcbiAgbWFyZ2luLXRvcDogN3B4O1xcbiAgbWFyZ2luLXJpZ2h0OiA2cHg7XFxuICBhbGlnbi1zZWxmOiBmbGV4LWVuZDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiA0cmVtO1xcbiAgbWF4LWhlaWdodDogMnJlbTtcXG4gIG1pbi1oZWlnaHQ6IDJyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDUsIDIwNSwgMjU1LCAwLjM0OSk7XFxufVxcblxcbiN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWNoZWNrIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGhlaWdodDogMS42cmVtO1xcbiAgd2lkdGg6IDEuNnJlbTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGxpbmVhcjtcXG4gIHotaW5kZXg6IDEwO1xcbiAgdG9wOiAwLjJyZW07XFxuICBsZWZ0OiAwLjJyZW07XFxufVxcblxcbiN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWNoZWNrOmNoZWNrZWQge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDJyZW0pO1xcbn1cXG5cXG4jdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1sYWJlbCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBtYXgtaGVpZ2h0OiAycmVtO1xcbiAgbWluLWhlaWdodDogMnJlbTtcXG4gIHdpZHRoOiA0cmVtO1xcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlOyAqL1xcbn1cXG5cXG4jdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1sYWJlbCBkaXYge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxcmVtO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBwYWRkaW5nOiAwIDVweDtcXG59XFxuXFxuI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtbGFiZWwgZGl2Omxhc3QtY2hpbGQge1xcbiAgcmlnaHQ6IDA7XFxufVxcblxcbiNjdXJyZW50IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuI2N1cnJlbnQgI2NpdHkge1xcbiAgZm9udC1zaXplOiAzLjVyZW07XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuI2N1cnJlbnQgI2RlcyB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuXFxuI2N1cnJlbnQgI2N1cnJlbnQtdGVtcCB7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4jdG9kYXkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4jdG9kYXktZm9yZWNhc3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuXFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuI3RvZGF5LWZvcmVjYXN0IC50b2RheS1pdGVtIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDE1JSA0NSUgMTUlO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgXFxcInRpbWVcXFwiXFxuICAgIFxcXCJpbWdcXFwiXFxuICAgIFxcXCJ0ZW1wXFxcIjtcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXIgY2VudGVyO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4jdG9kYXktZm9yZWNhc3QgLnRvZGF5LWl0ZW0gaW1nIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZ3JpZC1hcmVhOiBpbWc7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LWhlaWdodDogMTAwJTtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICAvKiB0cmFuc2Zvcm06IHNjYWxlKDAuOSk7ICovXFxufVxcblxcbiN3ZWVrbHktZm9yZWNhc3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuI3dlZWtseS1mb3JlY2FzdCAud2Vla2x5LWl0ZW0ge1xcbiAgLyogd2lkdGg6IDUwJTsgICovXFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDA7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMjYlO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbiN3ZWVrbHktZm9yZWNhc3QgLndlZWtseS1pdGVtIC5kYXkge1xcbiAgd2lkdGg6IDljaDtcXG59XFxuXFxuI3dlZWtseS1mb3JlY2FzdCAud2Vla2x5LWl0ZW0gLm1pbixcXG4ubWF4IHtcXG4gIHdpZHRoOiA1Y2g7XFxuICAvKiB0ZXh0LWFsaWduOiBjZW50ZXI7ICovXFxufVxcblxcbi53ZWVrbHktaXRlbTpudGgtY2hpbGQobisyKXtcXG4gIG1hcmdpbi10b3A6IC0xNXB4O1xcblxcbn1cXG5cXG4ud2Vla2x5LWl0ZW0gaW1nIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC42KTtcXG59XFxuXFxuLyogLy8gU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgNTc2cHggYW5kIHVwKSAqL1xcbkBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xcbiAgI3V0aWxpdGllcyBmb3JtIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IC0yMDBweDtcXG4gIH1cXG5cXG4gIC53ZWVrbHktaXRlbSBkaXY6bGFzdC1jaGlsZCB7XFxuICAgIHBhZGRpbmctbGVmdDogMzBweDtcXG4gIH1cXG59XFxuXFxuLyogLy8gTWVkaXVtIGRldmljZXMgKHRhYmxldHMsIDc2OHB4IGFuZCB1cCkgKi9cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5jb250YWluZXIge1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAwLCAwLjEzKTsgKi9cXG4gICAgbWFyZ2luOiAwIDYwcHg7XFxuICB9XFxuICAjdXRpbGl0aWVzIGZvcm0ge1xcbiAgICB3aWR0aDogNDAlO1xcbiAgICBtYXJnaW4tbGVmdDogLTQwMHB4O1xcbiAgfVxcblxcbiAgI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtYmFyIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbiAgfVxcbn1cXG5cXG4vKiAvLyBMYXJnZSBkZXZpY2VzIChkZXNrdG9wcywgOTkycHggYW5kIHVwKSAqL1xcbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xcblxcbi53ZWVrbHktaXRlbTpudGgtY2hpbGQobisyKXtcXG4gIG1hcmdpbi10b3A6IC0xN3B4O1xcbn1cXG4gXFxuICAuY29udGFpbmVyIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA2JSAyMiUgNSUgMjAlIDQ3JTtcXG4gIH1cXG5cXG4gIC5jb250YWluZXIge1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAwLCAwLjEzKTsgKi9cXG4gICAgbWFyZ2luOiAwIDE1MHB4O1xcbiAgfVxcbiAgI3V0aWxpdGllcyBmb3JtIHtcXG4gICAgbWFyZ2luLWxlZnQ6IC05MCU7XFxuICB9XFxuICAjdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1iYXIge1xcbiAgICBtYXJnaW4tdG9wOiAtMnJlbTtcXG4gICAgbWFyZ2luLXJpZ2h0OiAtMnJlbTtcXG4gIH1cXG4gIC53ZWVrbHktaXRlbSBpbWcge1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOCk7XFxuICB9XFxuXFxuICAvKiAjdXRpbGl0aWVzIGZvcm0ge1xcbiAgICBtYXJnaW4tbGVmdDogLTgwMHB4O1xcbiAgICB3aWR0aDogNDAlO1xcbiAgfVxcblxcbiAgI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtYmFyIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbiAgfVxcbiAgLndlZWtseS1pdGVtIGRpdjpsYXN0LWNoaWxkIHtcXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O1xcbiAgfSAqL1xcbn1cXG5cXG5cXG5cXG4vKiAvLyBYLUxhcmdlIGRldmljZXMgKGxhcmdlIGRlc2t0b3BzLCAxMjAwcHggYW5kIHVwKSAqL1xcbkBtZWRpYSAobWluLXdpZHRoOiAxMjAwcHgpIHtcXG4gXFxuXFxuLndlZWtseS1pdGVtOm50aC1jaGlsZChuKzIpe1xcbiAgbWFyZ2luLXRvcDogLTE4cHg7XFxufVxcbiAgLmNvbnRhaW5lciB7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIDAuMTMpOyAqL1xcbiAgICBtYXJnaW46IDAgMjAwcHg7XFxuICB9XFxuICAjdXRpbGl0aWVzIGZvcm0ge1xcbiAgICBtYXJnaW4tbGVmdDogLTE1MHB4O1xcbiAgICB3aWR0aDogMzUlO1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgfVxcblxcbiAgLndlZWtseS1pdGVtIGRpdjpmaXJzdC1jaGlsZCB7XFxuICAgIHdpZHRoOiAxMCU7XFxuICB9XFxufVxcblxcbi8qIC8vIFhYLUxhcmdlIGRldmljZXMgKGxhcmdlciBkZXNrdG9wcywgMTQwMHB4IGFuZCB1cCkgKi9cXG5AbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgJiYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXSk7IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgb3B0aW9ucyA9IHt9O1xuICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZSwgbm8tcGFyYW0tcmVhc3NpZ25cblxuXG4gIHVybCA9IHVybCAmJiB1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsO1xuXG4gIGlmICh0eXBlb2YgdXJsICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfSAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJpbXBvcnQgYXBpIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICAgICAgICBpbXBvcnQgY29udGVudCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNPbGRJRSA9IGZ1bmN0aW9uIGlzT2xkSUUoKSB7XG4gIHZhciBtZW1vO1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUoKSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vID09PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3NcbiAgICAgIC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcbiAgICAgIC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcbiAgICAgIC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuICAgICAgLy8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG4gICAgICBtZW1vID0gQm9vbGVhbih3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG59KCk7XG5cbnZhciBnZXRUYXJnZXQgPSBmdW5jdGlvbiBnZXRUYXJnZXQoKSB7XG4gIHZhciBtZW1vID0ge307XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbiAgfTtcbn0oKTtcblxudmFyIHN0eWxlc0luRG9tID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5Eb20ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5Eb21baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzSW5Eb20ucHVzaCh7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IGFkZFN0eWxlKG9iaiwgb3B0aW9ucyksXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHZhciBhdHRyaWJ1dGVzID0gb3B0aW9ucy5hdHRyaWJ1dGVzIHx8IHt9O1xuXG4gIGlmICh0eXBlb2YgYXR0cmlidXRlcy5ub25jZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09ICd1bmRlZmluZWQnID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gICAgaWYgKG5vbmNlKSB7XG4gICAgICBhdHRyaWJ1dGVzLm5vbmNlID0gbm9uY2U7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KG9wdGlvbnMuaW5zZXJ0IHx8ICdoZWFkJyk7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG52YXIgcmVwbGFjZVRleHQgPSBmdW5jdGlvbiByZXBsYWNlVGV4dCgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdO1xuICByZXR1cm4gZnVuY3Rpb24gcmVwbGFjZShpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG4gIH07XG59KCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmoubWVkaWEgPyBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpLmNvbmNhdChvYmouY3NzLCBcIn1cIikgOiBvYmouY3NzOyAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH1cblxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGUsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzcztcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZSgnbWVkaWEnKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZS5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMDtcblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBzdHlsZTtcbiAgdmFyIHVwZGF0ZTtcbiAgdmFyIHJlbW92ZTtcblxuICBpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcbiAgICBzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlID0gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cbiAgICByZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH07XG4gIH1cblxuICB1cGRhdGUob2JqKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbiAgLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXG4gIGlmICghb3B0aW9ucy5zaW5nbGV0b24gJiYgdHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uICE9PSAnYm9vbGVhbicpIHtcbiAgICBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcbiAgfVxuXG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobmV3TGlzdCkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vbW9kdWxlcy91dGlscyc7XG5pbXBvcnQgJy4vaW5kZXguY3NzJztcbmltcG9ydCB7IGdldEZvcmVjYXN0IH0gZnJvbSAnLi9tb2R1bGVzL2dldEZvcmVjYXN0JztcbmltcG9ydCB7XG4gIGN1cnJlbnRXZWF0aGVyVUksXG4gIGhvdXJseUZvcmVjYXN0VUksXG4gIGRhaWx5Rm9yZWNhc3RVSSxcbn0gZnJvbSAnLi9tb2R1bGVzL1VJJztcblxuaW1wb3J0IHsgc2V0VG9nZ2xlLCBkaXNhYmxlVG9nZ2xlIH0gZnJvbSAnLi9tb2R1bGVzL3RvZ2dsZVN0YXRlJztcblxuZnVuY3Rpb24gaW5pdGlhbFN0YXRlKCkge1xuICBjb25zdCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybSBpbnB1dCcpLnZhbHVlO1xuICBkaXNhYmxlVG9nZ2xlKCk7XG4gIGdldEZvcmVjYXN0KGNpdHkpLnRoZW4oKHsgaG91cmx5LCBkYWlseSwgY3VycmVudCB9KSA9PiB7XG4gICAgY3VycmVudFdlYXRoZXJVSShjaXR5LCBjdXJyZW50KTtcbiAgICBob3VybHlGb3JlY2FzdFVJKGhvdXJseSk7XG4gICAgZGFpbHlGb3JlY2FzdFVJKGRhaWx5KTtcbiAgICBzZXRUb2dnbGUoKTtcbiAgfSk7XG59XG5cbmluaXRpYWxTdGF0ZSgpOyJdLCJzb3VyY2VSb290IjoiIn0=