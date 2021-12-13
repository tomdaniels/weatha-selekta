import findMatch from '../find-match';

describe('find-match.js', () => {
  describe('findMatch()', () => {
    const doesItMatchWith = findMatch('my test string');

    it('is a curried function', () => {
      expect(typeof doesItMatchWith === 'function').toBe(true);
    });

    it('accepts an object and returns true if the location matches', () => {
      expect(doesItMatchWith({ location: 'my test string' })).toBe(true);
      expect(doesItMatchWith({ location: 'anything else' })).toBe(false);
    });
  });
});
