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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  /* border: 1px solid black; */\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n}\n\nhtml,\nbody {\n  height: 100vh;\n  overflow: hidden;\n}\nbody {\n  display: flex;\n  font-family: 'Libre Franklin';\n  color: white;\n}\n\n.container {\n  flex: 1;\n  display: grid;\n  grid-template-rows: 10% 30% 5% 20% 35%;\n}\n\n#utilities {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n\n#utilities * {\n  flex-grow: 1;\n}\n\n#utilities form {\n  align-self: center;\n  display: flex;\n  border-radius: 10rem;\n  font-size: 1.1rem;\n  color: white;\n  border: 1px solid white;\n  width: 80%;\n  margin-top: 5px;\n}\n\n#utilities form:focus-within {\n  box-shadow: inset 0 0 4px rgba(245, 245, 245, 0.705),\n    0 0 5px rgba(9, 253, 22, 0.904);\n}\n\n#utilities form button {\n  all: unset;\n  padding-right: 0.5em;\n  font-size: 120%;\n}\n\n#utilities form button:hover {\n  color: teal;\n}\n\n#utilities input[type='text'] {\n  border: none;\n  background-image: none;\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n  padding-left: 0.8rem;\n  padding-top: 0.2rem;\n  padding-bottom: 0.2rem;\n  display: inline-flex;\n  align-items: center;\n  height: 100%;\n  color: white;\n  line-height: normal;\n}\n\n#utilities input::placeholder {\n  color: white;\n}\n\n#utilities input[type='text']:focus {\n  outline: none;\n}\n\n#utilities #temp-toggle-bar {\n  margin-top: 7px;\n  margin-right: 6px;\n  align-self: flex-end;\n  position: relative;\n  width: 4rem;\n  max-height: 2rem;\n  min-height: 2rem;\n  background-color: rgba(5, 205, 255, 0.185);\n}\n\n#utilities #temp-toggle-check {\n  position: absolute;\n  cursor: pointer;\n  appearance: none;\n  background-color: white;\n  height: 1.6rem;\n  width: 1.6rem;\n  transition: transform 0.3s linear;\n  z-index: 10;\n  top: 0.2rem;\n  left: 0.2rem;\n}\n\n#utilities #temp-toggle-check:checked {\n  transform: translateX(2rem);\n}\n\n#utilities #temp-toggle-label {\n  position: absolute;\n  max-height: 2rem;\n  min-height: 2rem;\n  width: 4rem;\n  /* background-color: orange; */\n}\n\n#utilities #temp-toggle-label div {\n  position: absolute;\n  top: 1rem;\n  transform: translateY(-50%);\n  font-size: 1.5rem;\n  padding: 0 5px;\n}\n\n#utilities #temp-toggle-label div:last-child {\n  right: 0;\n}\n\n#current {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-between;\n\n}\n\n#current #city {\n  font-size: 3.5rem;\n    font-weight: bold;\n\n}\n\n#current #des {\n  font-size: 1.2rem;\n}\n\n#current #current-temp {\n  font-size: 3rem;\n  padding-bottom: 40px;\n  font-weight: bold;\n}\n\n#today {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  font-weight: bold;\n}\n\n#today-forecast {\n  display: flex;\n  list-style: none;\n\n  align-items: flex-start;\n}\n\n#today-forecast .today-item {\n  height: 100%;\n  flex-grow: 1;\n  display: grid;\n  grid-template-rows: 15% 45% 15%;\n  grid-template-areas:\n    'time'\n    'img'\n    'temp';\n  place-items: center center;\n  align-content: center;\n}\n\n#today-forecast .today-item img {\n  display: block;\n  grid-area: img;\n  object-fit: cover;\n  width: 100%;\n  max-height: 100%;\n  padding: 0;\n  margin: 0;\n  /* transform: scale(0.9); */\n}\n\n#weekly-forecast {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  \n}\n\n#weekly-forecast .weekly-item {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  height: 20%;\n  justify-content: center;\n}\n.weekly-item div:first-child {\n  width: 18%;\n}\n\n\n.weekly-item div:last-child {\n  padding-left: 20px;\n\n}\n\n\n.weekly-item img {\n  transform: scale(0.8);\n}\n\n/* // Small devices (landscape phones, 576px and up) */\n@media (min-width: 576px) {\n  #utilities form {\n    width: 50%;\n    margin-left: -200px;\n  }\n\n  .weekly-item div:last-child {\n    padding-left: 30px;}\n}\n\n/* // Medium devices (tablets, 768px and up) */\n@media (min-width: 768px) {\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 60px;\n  }\n  #utilities form {\n    width: 40%;\n    margin-left: -400px;\n  }\n\n  #utilities #temp-toggle-bar {\n    margin-right: 30px;\n  }\n}\n\n/* // Large devices (desktops, 992px and up) */\n@media (min-width: 992px) {\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 150px;\n  }\n\n\n  #utilities form {\n    margin-left: -800px;\n    width: 40%;\n  }\n\n  #utilities #temp-toggle-bar {\n    margin-right: 10px;\n  }\n  .weekly-item div:last-child {\n    padding-left: 50px;}\n}\n\n/* // X-Large devices (large desktops, 1200px and up) */\n@media (min-width: 1200px) {\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 200px;\n  }\n  #utilities form {\n    margin-left: -150px;\n    width: 35%;\n    align-self: flex-start;\n  }\n\n  .weekly-item div:first-child {\n    width: 10%;\n  }\n}\n\n/* // XX-Large devices (larger desktops, 1400px and up) */\n@media (min-width: 1400px) {\n}\n", "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@100&display=swap');\n@import '~normalize.css/normalize.css';\n\n* {\n  /* border: 1px solid black; */\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nhtml {\n  background: url(./images/bg.jpg) no-repeat center center fixed;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n}\n\nhtml,\nbody {\n  height: 100vh;\n  overflow: hidden;\n}\nbody {\n  display: flex;\n  font-family: 'Libre Franklin';\n  color: white;\n}\n\n.container {\n  flex: 1;\n  display: grid;\n  grid-template-rows: 10% 30% 5% 20% 35%;\n}\n\n#utilities {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n\n#utilities * {\n  flex-grow: 1;\n}\n\n#utilities form {\n  align-self: center;\n  display: flex;\n  border-radius: 10rem;\n  font-size: 1.1rem;\n  color: white;\n  border: 1px solid white;\n  width: 80%;\n  margin-top: 5px;\n}\n\n#utilities form:focus-within {\n  box-shadow: inset 0 0 4px rgba(245, 245, 245, 0.705),\n    0 0 5px rgba(9, 253, 22, 0.904);\n}\n\n#utilities form button {\n  all: unset;\n  padding-right: 0.5em;\n  font-size: 120%;\n}\n\n#utilities form button:hover {\n  color: teal;\n}\n\n#utilities input[type='text'] {\n  border: none;\n  background-image: none;\n  background-color: transparent;\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none;\n  padding-left: 0.8rem;\n  padding-top: 0.2rem;\n  padding-bottom: 0.2rem;\n  display: inline-flex;\n  align-items: center;\n  height: 100%;\n  color: white;\n  line-height: normal;\n}\n\n#utilities input::placeholder {\n  color: white;\n}\n\n#utilities input[type='text']:focus {\n  outline: none;\n}\n\n#utilities #temp-toggle-bar {\n  margin-top: 7px;\n  margin-right: 6px;\n  align-self: flex-end;\n  position: relative;\n  width: 4rem;\n  max-height: 2rem;\n  min-height: 2rem;\n  background-color: rgba(5, 205, 255, 0.185);\n}\n\n#utilities #temp-toggle-check {\n  position: absolute;\n  cursor: pointer;\n  appearance: none;\n  background-color: white;\n  height: 1.6rem;\n  width: 1.6rem;\n  transition: transform 0.3s linear;\n  z-index: 10;\n  top: 0.2rem;\n  left: 0.2rem;\n}\n\n#utilities #temp-toggle-check:checked {\n  transform: translateX(2rem);\n}\n\n#utilities #temp-toggle-label {\n  position: absolute;\n  max-height: 2rem;\n  min-height: 2rem;\n  width: 4rem;\n  /* background-color: orange; */\n}\n\n#utilities #temp-toggle-label div {\n  position: absolute;\n  top: 1rem;\n  transform: translateY(-50%);\n  font-size: 1.5rem;\n  padding: 0 5px;\n}\n\n#utilities #temp-toggle-label div:last-child {\n  right: 0;\n}\n\n#current {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-between;\n\n}\n\n#current #city {\n  font-size: 3.5rem;\n    font-weight: bold;\n\n}\n\n#current #des {\n  font-size: 1.2rem;\n}\n\n#current #current-temp {\n  font-size: 3rem;\n  padding-bottom: 40px;\n  font-weight: bold;\n}\n\n#today {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  font-weight: bold;\n}\n\n#today-forecast {\n  display: flex;\n  list-style: none;\n\n  align-items: flex-start;\n}\n\n#today-forecast .today-item {\n  height: 100%;\n  flex-grow: 1;\n  display: grid;\n  grid-template-rows: 15% 45% 15%;\n  grid-template-areas:\n    'time'\n    'img'\n    'temp';\n  place-items: center center;\n  align-content: center;\n}\n\n#today-forecast .today-item img {\n  display: block;\n  grid-area: img;\n  object-fit: cover;\n  width: 100%;\n  max-height: 100%;\n  padding: 0;\n  margin: 0;\n  /* transform: scale(0.9); */\n}\n\n#weekly-forecast {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  \n}\n\n#weekly-forecast .weekly-item {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  height: 20%;\n  justify-content: center;\n}\n.weekly-item div:first-child {\n  width: 18%;\n}\n\n\n.weekly-item div:last-child {\n  padding-left: 20px;\n\n}\n\n\n.weekly-item img {\n  transform: scale(0.8);\n}\n\n/* // Small devices (landscape phones, 576px and up) */\n@media (min-width: 576px) {\n  #utilities form {\n    width: 50%;\n    margin-left: -200px;\n  }\n\n  .weekly-item div:last-child {\n    padding-left: 30px;}\n}\n\n/* // Medium devices (tablets, 768px and up) */\n@media (min-width: 768px) {\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 60px;\n  }\n  #utilities form {\n    width: 40%;\n    margin-left: -400px;\n  }\n\n  #utilities #temp-toggle-bar {\n    margin-right: 30px;\n  }\n}\n\n/* // Large devices (desktops, 992px and up) */\n@media (min-width: 992px) {\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 150px;\n  }\n\n\n  #utilities form {\n    margin-left: -800px;\n    width: 40%;\n  }\n\n  #utilities #temp-toggle-bar {\n    margin-right: 10px;\n  }\n  .weekly-item div:last-child {\n    padding-left: 50px;}\n}\n\n/* // X-Large devices (large desktops, 1200px and up) */\n@media (min-width: 1200px) {\n  .container {\n    /* background-color: rgba(255, 255, 0, 0.13); */\n    margin: 0 200px;\n  }\n  #utilities form {\n    margin-left: -150px;\n    width: 35%;\n    align-self: flex-start;\n  }\n\n  .weekly-item div:first-child {\n    width: 10%;\n  }\n}\n\n/* // XX-Large devices (larger desktops, 1400px and up) */\n@media (min-width: 1400px) {\n}\n"],"sourceRoot":""}]);
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

module.exports = __webpack_require__.p + "2f6876b37cbed19c8812.jpg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9VSS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9mb3JtSGFuZGxlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9nZXRDdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9nZXRGb3JlY2FzdC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvbW9kdWxlcy9pY29uU2V0dGVyLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL3RlbXAtY29udmVydGVyLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL3RvRGF5LmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL3RvZ2dsZVN0YXRlLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL3NyYy9tb2R1bGVzL3RvZ2dsZVRlbXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL21vZHVsZXMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL3dlYnBhY2stZGVtby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vLi9zcmMvaW5kZXguY3NzP2NmZTQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYnBhY2stZGVtby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrLWRlbW8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VicGFjay1kZW1vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImdldFRpbWVTdHJpbmdzIiwidGltZXMiLCJtYXAiLCJ0aW1lIiwiaHIiLCJnZXRIb3VycyIsInNsaWNlIiwibWluIiwiZ2V0TWludXRlcyIsImN1cnJlbnRXZWF0aGVyVUkiLCJjaXR5IiwiZGVzY3JpcHRpb24iLCJ0ZW1wZXJhdHVyZSIsIm1heCIsImRheSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJ0b0ZpeGVkIiwidGVtcFN0YXRlIiwiaG91cmx5Rm9yZWNhc3RVSSIsImljb25zIiwidGVtcGVyYXR1cmVzIiwiYmxvY2tzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImkiLCJmb3JFYWNoIiwiYmxvY2siLCJxdWVyeVNlbGVjdG9yIiwiaWNvblNldHRlciIsImRhaWx5Rm9yZWNhc3RVSSIsImRheXMiLCJtYXhzIiwibWlucyIsInJvd3MiLCJyb3ciLCJmb3JtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvcm1TdWJtaXRIYW5kbGVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsdWUiLCJkaXNhYmxlVG9nZ2xlIiwiZ2V0Rm9yZWNhc3QiLCJ0aGVuIiwiaG91cmx5IiwiZGFpbHkiLCJjdXJyZW50Iiwic2V0VG9nZ2xlIiwiQVBJX0tFWSIsImdldEN1cnJlbnRXZWF0aGVyIiwiY2l0eU5hbWUiLCJmZXRjaCIsInJlcyIsImpzb24iLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ3ZWF0aGVyIiwibWFpbiIsInRlbXAiLCJnZXRUaW1lIiwidXRjIiwiRGF0ZSIsImZldGNoQ29vcmRzIiwicmVzcG9uc2UiLCJsYXQiLCJsb24iLCJnZXRDdXJyZW50Q29udGVudCIsImR0IiwiaWNvbiIsImdldENlbHNpdXNGcm9tS2VsdmluIiwidG9EYXkiLCJnZXROZXh0NEhvdXJDb250ZW50IiwibmV4dDRIb3Vyc0RhdGEiLCJob3VyRGF0YSIsInB1c2giLCJnZXRIb3VybHlGb3JlY2FzdCIsIm5leHQ0SG91ciIsImNvbmNhdCIsImdldERhaWx5Rm9yZWNhc3QiLCJuZXh0NURheURhdGEiLCJpbWciLCJuYW1lIiwic3JjIiwiZ2V0RmFocmVuaGVpdEZyb21DZWxzaXVzIiwiY2Vsc2l1cyIsImdldENlbHNpdXNGcm9tRmFocmVuaGVpdCIsImZhaHJlbmhlaXQiLCJrZWx2aW4iLCJkYXRlVmFsIiwib3B0aW9ucyIsIndlZWtkYXkiLCJJbnRsIiwiRGF0ZVRpbWVGb3JtYXQiLCJmb3JtYXQiLCJkaXNhYmxlZCIsImNoZWNrZWQiLCJjaGVja0JveCIsInRlbXBIb2xkZXJzIiwidG9nZ2xlVGVtcHMiLCJjdXJyZW50VGVtcEVsZW0iLCJ0ZW1wSG9sZGVyIiwiaW5pdGlhbFN0YXRlIl0sIm1hcHBpbmdz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SUFBRCxDQUFYLENBQWtCcUMsSUFBbEIsQ0FBdUIsZ0JBQWdDO0FBQUEsUUFBN0JDLE1BQTZCLFFBQTdCQSxNQUE2QjtBQUFBLFFBQXJCQyxLQUFxQixRQUFyQkEsS0FBcUI7QUFBQSxRQUFkQyxPQUFjLFFBQWRBLE9BQWM7QUFDckR6QyxpRUFBZ0IsQ0FBQ0MsSUFBRCxFQUFPd0MsT0FBUCxDQUFoQjtBQUNBN0IsaUVBQWdCLENBQUMyQixNQUFELENBQWhCO0FBQ0FmLGdFQUFlLENBQUNnQixLQUFELENBQWY7QUFDQUUsbUVBQVM7QUFDVixHQUxEO0FBTUQ7O0FBRUR1RCxZQUFZLEciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVtcFN0YXRlIH0gZnJvbSAnLi9mb3JtSGFuZGxlcic7XG5pbXBvcnQgeyBpY29uU2V0dGVyIH0gZnJvbSAnLi9pY29uU2V0dGVyJztcblxuZnVuY3Rpb24gZ2V0VGltZVN0cmluZ3ModGltZXMpIHtcbiAgICByZXR1cm4gdGltZXMubWFwKCh0aW1lKSA9PiB7XG4gICAgICBjb25zdCBociA9ICgnMCcgKyB0aW1lLmdldEhvdXJzKCkpLnNsaWNlKC0yKTtcbiAgICAgIGNvbnN0IG1pbiA9ICgnMCcgKyB0aW1lLmdldE1pbnV0ZXMoKSkuc2xpY2UoLTIpO1xuICAgICAgcmV0dXJuIGAke2hyfToke21pbn1gO1xuICAgIH0pO1xuICB9XG5cbmZ1bmN0aW9uIGN1cnJlbnRXZWF0aGVyVUkoY2l0eSwgeyBkZXNjcmlwdGlvbiwgdGVtcGVyYXR1cmUsIG1heCwgbWluLCBkYXkgfSkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2l0eScpLmlubmVyVGV4dCA9IGNpdHk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXMnKS5pbm5lclRleHQgPSBkZXNjcmlwdGlvbjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnQtdGVtcCcpLmlubmVySFRNTCA9IGAkeygrdGVtcGVyYXR1cmUpLnRvRml4ZWQoXG4gICAgMixcbiAgKX0gJmRlZztDYDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZGF5LWRheScpLmlubmVyVGV4dCA9IGRheTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZGF5LW1pbicpLmlubmVyVGV4dCA9IG1pbi50b0ZpeGVkKDIpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kYXktbWF4JykuaW5uZXJUZXh0ID0gbWF4LnRvRml4ZWQoMik7XG4gIHRlbXBTdGF0ZS5wdXNoKHRlbXBlcmF0dXJlLCBtYXgsIG1pbik7XG59XG5cbmZ1bmN0aW9uIGhvdXJseUZvcmVjYXN0VUkoeyB0aW1lcywgaWNvbnMsIHRlbXBlcmF0dXJlcyB9KSB7XG4gIHRpbWVzID0gZ2V0VGltZVN0cmluZ3ModGltZXMpO1xuICBjb25zdCBibG9ja3MgPSBBcnJheS5mcm9tKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN0b2RheS1mb3JlY2FzdCAudG9kYXktaXRlbScpLFxuICApO1xuICBsZXQgaSA9IDA7XG4gIGJsb2Nrcy5mb3JFYWNoKChibG9jaykgPT4ge1xuICAgIGJsb2NrLnF1ZXJ5U2VsZWN0b3IoJy50aW1lJykuaW5uZXJUZXh0ID0gdGltZXNbaV07XG4gICAgaWNvblNldHRlcihibG9jay5xdWVyeVNlbGVjdG9yKCcuaWNvbicpLCBpY29uc1tpXSk7XG4gICAgLy8gYmxvY2sucXVlcnlTZWxlY3RvcignLmljb24nKS5pbm5lckhUTUwgPSBpY29uc1tpXTtcbiAgICBibG9jay5xdWVyeVNlbGVjdG9yKCcudGVtcCcpLmlubmVyVGV4dCA9IHRlbXBlcmF0dXJlc1tpXS50b0ZpeGVkKDIpO1xuICAgIHRlbXBTdGF0ZS5wdXNoKHRlbXBlcmF0dXJlc1tpXSk7XG4gICAgaSsrO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZGFpbHlGb3JlY2FzdFVJKHsgZGF5cywgaWNvbnMsIG1heHMsIG1pbnMgfSkge1xuICBjb25zdCByb3dzID0gQXJyYXkuZnJvbShcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjd2Vla2x5LWZvcmVjYXN0IC53ZWVrbHktaXRlbScpLFxuICApO1xuICBsZXQgaSA9IDA7XG4gIHJvd3MuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgcm93LnF1ZXJ5U2VsZWN0b3IoJy5kYXknKS5pbm5lclRleHQgPSBkYXlzW2ldO1xuICAgIGljb25TZXR0ZXIocm93LnF1ZXJ5U2VsZWN0b3IoJy5pY29uJyksIGljb25zW2ldKTtcbiAgICAvLyByb3cucXVlcnlTZWxlY3RvcignLmljb24nKS5pbm5lckhUTUwgPSBpY29uc1tpXTtcbiAgICByb3cucXVlcnlTZWxlY3RvcignLm1heCcpLmlubmVyVGV4dCA9IG1heHNbaV0udG9GaXhlZCgyKTtcbiAgICByb3cucXVlcnlTZWxlY3RvcignLm1pbicpLmlubmVyVGV4dCA9IG1pbnNbaV0udG9GaXhlZCgyKTtcbiAgICB0ZW1wU3RhdGUucHVzaChtYXhzW2ldLCBtaW5zW2ldKTtcbiAgICBpKys7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBjdXJyZW50V2VhdGhlclVJLCBkYWlseUZvcmVjYXN0VUksIGhvdXJseUZvcmVjYXN0VUkgfTtcbiIsImltcG9ydCB7IGdldEZvcmVjYXN0IH0gZnJvbSAnLi9nZXRGb3JlY2FzdCc7XG5pbXBvcnQge3NldFRvZ2dsZSwgZGlzYWJsZVRvZ2dsZX0gZnJvbSAnLi90b2dnbGVTdGF0ZSc7XG5pbXBvcnQgeyBjdXJyZW50V2VhdGhlclVJLCBkYWlseUZvcmVjYXN0VUksIGhvdXJseUZvcmVjYXN0VUkgfSBmcm9tICcuL1VJJztcblxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZm9ybVN1Ym1pdEhhbmRsZXIpO1xubGV0IHRlbXBTdGF0ZSA9IFtdO1xuXG5cblxuZnVuY3Rpb24gZm9ybVN1Ym1pdEhhbmRsZXIoZSkge1xuICB0ZW1wU3RhdGUgPSBbXTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybSBpbnB1dCcpLnZhbHVlO1xuICBkaXNhYmxlVG9nZ2xlKCk7XG4gIGdldEZvcmVjYXN0KGNpdHkpLnRoZW4oKHsgaG91cmx5LCBkYWlseSwgY3VycmVudCB9KSA9PiB7XG4gICAgY3VycmVudFdlYXRoZXJVSShjaXR5LCBjdXJyZW50KTtcbiAgICBob3VybHlGb3JlY2FzdFVJKGhvdXJseSk7XG4gICAgZGFpbHlGb3JlY2FzdFVJKGRhaWx5KTtcbiAgICBzZXRUb2dnbGUoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IHRlbXBTdGF0ZSB9O1xuIiwiY29uc3QgQVBJX0tFWSA9ICc4MTI2YjkwNWQ2Yzk5MjEyM2YwMzNlODhlMGMwYmM1OSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEN1cnJlbnRXZWF0aGVyKGNpdHlOYW1lKSB7XG4gIHJldHVybiBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHlOYW1lfSZhcHBpZD0ke0FQSV9LRVl9YCxcbiAgKVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICBkZXNjcmlwdGlvbjogZGF0YS53ZWF0aGVyWzBdLm1haW4sXG4gICAgICAgIHRlbXBlcmF0dXJlOiBkYXRhLm1haW4udGVtcFxuICAgICAgfSk7IFxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHsgZ2V0Q2Vsc2l1c0Zyb21LZWx2aW4gfSBmcm9tICcuL3RlbXAtY29udmVydGVyJztcbmltcG9ydCB7IHRvRGF5IH0gZnJvbSAnLi90b0RheSc7XG5cbmNvbnN0IEFQSV9LRVkgPSAnODEyNmI5MDVkNmM5OTIxMjNmMDMzZTg4ZTBjMGJjNTknO1xuXG5mdW5jdGlvbiBnZXRUaW1lKHV0Yykge1xuICByZXR1cm4gbmV3IERhdGUodXRjICogMTAwMCk7XG59XG5cbmZ1bmN0aW9uIGZldGNoQ29vcmRzKGNpdHlOYW1lKSB7XG4gIHJldHVybiBmZXRjaChcbiAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtjaXR5TmFtZX0mYXBwaWQ9JHtBUElfS0VZfWAsXG4gIClcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgcmV0dXJuIHsgbGF0OiBkYXRhWzBdLmxhdCwgbG9uOiBkYXRhWzBdLmxvbiB9O1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29udGVudChkYXRhKSB7XG4gIHJldHVybiB7XG4gICAgdGltZTogW2dldFRpbWUoZGF0YS5jdXJyZW50LmR0KV0sXG4gICAgaWNvbjogW2RhdGEuY3VycmVudC53ZWF0aGVyWzBdLmljb25dLFxuICAgIHRlbXBlcmF0dXJlOiBbZ2V0Q2Vsc2l1c0Zyb21LZWx2aW4oZGF0YS5jdXJyZW50LnRlbXApXSxcbiAgICBkZXNjcmlwdGlvbjogZGF0YS5jdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb24sXG4gICAgbWF4OiBnZXRDZWxzaXVzRnJvbUtlbHZpbihkYXRhLmRhaWx5WzBdLnRlbXAubWF4KSxcbiAgICBtaW46IGdldENlbHNpdXNGcm9tS2VsdmluKGRhdGEuZGFpbHlbMF0udGVtcC5taW4pLFxuICAgIGRheTogdG9EYXkoZGF0YS5jdXJyZW50LmR0KSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0TmV4dDRIb3VyQ29udGVudChkYXRhKSB7XG4gIGNvbnN0IG5leHQ0SG91cnNEYXRhID0ge1xuICAgIHRpbWVzOiBbXSxcbiAgICBpY29uczogW10sXG4gICAgdGVtcGVyYXR1cmVzOiBbXSxcbiAgfTtcblxuICBkYXRhLmhvdXJseS5zbGljZSgyLCA2KS5mb3JFYWNoKChob3VyRGF0YSkgPT4ge1xuICAgIG5leHQ0SG91cnNEYXRhLnRpbWVzLnB1c2goZ2V0VGltZSgraG91ckRhdGEuZHQpKTtcbiAgICBuZXh0NEhvdXJzRGF0YS5pY29ucy5wdXNoKGhvdXJEYXRhLndlYXRoZXJbMF0uaWNvbik7XG4gICAgbmV4dDRIb3Vyc0RhdGEudGVtcGVyYXR1cmVzLnB1c2goZ2V0Q2Vsc2l1c0Zyb21LZWx2aW4oaG91ckRhdGEudGVtcCkpO1xuICB9KTtcblxuICByZXR1cm4gbmV4dDRIb3Vyc0RhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb3VybHlGb3JlY2FzdChkYXRhKSB7XG4gIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50Q29udGVudChkYXRhKTtcbiAgY29uc3QgbmV4dDRIb3VyID0gZ2V0TmV4dDRIb3VyQ29udGVudChkYXRhKTtcbiAgcmV0dXJuIHtcbiAgICB0aW1lczogY3VycmVudC50aW1lLmNvbmNhdChuZXh0NEhvdXIudGltZXMpLFxuICAgIGljb25zOiBjdXJyZW50Lmljb24uY29uY2F0KG5leHQ0SG91ci5pY29ucyksXG4gICAgdGVtcGVyYXR1cmVzOiBjdXJyZW50LnRlbXBlcmF0dXJlLmNvbmNhdChuZXh0NEhvdXIudGVtcGVyYXR1cmVzKSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERhaWx5Rm9yZWNhc3QoZGF0YSkge1xuICBjb25zdCBuZXh0NURheURhdGEgPSBkYXRhLmRhaWx5LnNsaWNlKDEsIDYpO1xuICBjb25zdCBkYXlzID0gW107XG4gIGNvbnN0IGljb25zID0gW107XG4gIGNvbnN0IG1heHMgPSBbXTtcbiAgY29uc3QgbWlucyA9IFtdO1xuICBuZXh0NURheURhdGEuZm9yRWFjaCgoZGF0YSkgPT4ge1xuICAgIGRheXMucHVzaCh0b0RheShkYXRhLmR0KSk7XG4gICAgaWNvbnMucHVzaChkYXRhLndlYXRoZXJbMF0uaWNvbik7XG4gICAgbWF4cy5wdXNoKGdldENlbHNpdXNGcm9tS2VsdmluKGRhdGEudGVtcC5tYXgpKTtcbiAgICBtaW5zLnB1c2goZ2V0Q2Vsc2l1c0Zyb21LZWx2aW4oZGF0YS50ZW1wLm1pbikpO1xuICB9KTtcbiAgcmV0dXJuIHsgZGF5cywgaWNvbnMsIG1heHMsIG1pbnMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcmVjYXN0KGNpdHlOYW1lKSB7XG4gIHJldHVybiBmZXRjaENvb3JkcyhjaXR5TmFtZSlcbiAgICAudGhlbigoeyBsYXQsIGxvbiB9KSA9PiB7XG4gICAgICByZXR1cm4gZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHtBUElfS0VZfWAsXG4gICAgICApO1xuICAgIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhvdXJseTogZ2V0SG91cmx5Rm9yZWNhc3QoZGF0YSksXG4gICAgICAgIGRhaWx5OiBnZXREYWlseUZvcmVjYXN0KGRhdGEpLFxuICAgICAgICBjdXJyZW50OiBnZXRDdXJyZW50Q29udGVudChkYXRhKSxcbiAgICAgIH07XG4gICAgfSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaWNvblNldHRlcihpbWcsIG5hbWUpIHtcbiAgaW1nLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtuYW1lfUAyeC5wbmdgOyBcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRGYWhyZW5oZWl0RnJvbUNlbHNpdXMoY2Vsc2l1cyl7XG4gICAgcmV0dXJuIChjZWxzaXVzICogKDkuMCAvIDUpKSArIDMyO1xuIH1cbiBcbmV4cG9ydCBmdW5jdGlvbiBnZXRDZWxzaXVzRnJvbUZhaHJlbmhlaXQoZmFocmVuaGVpdCl7XG4gICAgcmV0dXJuIChmYWhyZW5oZWl0IC0gMzIuMCkgKiAoNSAvIDkpO1xuIH1cblxuIGV4cG9ydCBmdW5jdGlvbiBnZXRDZWxzaXVzRnJvbUtlbHZpbihrZWx2aW4pe1xuICAgICByZXR1cm4ga2VsdmluIC0gMjczLjE1OyBcbiB9IiwiZXhwb3J0IGZ1bmN0aW9uIHRvRGF5KHV0Yykge1xuICBjb25zdCBkYXRlVmFsID0gbmV3IERhdGUodXRjICogMTAwMCk7XG4gIGNvbnN0IG9wdGlvbnMgPSB7IHdlZWtkYXk6ICdsb25nJyB9O1xuICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2VuLVVTJywgb3B0aW9ucykuZm9ybWF0KGRhdGVWYWwpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNldFRvZ2dsZSgpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RlbXAtdG9nZ2xlLWNoZWNrJykuZGlzYWJsZWQgPSBmYWxzZTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RlbXAtdG9nZ2xlLWNoZWNrJykuY2hlY2tlZCA9IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVRvZ2dsZSgpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RlbXAtdG9nZ2xlLWNoZWNrJykuZGlzYWJsZWQgPSB0cnVlO1xufVxuIiwiaW1wb3J0IHtcbiAgZ2V0Q2Vsc2l1c0Zyb21GYWhyZW5oZWl0LFxuICBnZXRGYWhyZW5oZWl0RnJvbUNlbHNpdXMsXG59IGZyb20gJy4vdGVtcC1jb252ZXJ0ZXInO1xuXG5pbXBvcnQgeyB0ZW1wU3RhdGUgfSBmcm9tICcuL2Zvcm1IYW5kbGVyJztcblxuY29uc3QgY2hlY2tCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGVtcC10b2dnbGUtY2hlY2snKTtcbmNvbnN0IHRlbXBIb2xkZXJzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVtcCcpKTtcblxuY2hlY2tCb3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdG9nZ2xlVGVtcHMpO1xuXG5mdW5jdGlvbiB0b2dnbGVUZW1wcygpIHtcbiAgY29uc3QgY3VycmVudFRlbXBFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnQtdGVtcCcpO1xuICBsZXQgaSA9IDE7XG4gIGlmIChjaGVja0JveC5jaGVja2VkKSB7XG4gICAgdGVtcEhvbGRlcnMuZm9yRWFjaCgodGVtcEhvbGRlcikgPT4ge1xuICAgICAgdGVtcEhvbGRlci5pbm5lclRleHQgPSBnZXRGYWhyZW5oZWl0RnJvbUNlbHNpdXModGVtcFN0YXRlW2krK10pLnRvRml4ZWQoXG4gICAgICAgIDIsXG4gICAgICApO1xuICAgIH0pO1xuICAgIGN1cnJlbnRUZW1wRWxlbS5pbm5lckhUTUwgPSBgJHtnZXRGYWhyZW5oZWl0RnJvbUNlbHNpdXMoXG4gICAgICArdGVtcFN0YXRlWzBdLFxuICAgICkudG9GaXhlZCgyKX0mZGVnO0ZgO1xuICB9IGVsc2Uge1xuICAgIHRlbXBIb2xkZXJzLmZvckVhY2goKHRlbXBIb2xkZXIpID0+IHtcbiAgICAgIHRlbXBIb2xkZXIuaW5uZXJUZXh0ID0gZ2V0Q2Vsc2l1c0Zyb21GYWhyZW5oZWl0KFxuICAgICAgICArdGVtcEhvbGRlci5pbm5lclRleHQsXG4gICAgICApLnRvRml4ZWQoMik7XG4gICAgfSk7XG4gICAgY3VycmVudFRlbXBFbGVtLmlubmVySFRNTCA9IGAkeygrdGVtcFN0YXRlWzBdKS50b0ZpeGVkKDIpfSZkZWc7Q2A7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgJy4vZ2V0Q3VycmVudFdlYXRoZXInO1xuaW1wb3J0ICcuL2Zvcm1IYW5kbGVyJztcbmltcG9ydCAnLi90b2dnbGVUZW1wJztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXG4gKi9cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxufVxcblxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHsgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBw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RUFFRTs7QUFFRjtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTsrRUFDK0U7O0FBRS9FOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmOztBQUVBOztFQUVFOztBQUVGO0VBQ0UsYUFBYTtBQUNmXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qISBub3JtYWxpemUuY3NzIHY4LjAuMSB8IE1JVCBMaWNlbnNlIHwgZ2l0aHViLmNvbS9uZWNvbGFzL25vcm1hbGl6ZS5jc3MgKi9cXG5cXG4vKiBEb2N1bWVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgbGluZSBoZWlnaHQgaW4gYWxsIGJyb3dzZXJzLlxcbiAqIDIuIFByZXZlbnQgYWRqdXN0bWVudHMgb2YgZm9udCBzaXplIGFmdGVyIG9yaWVudGF0aW9uIGNoYW5nZXMgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTsgLyogMiAqL1xcbn1cXG5cXG4vKiBTZWN0aW9uc1xcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBtYXJnaW4gaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBSZW5kZXIgdGhlIGBtYWluYCBlbGVtZW50IGNvbnNpc3RlbnRseSBpbiBJRS5cXG4gKi9cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBDb3JyZWN0IHRoZSBmb250IHNpemUgYW5kIG1hcmdpbiBvbiBgaDFgIGVsZW1lbnRzIHdpdGhpbiBgc2VjdGlvbmAgYW5kXFxuICogYGFydGljbGVgIGNvbnRleHRzIGluIENocm9tZSwgRmlyZWZveCwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDJlbTtcXG4gIG1hcmdpbjogMC42N2VtIDA7XFxufVxcblxcbi8qIEdyb3VwaW5nIGNvbnRlbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5hIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LVxcbiAqIDIuIEFkZCB0aGUgY29ycmVjdCB0ZXh0IGRlY29yYXRpb24gaW4gQ2hyb21lLCBFZGdlLCBJRSwgT3BlcmEsIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYWJiclt0aXRsZV0ge1xcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTsgLyogMSAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IC8qIDIgKi9cXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lIGRvdHRlZDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGJvcmRlciBvbiBpbWFnZXMgaW5zaWRlIGxpbmtzIGluIElFIDEwLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBSZW1vdmUgdGhlIG1hcmdpbiBpbiBGaXJlZm94IGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0LFxcbm9wdGdyb3VwLFxcbnNlbGVjdCxcXG50ZXh0YXJlYSB7XFxuICBmb250LWZhbWlseTogaW5oZXJpdDsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxMDAlOyAvKiAxICovXFxuICBsaW5lLWhlaWdodDogMS4xNTsgLyogMSAqL1xcbiAgbWFyZ2luOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFNob3cgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqIDEuIFNob3cgdGhlIG92ZXJmbG93IGluIEVkZ2UuXFxuICovXFxuXFxuYnV0dG9uLFxcbmlucHV0IHsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRWRnZSwgRmlyZWZveCwgYW5kIElFLlxcbiAqIDEuIFJlbW92ZSB0aGUgaW5oZXJpdGFuY2Ugb2YgdGV4dCB0cmFuc2Zvcm0gaW4gRmlyZWZveC5cXG4gKi9cXG5cXG5idXR0b24sXFxuc2VsZWN0IHsgLyogMSAqL1xcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXSxcXG5bdHlwZT1cXFwicmVzZXRcXFwiXSxcXG5bdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBkZWZhdWx0IHZlcnRpY2FsIHNjcm9sbGJhciBpbiBJRSAxMCsuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLlxcbiAqIDIuIFJlbW92ZSB0aGUgcGFkZGluZyBpbiBJRSAxMC5cXG4gKi9cXG5cXG5bdHlwZT1cXFwiY2hlY2tib3hcXFwiXSxcXG5bdHlwZT1cXFwicmFkaW9cXFwiXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBwYWRkaW5nOiAwOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGN1cnNvciBzdHlsZSBvZiBpbmNyZW1lbnQgYW5kIGRlY3JlbWVudCBidXR0b25zIGluIENocm9tZS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXFxuW3R5cGU9XFxcIm51bWJlclxcXCJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcXG4gIGhlaWdodDogYXV0bztcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgb2RkIGFwcGVhcmFuY2UgaW4gQ2hyb21lIGFuZCBTYWZhcmkuXFxuICogMi4gQ29ycmVjdCB0aGUgb3V0bGluZSBzdHlsZSBpbiBTYWZhcmkuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogdGV4dGZpZWxkOyAvKiAxICovXFxuICBvdXRsaW5lLW9mZnNldDogLTJweDsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBSZW1vdmUgdGhlIGlubmVyIHBhZGRpbmcgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5hYmlsaXR5IHRvIHN0eWxlIGNsaWNrYWJsZSB0eXBlcyBpbiBpT1MgYW5kIFNhZmFyaS5cXG4gKiAyLiBDaGFuZ2UgZm9udCBwcm9wZXJ0aWVzIHRvIGBpbmhlcml0YCBpbiBTYWZhcmkuXFxuICovXFxuXFxuOjotd2Via2l0LWZpbGUtdXBsb2FkLWJ1dHRvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IGJ1dHRvbjsgLyogMSAqL1xcbiAgZm9udDogaW5oZXJpdDsgLyogMiAqL1xcbn1cXG5cXG4vKiBJbnRlcmFjdGl2ZVxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLypcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBFZGdlLCBJRSAxMCssIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1bW1hcnkge1xcbiAgZGlzcGxheTogbGlzdC1pdGVtO1xcbn1cXG5cXG4vKiBNaXNjXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSAxMCsuXFxuICovXFxuXFxudGVtcGxhdGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgMTAuXFxuICovXFxuXFxuW2hpZGRlbl0ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fIGZyb20gXCIuL2ltYWdlcy9iZy5qcGdcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUxpYnJlK0ZyYW5rbGluOndnaHRAMTAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLmkoX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIC8qIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrOyAqL1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmh0bWwge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlciBmaXhlZDtcXG4gIC13ZWJraXQtYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIC1tb3otYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIC1vLWJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbmJvZHkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZvbnQtZmFtaWx5OiAnTGlicmUgRnJhbmtsaW4nO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGZsZXg6IDE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxMCUgMzAlIDUlIDIwJSAzNSU7XFxufVxcblxcbiN1dGlsaXRpZXMge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN1dGlsaXRpZXMgKiB7XFxuICBmbGV4LWdyb3c6IDE7XFxufVxcblxcbiN1dGlsaXRpZXMgZm9ybSB7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYm9yZGVyLXJhZGl1czogMTByZW07XFxuICBmb250LXNpemU6IDEuMXJlbTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbiAgd2lkdGg6IDgwJTtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG59XFxuXFxuI3V0aWxpdGllcyBmb3JtOmZvY3VzLXdpdGhpbiB7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDAgNHB4IHJnYmEoMjQ1LCAyNDUsIDI0NSwgMC43MDUpLFxcbiAgICAwIDAgNXB4IHJnYmEoOSwgMjUzLCAyMiwgMC45MDQpO1xcbn1cXG5cXG4jdXRpbGl0aWVzIGZvcm0gYnV0dG9uIHtcXG4gIGFsbDogdW5zZXQ7XFxuICBwYWRkaW5nLXJpZ2h0OiAwLjVlbTtcXG4gIGZvbnQtc2l6ZTogMTIwJTtcXG59XFxuXFxuI3V0aWxpdGllcyBmb3JtIGJ1dHRvbjpob3ZlciB7XFxuICBjb2xvcjogdGVhbDtcXG59XFxuXFxuI3V0aWxpdGllcyBpbnB1dFt0eXBlPSd0ZXh0J10ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBub25lO1xcbiAgLW1vei1ib3gtc2hhZG93OiBub25lO1xcbiAgYm94LXNoYWRvdzogbm9uZTtcXG4gIHBhZGRpbmctbGVmdDogMC44cmVtO1xcbiAgcGFkZGluZy10b3A6IDAuMnJlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjJyZW07XFxuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xcbn1cXG5cXG4jdXRpbGl0aWVzIGlucHV0OjpwbGFjZWhvbGRlciB7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbiN1dGlsaXRpZXMgaW5wdXRbdHlwZT0ndGV4dCddOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxufVxcblxcbiN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWJhciB7XFxuICBtYXJnaW4tdG9wOiA3cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDZweDtcXG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDRyZW07XFxuICBtYXgtaGVpZ2h0OiAycmVtO1xcbiAgbWluLWhlaWdodDogMnJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNSwgMjA1LCAyNTUsIDAuMTg1KTtcXG59XFxuXFxuI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtY2hlY2sge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxLjZyZW07XFxuICB3aWR0aDogMS42cmVtO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgbGluZWFyO1xcbiAgei1pbmRleDogMTA7XFxuICB0b3A6IDAuMnJlbTtcXG4gIGxlZnQ6IDAuMnJlbTtcXG59XFxuXFxuI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtY2hlY2s6Y2hlY2tlZCB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMnJlbSk7XFxufVxcblxcbiN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWxhYmVsIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIG1heC1oZWlnaHQ6IDJyZW07XFxuICBtaW4taGVpZ2h0OiAycmVtO1xcbiAgd2lkdGg6IDRyZW07XFxuICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7ICovXFxufVxcblxcbiN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWxhYmVsIGRpdiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDFyZW07XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIHBhZGRpbmc6IDAgNXB4O1xcbn1cXG5cXG4jdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1sYWJlbCBkaXY6bGFzdC1jaGlsZCB7XFxuICByaWdodDogMDtcXG59XFxuXFxuI2N1cnJlbnQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcblxcbn1cXG5cXG4jY3VycmVudCAjY2l0eSB7XFxuICBmb250LXNpemU6IDMuNXJlbTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuXFxufVxcblxcbiNjdXJyZW50ICNkZXMge1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxufVxcblxcbiNjdXJyZW50ICNjdXJyZW50LXRlbXAge1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDQwcHg7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuI3RvZGF5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuI3RvZGF5LWZvcmVjYXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcblxcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcblxcbiN0b2RheS1mb3JlY2FzdCAudG9kYXktaXRlbSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxNSUgNDUlIDE1JTtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgICd0aW1lJ1xcbiAgICAnaW1nJ1xcbiAgICAndGVtcCc7XFxuICBwbGFjZS1pdGVtczogY2VudGVyIGNlbnRlcjtcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuI3RvZGF5LWZvcmVjYXN0IC50b2RheS1pdGVtIGltZyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGdyaWQtYXJlYTogaW1nO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IDEwMCU7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgLyogdHJhbnNmb3JtOiBzY2FsZSgwLjkpOyAqL1xcbn1cXG5cXG4jd2Vla2x5LWZvcmVjYXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIFxcbn1cXG5cXG4jd2Vla2x5LWZvcmVjYXN0IC53ZWVrbHktaXRlbSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAyMCU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuLndlZWtseS1pdGVtIGRpdjpmaXJzdC1jaGlsZCB7XFxuICB3aWR0aDogMTglO1xcbn1cXG5cXG5cXG4ud2Vla2x5LWl0ZW0gZGl2Omxhc3QtY2hpbGQge1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcblxcbn1cXG5cXG5cXG4ud2Vla2x5LWl0ZW0gaW1nIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC44KTtcXG59XFxuXFxuLyogLy8gU21hbGwgZGV2aWNlcyAobGFuZHNjYXBlIHBob25lcywgNTc2cHggYW5kIHVwKSAqL1xcbkBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xcbiAgI3V0aWxpdGllcyBmb3JtIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IC0yMDBweDtcXG4gIH1cXG5cXG4gIC53ZWVrbHktaXRlbSBkaXY6bGFzdC1jaGlsZCB7XFxuICAgIHBhZGRpbmctbGVmdDogMzBweDt9XFxufVxcblxcbi8qIC8vIE1lZGl1bSBkZXZpY2VzICh0YWJsZXRzLCA3NjhweCBhbmQgdXApICovXFxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMCwgMC4xMyk7ICovXFxuICAgIG1hcmdpbjogMCA2MHB4O1xcbiAgfVxcbiAgI3V0aWxpdGllcyBmb3JtIHtcXG4gICAgd2lkdGg6IDQwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IC00MDBweDtcXG4gIH1cXG5cXG4gICN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWJhciB7XFxuICAgIG1hcmdpbi1yaWdodDogMzBweDtcXG4gIH1cXG59XFxuXFxuLyogLy8gTGFyZ2UgZGV2aWNlcyAoZGVza3RvcHMsIDk5MnB4IGFuZCB1cCkgKi9cXG5AbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcXG4gIC5jb250YWluZXIge1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAwLCAwLjEzKTsgKi9cXG4gICAgbWFyZ2luOiAwIDE1MHB4O1xcbiAgfVxcblxcblxcbiAgI3V0aWxpdGllcyBmb3JtIHtcXG4gICAgbWFyZ2luLWxlZnQ6IC04MDBweDtcXG4gICAgd2lkdGg6IDQwJTtcXG4gIH1cXG5cXG4gICN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWJhciB7XFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG4gIH1cXG4gIC53ZWVrbHktaXRlbSBkaXY6bGFzdC1jaGlsZCB7XFxuICAgIHBhZGRpbmctbGVmdDogNTBweDt9XFxufVxcblxcbi8qIC8vIFgtTGFyZ2UgZGV2aWNlcyAobGFyZ2UgZGVza3RvcHMsIDEyMDBweCBhbmQgdXApICovXFxuQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIDAuMTMpOyAqL1xcbiAgICBtYXJnaW46IDAgMjAwcHg7XFxuICB9XFxuICAjdXRpbGl0aWVzIGZvcm0ge1xcbiAgICBtYXJnaW4tbGVmdDogLTE1MHB4O1xcbiAgICB3aWR0aDogMzUlO1xcbiAgICBhbGlnbi1zZWxmOiBmbGV4LXN0YXJ0O1xcbiAgfVxcblxcbiAgLndlZWtseS1pdGVtIGRpdjpmaXJzdC1jaGlsZCB7XFxuICAgIHdpZHRoOiAxMCU7XFxuICB9XFxufVxcblxcbi8qIC8vIFhYLUxhcmdlIGRldmljZXMgKGxhcmdlciBkZXNrdG9wcywgMTQwMHB4IGFuZCB1cCkgKi9cXG5AbWVkaWEgKG1pbi13aWR0aDogMTQwMHB4KSB7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBR0E7RUFDRSw2QkFBNkI7RUFDN0IsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxpRkFBOEQ7RUFDOUQsOEJBQThCO0VBQzlCLDJCQUEyQjtFQUMzQix5QkFBeUI7RUFDekIsc0JBQXNCO0FBQ3hCOztBQUVBOztFQUVFLGFBQWE7RUFDYixnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsT0FBTztFQUNQLGFBQWE7RUFDYixzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isb0JBQW9CO0VBQ3BCLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLFVBQVU7RUFDVixlQUFlO0FBQ2pCOztBQUVBO0VBQ0U7bUNBQ2lDO0FBQ25DOztBQUVBO0VBQ0UsVUFBVTtFQUNWLG9CQUFvQjtFQUNwQixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsWUFBWTtFQUNaLHNCQUFzQjtFQUN0Qiw2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dHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TGlicmUrRnJhbmtsaW46d2dodEAxMDAmZGlzcGxheT1zd2FwJyk7XFxuQGltcG9ydCAnfm5vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzcyc7XFxuXFxuKiB7XFxuICAvKiBib3JkZXI6IDFweCBzb2xpZCBibGFjazsgKi9cXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5odG1sIHtcXG4gIGJhY2tncm91bmQ6IHVybCguL2ltYWdlcy9iZy5qcGcpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyIGZpeGVkO1xcbiAgLXdlYmtpdC1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgLW1vei1iYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgLW8tYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbmh0bWwsXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZm9udC1mYW1pbHk6ICdMaWJyZSBGcmFua2xpbic7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgZmxleDogMTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDEwJSAzMCUgNSUgMjAlIDM1JTtcXG59XFxuXFxuI3V0aWxpdGllcyB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI3V0aWxpdGllcyAqIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG59XFxuXFxuI3V0aWxpdGllcyBmb3JtIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBib3JkZXItcmFkaXVzOiAxMHJlbTtcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxuICB3aWR0aDogODAlO1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG5cXG4jdXRpbGl0aWVzIGZvcm06Zm9jdXMtd2l0aGluIHtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMCA0cHggcmdiYSgyNDUsIDI0NSwgMjQ1LCAwLjcwNSksXFxuICAgIDAgMCA1cHggcmdiYSg5LCAyNTMsIDIyLCAwLjkwNCk7XFxufVxcblxcbiN1dGlsaXRpZXMgZm9ybSBidXR0b24ge1xcbiAgYWxsOiB1bnNldDtcXG4gIHBhZGRpbmctcmlnaHQ6IDAuNWVtO1xcbiAgZm9udC1zaXplOiAxMjAlO1xcbn1cXG5cXG4jdXRpbGl0aWVzIGZvcm0gYnV0dG9uOmhvdmVyIHtcXG4gIGNvbG9yOiB0ZWFsO1xcbn1cXG5cXG4jdXRpbGl0aWVzIGlucHV0W3R5cGU9J3RleHQnXSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IG5vbmU7XFxuICAtbW96LWJveC1zaGFkb3c6IG5vbmU7XFxuICBib3gtc2hhZG93OiBub25lO1xcbiAgcGFkZGluZy1sZWZ0OiAwLjhyZW07XFxuICBwYWRkaW5nLXRvcDogMC4ycmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDAuMnJlbTtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XFxufVxcblxcbiN1dGlsaXRpZXMgaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuI3V0aWxpdGllcyBpbnB1dFt0eXBlPSd0ZXh0J106Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtYmFyIHtcXG4gIG1hcmdpbi10b3A6IDdweDtcXG4gIG1hcmdpbi1yaWdodDogNnB4O1xcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogNHJlbTtcXG4gIG1heC1oZWlnaHQ6IDJyZW07XFxuICBtaW4taGVpZ2h0OiAycmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1LCAyMDUsIDI1NSwgMC4xODUpO1xcbn1cXG5cXG4jdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1jaGVjayB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDEuNnJlbTtcXG4gIHdpZHRoOiAxLjZyZW07XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBsaW5lYXI7XFxuICB6LWluZGV4OiAxMDtcXG4gIHRvcDogMC4ycmVtO1xcbiAgbGVmdDogMC4ycmVtO1xcbn1cXG5cXG4jdXRpbGl0aWVzICN0ZW1wLXRvZ2dsZS1jaGVjazpjaGVja2VkIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgycmVtKTtcXG59XFxuXFxuI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtbGFiZWwge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbWF4LWhlaWdodDogMnJlbTtcXG4gIG1pbi1oZWlnaHQ6IDJyZW07XFxuICB3aWR0aDogNHJlbTtcXG4gIC8qIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTsgKi9cXG59XFxuXFxuI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtbGFiZWwgZGl2IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMXJlbTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgcGFkZGluZzogMCA1cHg7XFxufVxcblxcbiN1dGlsaXRpZXMgI3RlbXAtdG9nZ2xlLWxhYmVsIGRpdjpsYXN0LWNoaWxkIHtcXG4gIHJpZ2h0OiAwO1xcbn1cXG5cXG4jY3VycmVudCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuXFxufVxcblxcbiNjdXJyZW50ICNjaXR5IHtcXG4gIGZvbnQtc2l6ZTogMy41cmVtO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG5cXG59XFxuXFxuI2N1cnJlbnQgI2RlcyB7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuXFxuI2N1cnJlbnQgI2N1cnJlbnQtdGVtcCB7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4jdG9kYXkge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4jdG9kYXktZm9yZWNhc3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxuXFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuI3RvZGF5LWZvcmVjYXN0IC50b2RheS1pdGVtIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDE1JSA0NSUgMTUlO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgJ3RpbWUnXFxuICAgICdpbWcnXFxuICAgICd0ZW1wJztcXG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXIgY2VudGVyO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4jdG9kYXktZm9yZWNhc3QgLnRvZGF5LWl0ZW0gaW1nIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZ3JpZC1hcmVhOiBpbWc7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LWhlaWdodDogMTAwJTtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICAvKiB0cmFuc2Zvcm06IHNjYWxlKDAuOSk7ICovXFxufVxcblxcbiN3ZWVrbHktZm9yZWNhc3Qge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgXFxufVxcblxcbiN3ZWVrbHktZm9yZWNhc3QgLndlZWtseS1pdGVtIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDIwJTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG4ud2Vla2x5LWl0ZW0gZGl2OmZpcnN0LWNoaWxkIHtcXG4gIHdpZHRoOiAxOCU7XFxufVxcblxcblxcbi53ZWVrbHktaXRlbSBkaXY6bGFzdC1jaGlsZCB7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuXFxufVxcblxcblxcbi53ZWVrbHktaXRlbSBpbWcge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xcbn1cXG5cXG4vKiAvLyBTbWFsbCBkZXZpY2VzIChsYW5kc2NhcGUgcGhvbmVzLCA1NzZweCBhbmQgdXApICovXFxuQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSB7XFxuICAjdXRpbGl0aWVzIGZvcm0ge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBtYXJnaW4tbGVmdDogLTIwMHB4O1xcbiAgfVxcblxcbiAgLndlZWtseS1pdGVtIGRpdjpsYXN0LWNoaWxkIHtcXG4gICAgcGFkZGluZy1sZWZ0OiAzMHB4O31cXG59XFxuXFxuLyogLy8gTWVkaXVtIGRldmljZXMgKHRhYmxldHMsIDc2OHB4IGFuZCB1cCkgKi9cXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIC5jb250YWluZXIge1xcbiAgICAvKiBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAwLCAwLjEzKTsgKi9cXG4gICAgbWFyZ2luOiAwIDYwcHg7XFxuICB9XFxuICAjdXRpbGl0aWVzIGZvcm0ge1xcbiAgICB3aWR0aDogNDAlO1xcbiAgICBtYXJnaW4tbGVmdDogLTQwMHB4O1xcbiAgfVxcblxcbiAgI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtYmFyIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xcbiAgfVxcbn1cXG5cXG4vKiAvLyBMYXJnZSBkZXZpY2VzIChkZXNrdG9wcywgOTkycHggYW5kIHVwKSAqL1xcbkBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkge1xcbiAgLmNvbnRhaW5lciB7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIDAuMTMpOyAqL1xcbiAgICBtYXJnaW46IDAgMTUwcHg7XFxuICB9XFxuXFxuXFxuICAjdXRpbGl0aWVzIGZvcm0ge1xcbiAgICBtYXJnaW4tbGVmdDogLTgwMHB4O1xcbiAgICB3aWR0aDogNDAlO1xcbiAgfVxcblxcbiAgI3V0aWxpdGllcyAjdGVtcC10b2dnbGUtYmFyIHtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbiAgfVxcbiAgLndlZWtseS1pdGVtIGRpdjpsYXN0LWNoaWxkIHtcXG4gICAgcGFkZGluZy1sZWZ0OiA1MHB4O31cXG59XFxuXFxuLyogLy8gWC1MYXJnZSBkZXZpY2VzIChsYXJnZSBkZXNrdG9wcywgMTIwMHB4IGFuZCB1cCkgKi9cXG5AbWVkaWEgKG1pbi13aWR0aDogMTIwMHB4KSB7XFxuICAuY29udGFpbmVyIHtcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMCwgMC4xMyk7ICovXFxuICAgIG1hcmdpbjogMCAyMDBweDtcXG4gIH1cXG4gICN1dGlsaXRpZXMgZm9ybSB7XFxuICAgIG1hcmdpbi1sZWZ0OiAtMTUwcHg7XFxuICAgIHdpZHRoOiAzNSU7XFxuICAgIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XFxuICB9XFxuXFxuICAud2Vla2x5LWl0ZW0gZGl2OmZpcnN0LWNoaWxkIHtcXG4gICAgd2lkdGg6IDEwJTtcXG4gIH1cXG59XFxuXFxuLyogLy8gWFgtTGFyZ2UgZGV2aWNlcyAobGFyZ2VyIGRlc2t0b3BzLCAxNDAwcHggYW5kIHVwKSAqL1xcbkBtZWRpYSAobWluLXdpZHRoOiAxNDAwcHgpIHtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciAmJiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdKTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pIHtcbiAgdmFyIF9pdGVtID0gX3NsaWNlZFRvQXJyYXkoaXRlbSwgNCksXG4gICAgICBjb250ZW50ID0gX2l0ZW1bMV0sXG4gICAgICBjc3NNYXBwaW5nID0gX2l0ZW1bM107XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBvcHRpb25zID0ge307XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlLCBuby1wYXJhbS1yZWFzc2lnblxuXG5cbiAgdXJsID0gdXJsICYmIHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmw7XG5cbiAgaWYgKHR5cGVvZiB1cmwgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl0vLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgY29udGVudC5sb2NhbHMgfHwge307IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc09sZElFID0gZnVuY3Rpb24gaXNPbGRJRSgpIHtcbiAgdmFyIG1lbW87XG4gIHJldHVybiBmdW5jdGlvbiBtZW1vcml6ZSgpIHtcbiAgICBpZiAodHlwZW9mIG1lbW8gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuICAgICAgLy8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuICAgICAgLy8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuICAgICAgLy8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG4gICAgICAvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcbiAgICAgIG1lbW8gPSBCb29sZWFuKHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn0oKTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uIGdldFRhcmdldCgpIHtcbiAgdmFyIG1lbW8gPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKHRhcmdldCkge1xuICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVtb1t0YXJnZXRdO1xuICB9O1xufSgpO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgdmFyIGF0dHJpYnV0ZXMgPSBvcHRpb25zLmF0dHJpYnV0ZXMgfHwge307XG5cbiAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVzLm5vbmNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gJ3VuZGVmaW5lZCcgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgICBpZiAobm9uY2UpIHtcbiAgICAgIGF0dHJpYnV0ZXMubm9uY2UgPSBub25jZTtcbiAgICB9XG4gIH1cblxuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICB9KTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQob3B0aW9ucy5pbnNlcnQgfHwgJ2hlYWQnKTtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICAgIH1cblxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gIH1cblxuICByZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbnZhciByZXBsYWNlVGV4dCA9IGZ1bmN0aW9uIHJlcGxhY2VUZXh0KCkge1xuICB2YXIgdGV4dFN0b3JlID0gW107XG4gIHJldHVybiBmdW5jdGlvbiByZXBsYWNlKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcbiAgfTtcbn0oKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5tZWRpYSA/IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIikuY29uY2F0KG9iai5jc3MsIFwifVwiKSA6IG9iai5jc3M7IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfVxuXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUucmVtb3ZlQXR0cmlidXRlKCdtZWRpYScpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXdMaXN0KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRvbVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5Eb21bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5Eb20uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9tb2R1bGVzL3V0aWxzJztcbmltcG9ydCAnLi9pbmRleC5jc3MnO1xuaW1wb3J0IHsgZ2V0Rm9yZWNhc3QgfSBmcm9tICcuL21vZHVsZXMvZ2V0Rm9yZWNhc3QnO1xuaW1wb3J0IHtcbiAgY3VycmVudFdlYXRoZXJVSSxcbiAgaG91cmx5Rm9yZWNhc3RVSSxcbiAgZGFpbHlGb3JlY2FzdFVJLFxufSBmcm9tICcuL21vZHVsZXMvVUknO1xuXG5pbXBvcnQgeyBzZXRUb2dnbGUsIGRpc2FibGVUb2dnbGUgfSBmcm9tICcuL21vZHVsZXMvdG9nZ2xlU3RhdGUnO1xuXG5mdW5jdGlvbiBpbml0aWFsU3RhdGUoKSB7XG4gIGNvbnN0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtIGlucHV0JykudmFsdWU7XG4gIGRpc2FibGVUb2dnbGUoKTtcbiAgZ2V0Rm9yZWNhc3QoY2l0eSkudGhlbigoeyBob3VybHksIGRhaWx5LCBjdXJyZW50IH0pID0+IHtcbiAgICBjdXJyZW50V2VhdGhlclVJKGNpdHksIGN1cnJlbnQpO1xuICAgIGhvdXJseUZvcmVjYXN0VUkoaG91cmx5KTtcbiAgICBkYWlseUZvcmVjYXN0VUkoZGFpbHkpO1xuICAgIHNldFRvZ2dsZSgpO1xuICB9KTtcbn1cblxuaW5pdGlhbFN0YXRlKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==