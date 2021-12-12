import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const CurrentWeather = ({ weather }) => (
  <div className="forecaster__forecast-summary">
    <img src={weather.currentConditions.icon} alt={weather.currentConditions.icon} />
    <p>{weather.currentConditions.text} - currently: {weather.temp}</p>
  </div>
);

CurrentWeather.propTypes = {
  weather: PropTypes.shape({
    temp: PropTypes.number,
    currentConditions: PropTypes.shape({
      text: PropTypes.string,
      icon: PropTypes.string,
    }),
  }).isRequired,
};

export default CurrentWeather;
