import React, { useState } from 'react';
import LocationTypeahead from './location-typeahead';
// import TrackedCities from './tracked-cities'
import {
  waitForIt,
  toLowerCase,
} from './utils';
import locationApi from '../api';

import './style/landing.css';

const Landing = () => {
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedCities, addCity] = useState([]);
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setQuery(value);
    setShowHelp(false);
    setSuggestions([]);
    if (value === '') {
      return;
    }

    setLoading(true);
    waitForIt(() => {
      locationApi.locations(query).then(data => {
        setSuggestions(data);
        setLoading(false);
        setShowHelp(true);
      });
    });
  };

  const onSubmit = selection => {
    setQuery(selection);
    if (!selectedCities.map(toLowerCase).includes(toLowerCase(selection))) {
      addCity(prev => [...prev, selection]);
    }

    setSuggestions([]);
    setShowHelp(false);
    setLoading(false);
  };

  return (
    <div className="weatha-selekta____landing">
      <h1>Add cities to track weather</h1>
      {/* I went with this quick help text instead of forcing user to select from the dropdown
        * probably more of a "product" decision anyway
        */}
      {showHelp && <small>press enter if the first match is right or use the drop down for more matches</small>}
      <LocationTypeahead
        suggestions={suggestions}
        query={query}
        onSubmit={onSubmit}
        handleChange={handleChange}
      />
      {isLoading && <div>searching for location matches</div>}
      {/* {selectedCities.length > 0 && <TrackedCities cities={selectedCities} />} */}
    </div>
  );
};


export default Landing;
