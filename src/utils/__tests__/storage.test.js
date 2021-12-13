import storageFactory from '../storage';

describe('storage.js', () => {
  const storage = storageFactory({
    name: 'testing',
    driver: 'localStorage',
  });

  describe('storageFactory()', () => {
    it('exposes localStorage CRUD operations as a module', () => {
      expect(typeof storage.has === 'function').toBe(true);
      expect(typeof storage.get === 'function').toBe(true);
      expect(typeof storage.set === 'function').toBe(true);
      expect(typeof storage.remove === 'function').toBe(true);
    });
  });
});
