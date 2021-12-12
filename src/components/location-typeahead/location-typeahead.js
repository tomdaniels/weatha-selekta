import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import '../style/location-typeahead.css';

const LocationTypeahead = ({
  query, suggestions, handleChange, onSubmit,
}) => {
  const selectRef = useRef(null);
  const handleKeyDown = event => {
    if (selectRef.current && event.key === 'ArrowDown') {
      selectRef.current.focus();
    }
  };

  return (
    <form
      className="weatha-selekta__location-typeahead"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(query);
      }}
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search city name"
      />
      {suggestions?.length > 0 && (
      <select ref={selectRef} id="typeahead" onChange={event => onSubmit(event.target.value)}>
        <option>Please select your location from below:</option>
        {suggestions.map((city, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={`${city}-${idx}`}>{city}</option>))}
      </select>
        )}
    </form>
  );
};

LocationTypeahead.propTypes = {
  query: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

LocationTypeahead.defaultProps = {
  query: '',
  suggestions: [],
  handleChange: () => {},
  onSubmit: () => {},
};

export default LocationTypeahead;
