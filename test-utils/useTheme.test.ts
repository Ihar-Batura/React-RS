import { useTheme } from '../src/shared/hooks/useTheme';
import { renderHook } from '@testing-library/react';

describe('useTheme hook', () => {
  it('should throw an error when used outside of ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrowError('useTheme must be used within a ThemeProvider');
  });
});
