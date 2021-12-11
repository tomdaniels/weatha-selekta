import React, { useEffect, useState } from 'react';
import LocationTypeahead from './location-typeahead';
// import TrackedCities from './tracked-cities'
import {
  waitForIt,
  toLowerCase,
  storageFactory,
} from '../utils';
import locationApi from '../api';

import './style/landing.css';

const WEATHER_STORAGE_KEY = 'cities';
const storage = storageFactory({
  name: 'weatha-selekta',
  driver: 'localStorage',
});

const Landing = () => {
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [selectedCities, addCity] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (storage.has(WEATHER_STORAGE_KEY)) {
      addCity(storage.get(WEATHER_STORAGE_KEY));
    }
  // only run prefill on first render
  }, []);

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
      storage.set(WEATHER_STORAGE_KEY, selectedCities.concat([selection]));
      addCity(prev => [...prev, selection]);
    }

    setSuggestions([]);
    setShowHelp(false);
    setLoading(false);
  };

  return (
    <div className="weatha-selekta____landing">
      <h1>Add cities to track weather</h1>
      {showHelp && (
        <small>
          {typeof suggestions === 'undefined'
            ? 'Hmm, no results, are you sure you spelt that correctly'
            : 'press enter if the first match is right or use the drop down for more matches'}
        </small>
      )}
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
