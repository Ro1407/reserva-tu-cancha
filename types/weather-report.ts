/**
 * This interface defines the structure of a weather report object.
 * It includes properties for the weather description, date, rain probability, wind speed, and cloud cover.
 * @interface WeatherReport
 *
 * @property {string} date - The date of the weather report in YYYY/MM/DD format.
 * @property {string} state - The weather state, which can be one of the following:
 *   - "Soleado" (Sunny)
 *   - "Nublado" (Cloudy)
 *   - "Lluvioso" (Rainy)
 *   - "Tormentoso" (Stormy)
 *   - "Ventoso" (Windy)
 * @property {number} temperature - The temperature in degrees Celsius.
 * @property {number} rain - The probability of rain as a percentage.
 * @property {number} wind - The wind speed in kilometers per hour.
 * @property {number} clouds - The percentage of cloud cover.
 * @property {string} description - A brief description of the weather conditions.
 */
export interface WeatherReport {
  date: string;
  state: "Soleado" | "Nublado" | "Lluvioso" | "Tormentoso" | "Ventoso";
  temperature: number;
  rain: number;
  wind: number;
  clouds: number;
  description: string;
}

/**
 * This interface defines the structure of a coordinates object.
 * It includes properties for latitude and longitude.
 * @interface Coordinates
 *
 * @property {number} latitude - The latitude of the location.
 * @property {number} longitude - The longitude of the location.
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * This interface defines the structure of raw weather data returned by an API.
 * It includes hourly weather data such as time, temperature, precipitation, cloud cover, and wind speed.
 * @interface RawWeatherData
 *
 * @property {Object} hourly - An object containing hourly weather data.
 * @property {string[]} hourly.time - An array of timestamps for each hour.
 * @property {number[]} hourly.temperature_2m - An array of temperatures in degrees Celsius for each hour.
 * @property {number[]} hourly.precipitation - An array of precipitation amounts in millimeters for each hour.
 * @property {number[]} hourly.cloudcover - An array of cloud cover percentages for each hour.
 * @property {number[]} hourly.windspeed_10m - An array of wind speeds in kilometers per hour for each hour.
 */
export interface RawWeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    cloudcover: number[];
    windspeed_10m: number[];
  };
}
