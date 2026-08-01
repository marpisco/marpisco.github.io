export type ThemePreference = 'system' | 'dark' | 'light';
export type ResolvedTheme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'marcopisco-theme';

export function parseThemePreference(value: string | null): ThemePreference {
  if (value === 'dark' || value === 'light') {
    return value;
  }
  return 'system';
}

export function nextThemePreference(current: ThemePreference): ThemePreference {
  if (current === 'system') {
    return 'dark';
  }
  if (current === 'dark') {
    return 'light';
  }
  return 'system';
}

export function resolveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean,
): ResolvedTheme {
  if (preference === 'system') {
    return systemPrefersDark ? 'dark' : 'light';
  }
  return preference;
}
