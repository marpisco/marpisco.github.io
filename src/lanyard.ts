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
  if (presence.spotify?.song && presence.spotify.artist) {
    return `Listening to ${presence.spotify.song} · ${presence.spotify.artist}`;
  }

  const activity = presence.activities.find((item) => item.type !== 4);
  if (activity?.name) {
    const details = [activity.details, activity.state].filter(Boolean).join(' · ');
    return details ? `${activity.name} · ${details}` : activity.name;
  }

  const customStatus = presence.activities.find((item) => item.type === 4);
  return customStatus?.state || null;
}
