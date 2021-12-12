import React, { useEffect, useState } from 'react';
import LocationTypeahead from './location-typeahead';
import TrackedCities from './tracked-cities';
import {
  waitForIt,
  toLowerCase,
  storageFactory,
} from '../utils';
import locationApi from '../api';

import './style/landing.css';

const storage = storageFactory({
  name: 'weatha-selekta',
  driver: 'localStorage',
});

const TRACKED_CITIES_STORAGE_KEY = 'cities';

const Landing = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [trackedCities, setTrackedCities] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (storage.has(TRACKED_CITIES_STORAGE_KEY)) {
      setTrackedCities(storage.get(TRACKED_CITIES_STORAGE_KEY));
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
    setSuggestions([]);
    setShowHelp(false);
    setLoading(false);
    setQuery(selection);

    const alreadyTracked = trackedCities.map(v => toLowerCase(v.location)).includes(toLowerCase(selection));
    if (!alreadyTracked) {
      waitForIt(() => {
        locationApi.getForecast(selection).then(data => {
          const weatherSet = { location: selection, weather: { ...data } };
          storage.set(TRACKED_CITIES_STORAGE_KEY, trackedCities.concat(weatherSet));
          setTrackedCities(prev => [...prev, weatherSet]);
        });
      });
    }
  };

  const handleRemove = city => {
    const filtered = trackedCities.filter(v => toLowerCase(v.location) !== toLowerCase(city.location));
    storage.set(TRACKED_CITIES_STORAGE_KEY, filtered);
    setTrackedCities(filtered);
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
      {trackedCities.length > 0 && (
        <TrackedCities
          cities={trackedCities}
          removeCity={handleRemove}
        />
      )}
    </div>
  );
};


export default Landing;
