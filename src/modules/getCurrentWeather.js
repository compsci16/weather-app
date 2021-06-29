const API_KEY = '8126b905d6c992123f033e88e0c0bc59';

export default function getCurrentWeather(cityName) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`,
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return Promise.resolve({
        description: data.weather[0].main,
        temperature: data.main.temp
      }); 
    });
}
