export type TypingDirection = 'typing' | 'deleting';

export interface TypingState {
  messageIndex: number;
  visibleCharacters: number;
  direction: TypingDirection;
}

export const HERO_MESSAGES = [
  'Developer and System Administrator based in Portugal.',
  'Building secure infrastructure and reliable platforms.',
  'Automating systems for dependable operations.',
  'Delivering practical software from code to production.',
] as const;

export const INITIAL_TYPING_STATE: TypingState = {
  messageIndex: 0,
  visibleCharacters: 0,
  direction: 'typing',
};

export function nextTypingState(
  state: TypingState,
  messages: readonly string[],
): TypingState {
  const message = messages[state.messageIndex];

  if (state.direction === 'typing') {
    if (state.visibleCharacters >= message.length) {
      return { ...state, direction: 'deleting' };
    }

    return { ...state, visibleCharacters: state.visibleCharacters + 1 };
  }

  if (state.visibleCharacters > 0) {
    return { ...state, visibleCharacters: state.visibleCharacters - 1 };
  }

  return {
    messageIndex: (state.messageIndex + 1) % messages.length,
    visibleCharacters: 0,
    direction: 'typing',
  };
}
