export type LanyardActivity = {
  type: number;
  name: string;
  details?: string | null;
  state?: string | null;
};

export type LanyardSpotify = {
  song: string;
  artist: string;
};

export type LanyardPresence = {
  discord_status: string;
  activities: readonly LanyardActivity[];
  spotify: LanyardSpotify | null;
};

type PresenceActivityInput = Pick<LanyardPresence, 'activities' | 'spotify'>;

const ACTIVITY_TYPE_LABELS: Record<number, string> = {
  0: 'Playing',
  1: 'Streaming',
  2: 'Listening',
  3: 'Watching',
  5: 'Competing',
};

export function getStatusLabel(status: string): string {
  if (status === 'dnd') {
    return 'Do Not Disturb';
  }

  if (status === 'idle') {
    return 'Idle';
  }

  if (status === 'online') {
    return 'Online';
  }

  return 'Offline';
}

export function getPresenceActivity(presence: PresenceActivityInput): string | null {
  const activities: string[] = [];

  if (presence.spotify?.song && presence.spotify.artist) {
    activities.push(`Listening to ${presence.spotify.song} — ${presence.spotify.artist}`);
  }

  for (const activity of presence.activities) {
    if (activities.length === 2 || activity.type === 4 || !activity.name) {
      continue;
    }

    if (presence.spotify && activity.name === 'Spotify') {
      continue;
    }

    const typeLabel = ACTIVITY_TYPE_LABELS[activity.type] ?? 'Active on';
    const details = [activity.details, activity.state].filter(Boolean).join(' · ');
    activities.push(
      details
        ? `${typeLabel} ${activity.name} — ${details}`
        : `${typeLabel} ${activity.name}`,
    );
  }

  return activities.length > 0 ? activities.join(' · ') : null;
}
