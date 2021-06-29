export function getFahrenheitFromCelsius(celsius){
    return (celsius * (9.0 / 5)) + 32;
 }
 
export function getCelsiusFromFahrenheit(fahrenheit){
    return (fahrenheit - 32.0) * (5 / 9);
 }

 export function getCelsiusFromKelvin(kelvin){
     return kelvin - 273.15; 
 }