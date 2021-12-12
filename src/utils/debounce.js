import debounce from 'lodash/debounce';

/**
 * this is a wrapper so that we can envoke the returned function
 * from debounce and use its magic on very select pieces of logic
 */
const waitForIt = debounce(cb => cb(), 1000);

export default waitForIt;
