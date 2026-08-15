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

export type VisibilityPollingEnvironment = {
  isVisible: () => boolean;
  addVisibilityListener: (listener: () => void) => () => void;
  setInterval: (callback: () => void, delay: number) => number;
  clearInterval: (id: number) => void;
};

export type VisibilityPolling = {
  start: () => void;
  stop: () => void;
};

export function createVisibilityPolling(
  refresh: () => void,
  environment: VisibilityPollingEnvironment,
  intervalMs = 10_000,
): VisibilityPolling {
  let intervalId: number | null = null;
  let removeVisibilityListener: (() => void) | null = null;
  let started = false;
  let lastVisibility: boolean | null = null;

  const clearPollingInterval = (): void => {
    if (intervalId !== null) {
      environment.clearInterval(intervalId);
      intervalId = null;
    }
  };

  const poll = (): void => {
    if (environment.isVisible()) {
      refresh();
    }
  };

  const syncVisibility = (): void => {
    if (!started) {
      return;
    }

    const visible = environment.isVisible();
    if (visible === lastVisibility) {
      return;
    }

    lastVisibility = visible;
    if (!visible) {
      clearPollingInterval();
      return;
    }

    poll();
    intervalId = environment.setInterval(poll, intervalMs);
  };

  return {
    start: () => {
      if (started) {
        return;
      }

      started = true;
      removeVisibilityListener = environment.addVisibilityListener(syncVisibility);
      syncVisibility();
    },
    stop: () => {
      if (!started) {
        return;
      }

      started = false;
      lastVisibility = null;
      clearPollingInterval();
      removeVisibilityListener?.();
      removeVisibilityListener = null;
    },
  };
}

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
