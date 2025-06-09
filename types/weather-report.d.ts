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
