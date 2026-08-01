import { describe, expect, test } from 'bun:test';
import {
  nextThemePreference,
  parseThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
} from '../src/theme.ts';

describe('theme preference', () => {
  test('uses the expected storage key', () => {
    expect(THEME_STORAGE_KEY).toBe('marcopisco-theme');
  });

  test('accepts supported saved values and rejects invalid values', () => {
    expect(parseThemePreference('dark')).toBe('dark');
    expect(parseThemePreference('light')).toBe('light');
    expect(parseThemePreference('system')).toBe('system');
    expect(parseThemePreference('sepia')).toBe('system');
    expect(parseThemePreference(null)).toBe('system');
  });

  test('cycles system, dark, light, then system', () => {
    expect(nextThemePreference('system')).toBe('dark');
    expect(nextThemePreference('dark')).toBe('light');
    expect(nextThemePreference('light')).toBe('system');
  });

  test('resolves system preference and explicit overrides', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme('light', true)).toBe('light');
  });
});
