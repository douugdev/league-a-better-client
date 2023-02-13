import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import { matchmakingReadyAccept, subscribeToEndpoint } from '../api';
import { useSettings } from '../context/SettingsContext';
import { GamePhase, ParsedWebSocketMessage } from '../api/types';

export const on = '.invite-info-panel-container';

const AutoReady = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const { autoAccept, setAutoAccept } = useSettings();

  const handleChange = () => {
    setAutoAccept((prev) => !prev);
  };

  const autoAcceptCallback = useCallback(
    async (message: ParsedWebSocketMessage<GamePhase>) => {
      if (message.data === 'ReadyCheck' && autoAccept && !hasAccepted) {
        matchmakingReadyAccept();
        setHasAccepted(true);
      } else if (message.data !== 'ReadyCheck') {
        setHasAccepted(false);
      }
    },
    [autoAccept, hasAccepted]
  );

  useEffect(() => {
    const unsubscribe = subscribeToEndpoint(
      '/lol-gameflow/v1/gameflow-phase',
      autoAcceptCallback
    );
    // return () => unsubscribe();
  }, [autoAcceptCallback]);

  return createPortal(
    <lol-uikit-flat-checkbox
      style={{ position: 'absolute', top: '-16px' }}
      // className="collection-ownership-filter"
    >
      <input
        onChange={handleChange}
        checked={autoAccept}
        slot="input"
        name="isUnowned"
        type="checkbox"
        id="ember12382"
        class="ember-checkbox ember-view"
      />
      <label slot="label" class="collection-checkbox-label">
        Auto Ready
      </label>
    </lol-uikit-flat-checkbox>,
    document.querySelector(on) ?? document.head
  );
};

AutoReady.on = on;

export default AutoReady;
