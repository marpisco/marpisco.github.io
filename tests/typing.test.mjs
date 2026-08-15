import { describe, expect, test } from 'bun:test';
import { nextTypingState } from '../src/typing.ts';

const messages = ['abc', 'xy'];

describe('typing subtitle state', () => {
  test('reveals one character while typing', () => {
    expect(
      nextTypingState(
        { messageIndex: 0, visibleCharacters: 1, direction: 'typing' },
        messages,
      ),
    ).toEqual({ messageIndex: 0, visibleCharacters: 2, direction: 'typing' });
  });

  test('stops after the full message has been displayed', () => {
    expect(
      nextTypingState(
        { messageIndex: 0, visibleCharacters: 3, direction: 'typing' },
        messages,
      ),
    ).toEqual({ messageIndex: 0, visibleCharacters: 3, direction: 'complete' });
  });

  test('keeps a completed subtitle unchanged', () => {
    expect(
      nextTypingState(
        { messageIndex: 0, visibleCharacters: 3, direction: 'complete' },
        messages,
      ),
    ).toEqual({ messageIndex: 0, visibleCharacters: 3, direction: 'complete' });
  });
});
