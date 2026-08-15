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
    ).toBe('Listening to Satellite — Måneskin');
  });

  test('formats a regular Discord activity with its type and details', () => {
    expect(
      getPresenceActivity({
        activities: [{ type: 0, name: 'Visual Studio Code', details: 'Editing main.ts', state: 'marpisco.com' }],
        spotify: null,
      }),
    ).toBe('Playing Visual Studio Code — Editing main.ts · marpisco.com');
  });

  test('shows two current activities and removes the duplicate Spotify record', () => {
    expect(
      getPresenceActivity({
        activities: [
          { type: 2, name: 'Spotify', details: 'Satellite', state: 'Måneskin' },
          { type: 0, name: 'Visual Studio Code', details: 'Editing Home.cs' },
          { type: 3, name: 'YouTube', details: 'Watching a tutorial' },
        ],
        spotify: { song: 'Satellite', artist: 'Måneskin' },
      }),
    ).toBe('Listening to Satellite — Måneskin · Playing Visual Studio Code — Editing Home.cs');
  });

  test('does not publish a custom Discord status as an activity', () => {
    expect(
      getPresenceActivity({
        activities: [{ type: 4, name: 'Custom Status', state: 'Building things' }],
        spotify: null,
      }),
    ).toBeNull();
  });
});
