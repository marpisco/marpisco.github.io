import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import * as lanyard from '../src/lanyard.ts';
import { nextTypingState } from '../src/typing.ts';

describe('idle CPU behavior', () => {
  test('stops the subtitle after its first message is complete', () => {
    assert.deepEqual(
      nextTypingState(
        { messageIndex: 0, visibleCharacters: 3, direction: 'typing' },
        ['abc'],
      ),
      { messageIndex: 0, visibleCharacters: 3, direction: 'complete' },
    );
  });

  test('pauses presence polling while hidden and refreshes immediately on return', () => {
    const { createVisibilityPolling } = lanyard;
    let visible = false;
    let visibilityListener;
    let intervalCallback;
    let intervalDelay;
    const clearedIntervals = [];
    let refreshCount = 0;

    const polling = createVisibilityPolling(
      () => {
        refreshCount += 1;
      },
      {
        isVisible: () => visible,
        addVisibilityListener: (listener) => {
          visibilityListener = listener;
          return () => {
            visibilityListener = undefined;
          };
        },
        setInterval: (callback, delay) => {
          intervalCallback = callback;
          intervalDelay = delay;
          return 7;
        },
        clearInterval: (id) => {
          clearedIntervals.push(id);
        },
      },
    );

    polling.start();
    assert.equal(refreshCount, 0);

    visible = true;
    visibilityListener();
    assert.equal(refreshCount, 1);
    assert.equal(intervalDelay, 10_000);

    intervalCallback();
    assert.equal(refreshCount, 2);

    visible = false;
    visibilityListener();
    assert.deepEqual(clearedIntervals, [7]);

    visible = true;
    visibilityListener();
    assert.equal(refreshCount, 3);

    polling.stop();
    assert.deepEqual(clearedIntervals, [7, 7]);
  });

  test('requests presence immediately, prevents overlap, and aborts on stop', async () => {
    const { createLanyardPresencePolling } = lanyard;
    let intervalCallback;
    let intervalDelay;
    const requestSignals = [];
    const renderedStatuses = [];

    const polling = createLanyardPresencePolling({
      loadPresence: async (signal) => {
        requestSignals.push(signal);
        return { discord_status: 'online', activities: [], spotify: null };
      },
      renderPresence: (presence) => {
        renderedStatuses.push(presence.discord_status);
      },
      renderUnavailable: () => {
        throw new Error('A successful presence request must not render unavailable.');
      },
      environment: {
        isVisible: () => true,
        addVisibilityListener: () => () => {},
        setInterval: (callback, delay) => {
          intervalCallback = callback;
          intervalDelay = delay;
          return 1;
        },
        clearInterval: () => {},
      },
    });

    polling.start();
    assert.equal(requestSignals.length, 1);
    assert.equal(intervalDelay, 10_000);

    intervalCallback();
    assert.equal(requestSignals.length, 1);

    await Promise.resolve();
    await Promise.resolve();
    assert.deepEqual(renderedStatuses, ['online']);

    intervalCallback();
    assert.equal(requestSignals.length, 2);

    polling.stop();
    assert.equal(requestSignals[1].aborted, true);
  });
});
