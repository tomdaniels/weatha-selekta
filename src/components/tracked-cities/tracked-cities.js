import React from 'react';
import PropTypes from 'prop-types';
import CurrentWeather from './current-weather';

import '../style/tracked-cities.css';

const TrackedCities = ({ cities, onRemove }) => (
  <section className="weatha-selekta__tracked-cities-wrapper">
    {cities.map((city, idx) => (
      <div className="weatha-selekta__tracked-city-card">
        {/* eslint-disable-next-line react/no-array-index-key */}
        <div key={`${idx}-${city.location}`}>{city.location}</div>
        <CurrentWeather weather={city.weather} />
        <button
          className="weatha-selekta__remove-tracked-city-button"
          onClick={() => onRemove(city)}
        >
          remove city
        </button>
      </div>
    ))}
  </section>
);

TrackedCities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemove: PropTypes.func,
  currentConditions: PropTypes.shape({
    text: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

TrackedCities.defaultProps = {
  onRemove: () => {},
};

export default TrackedCities;
