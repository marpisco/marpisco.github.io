import { describe, expect, test } from 'bun:test';
import { getPresenceActivity, getStatusLabel } from '../src/lanyard.ts';

describe('Lanyard presence formatting', () => {
  test('formats Discord status labels', () => {
    expect(getStatusLabel('online')).toBe('Online');
    expect(getStatusLabel('idle')).toBe('Idle');
    expect(getStatusLabel('dnd')).toBe('Do Not Disturb');
    expect(getStatusLabel('offline')).toBe('Offline');
  });

  test('prefers a Spotify activity summary', () => {
    expect(
      getPresenceActivity({
        activities: [],
        spotify: { song: 'Satellite', artist: 'Måneskin' },
      }),
    ).toBe('Listening to Satellite · Måneskin');
  });

  test('formats a regular Discord activity with its details', () => {
    expect(
      getPresenceActivity({
        activities: [{ type: 0, name: 'Visual Studio Code', details: 'Editing main.ts', state: 'marpisco.com' }],
        spotify: null,
      }),
    ).toBe('Visual Studio Code · Editing main.ts · marpisco.com');
  });

  test('falls back to a custom status when no activity is active', () => {
    expect(
      getPresenceActivity({
        activities: [{ type: 4, name: 'Custom Status', state: 'Building things' }],
        spotify: null,
      }),
    ).toBe('Building things');
  });
});
