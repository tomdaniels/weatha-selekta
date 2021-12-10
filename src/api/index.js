import isEmpty from 'lodash/isEmpty';
import fetch from './fetch';

const signed = (url, key) => `${url}?key=${key}`;

// lets pretend this came from the server with our secret hidden ;)
const API_KEY = '89ef7791ec1448f9a4a53300210612';
const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1';
const WEATHER_AUTOCOMPLETE_ENDPOINT = signed(`${WEATHER_API_BASE_URL}/search.json`, API_KEY);
const WEATHER_FORECAST_ENDPOINT = signed(`${WEATHER_API_BASE_URL}/forecast.json`, API_KEY);

const nameOnly = collec => collec.name;

export default {
  async locations(query) {
    const apiUrl = `${WEATHER_AUTOCOMPLETE_ENDPOINT}&q=${query}`;
    const response = await fetch(apiUrl);

    return isEmpty(response)
      ? undefined
      : response?.map(nameOnly);
  },

  async getForecast(location) {
    const apiUrl = `${WEATHER_FORECAST_ENDPOINT}&q=${encodeURIComponent(location)}`;
    const response = await fetch(apiUrl);

    return isEmpty(response)
      ? undefined
      : response;
  },
};
