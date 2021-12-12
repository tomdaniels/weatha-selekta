/**
 * Creates a [localStorage | sessionStorage] object with
 * with read and write methods wrapped with error handling
 * and parsing
 *
 * @alias storage
 * @namespace storage
 * @param {Object} [options] - config
 * @param {string} [options.name] - namespace
 * @param {string} [options.driver=localStorage|sessionStorage] - storage type
 *
 * @example
 *
 * const store = storageFactory({ ...options });
 *
 */
function createInstance({ driver, name }) {
  const config = { driver, name };
  let storage;

  try {
    storage = typeof window === 'undefined' ? {} : window[driver];
  } catch (error) {
    console.error(driver, error);
  }

  config.prefix = `${name}/`;
  return {
    storage,

    get(key) {
      let result;

      try {
        result = storage.getItem(`${config.prefix}${key}`);
      } catch (err) {
        result = null;
      }

      if (result) {
        result = JSON.parse(result);
      }

      return result;
    },

    has(key) {
      let result;

      try {
        result = storage.getItem?.(`${config.prefix}${key}`);
      } catch (err) {
        console.error(config.driver, err);
      }

      return result !== null;
    },

    set(key, value) {
      const sanitised = JSON.stringify(value);

      try {
        storage.setItem(`${config.prefix}${key}`, sanitised);
      } catch (err) {
        console.error(config.driver, err);
      }
    },

    remove(key) {
      try {
        storage.removeItem(`${config.prefix}${key}`);
      } catch (err) {
        console.error(config.driver, err);
      }
    },
  };
}

export default Object.assign(createInstance);
