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

  test('removes one character while deleting', () => {
    expect(
      nextTypingState(
        { messageIndex: 0, visibleCharacters: 2, direction: 'deleting' },
        messages,
      ),
    ).toEqual({ messageIndex: 0, visibleCharacters: 1, direction: 'deleting' });
  });

  test('advances to the next message after deleting the complete string', () => {
    expect(
      nextTypingState(
        { messageIndex: 0, visibleCharacters: 0, direction: 'deleting' },
        messages,
      ),
    ).toEqual({ messageIndex: 1, visibleCharacters: 0, direction: 'typing' });
  });

  test('wraps back to the first message after deleting the final string', () => {
    expect(
      nextTypingState(
        { messageIndex: 1, visibleCharacters: 0, direction: 'deleting' },
        messages,
      ),
    ).toEqual({ messageIndex: 0, visibleCharacters: 0, direction: 'typing' });
  });
});
