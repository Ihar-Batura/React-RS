import { expect } from 'vitest';
import setLastSearchTermToLS from '../src/shared/ls/setLastSearchTermToLS';

describe('setLastSearchTermToLS', () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: vi.fn((key, value) => {
          localStorageMock[key] = value;
        }),
        getItem: vi.fn((key) => localStorageMock[key] || null),
      },
      configurable: true,
      writable: true,
    });
  });

  it('should correctly save the value in localStorage', () => {
    const testTerm = '  Spock  ';

    setLastSearchTermToLS(testTerm);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastSearchTerm',
      'Spock'
    );
    expect(localStorageMock['lastSearchTerm']).toBe('Spock');
  });

  it('should overwrite the previous value in localStorage', () => {
    const oldTerm = 'Spock';
    const newTerm = 'Kirk';

    setLastSearchTermToLS(oldTerm);
    setLastSearchTermToLS(newTerm);

    expect(localStorage.setItem).toHaveBeenCalledWith('lastSearchTerm', 'Kirk');
    expect(localStorageMock['lastSearchTerm']).toBe('Kirk');
  });
});
