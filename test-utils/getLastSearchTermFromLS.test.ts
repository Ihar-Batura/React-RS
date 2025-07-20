import { expect } from 'vitest';
import getLastSearchTermFromLS from '../src/shared/ls/getLastSearchTermFormLS';

describe('getLastSearchTermFromLS', () => {
  const localStorageMock = {
    getItem: vi.fn(),
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    configurable: true,
    writable: true,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the value if it is in localStorage', () => {
    const mockValue = 'Spock';
    localStorageMock.getItem.mockReturnValueOnce(mockValue);

    const result = getLastSearchTermFromLS();

    expect(localStorageMock.getItem).toHaveBeenCalledWith('lastSearchTerm');
    expect(result).toBe(mockValue);
  });

  it('should return null if the key is missing', () => {
    localStorageMock.getItem.mockReturnValueOnce(null);

    const result = getLastSearchTermFromLS();

    expect(localStorageMock.getItem).toHaveBeenCalledWith('lastSearchTerm');
    expect(result).toBeNull();
  });
});
