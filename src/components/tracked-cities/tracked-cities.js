import React from 'react';
import PropTypes from 'prop-types';
import CurrentWeather from './current-weather';

import '../style/tracked-cities.css';

const TrackedCities = ({ cities, onRemove }) => (
  <section className="weatha-selekta__tracked-cities-wrapper">
    {cities.map((city, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <div className="weatha-selekta__tracked-city-card" key={`${idx}-${city.location}`}>
        <h2 className="weatha-selekta__tracked-city-title">{city.location}</h2>
        <CurrentWeather weather={city.weather} />
        <button
          className="weatha-selekta__remove-tracked-city-button"
          onClick={() => onRemove(city.location)}
        >
          remove city
        </button>
      </div>
    ))}
  </section>
);

TrackedCities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string,
    weather: PropTypes.shape({}),
  })).isRequired,
  onRemove: PropTypes.func,
};

TrackedCities.defaultProps = {
  onRemove: () => {},
};

export default TrackedCities;
