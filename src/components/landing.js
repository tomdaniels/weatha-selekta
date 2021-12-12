import React, { useEffect, useState } from 'react';
import negate from 'lodash/negate';
import LocationTypeahead from './location-typeahead';
import TrackedCities from './tracked-cities';
import locationApi from '../api';
import {
  debounce,
  findMatch,
  storageFactory,
} from '../utils';

import './style/landing.css';

const storage = storageFactory({
  name: 'weatha-selekta',
  driver: 'localStorage',
});

const TRACKED_CITIES_STORAGE_KEY = 'cities';

const Landing = () => {
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [trackedCities, setTrackedCities] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (storage.has(TRACKED_CITIES_STORAGE_KEY)) {
      setTrackedCities(storage.get(TRACKED_CITIES_STORAGE_KEY));
    }
  // only run prefill on first render
  }, []);

  const resetFormState = () => {
    setHasError(false);
    setSuggestions([]);
  };

  const handleChange = e => {
    const { value } = e.target;
    resetFormState();
    setQuery(value);
    if (value === '') {
      return;
    }

    setLoading(true);
    debounce(() => {
      locationApi.locations(query).then(data => {
        setSuggestions(data);
        setLoading(false);
      });
    });
  };

  const onSubmit = selection => {
    resetFormState();
    setQuery(selection);

    const alreadyTracked = trackedCities.map(findMatch(selection));
    if (alreadyTracked) {
      debounce(() => {
        locationApi.getForecast(selection).then(data => {
          if (typeof data === 'undefined') {
            setHasError(true);
            return;
          }

          const locationWeather = { location: selection, weather: { ...data } };
          storage.set(TRACKED_CITIES_STORAGE_KEY, trackedCities.concat(locationWeather));
          setTrackedCities(prev => [...prev, locationWeather]);
        });
      });
    }
  };

  const handleRemove = city => {
    const filtered = trackedCities.filter(negate(findMatch(city.location)));
    storage.set(TRACKED_CITIES_STORAGE_KEY, filtered);
    setTrackedCities(filtered);
  };

  return (
    <div className="weatha-selekta____landing">
      <h1>Add cities to track weather</h1>
      <LocationTypeahead
        suggestions={suggestions}
        query={query}
        onSubmit={onSubmit}
        handleChange={handleChange}
      />
      {isLoading && <div>searching for location matches</div>}
      {hasError && <pre>Hmm, something went wrong, please try that one again..</pre>}
      {trackedCities.length > 0 && (
        <TrackedCities cities={trackedCities} onRemove={handleRemove} />
      )}
    </div>
  );
};


export default Landing;
