import React, { useRef } from 'react';

import '../style/location-typeahead.css';

const locationTypeahead = ({
  query, handleChange, suggestions, onSubmit,
}) => {
  const selectRef = useRef(null);
  const handleKeyDown = event => {
    if (event.key === 'ArrowDown') {
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
        {suggestions.map((city, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={`${city}-${idx}`}>{city}</option>))}
      </select>
        )}
    </form>
  );
};

export default locationTypeahead;
