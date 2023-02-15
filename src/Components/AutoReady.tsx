import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import { matchmakingReadyAccept, subscribeToEndpoint } from '../api';
import { useSettings } from '../context/SettingsContext';
import { GamePhase, ParsedWebSocketMessage } from '../api/types';

const AutoReady = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const { autoAccept, setAutoAccept } = useSettings();
  const [unsubscribe, setUnsubscribe] = useState<(() => void) | null>(null);

  const handleChange = () => {
    setAutoAccept((prev) => !prev);
  };

  const autoAcceptCallback = useCallback(
    async (message: ParsedWebSocketMessage<GamePhase>) => {
      if (message.data === 'ReadyCheck' && !hasAccepted) {
        matchmakingReadyAccept();
        setHasAccepted(true);
      } else if (message.data !== 'ReadyCheck') {
        setHasAccepted(false);
      }
    },
    [autoAccept, hasAccepted]
  );

  useEffect(() => {
    if (autoAccept && unsubscribe === null) {
      const currentUnsubscribe = subscribeToEndpoint(
        '/lol-gameflow/v1/gameflow-phase',
        autoAcceptCallback
      );
      setUnsubscribe((_) => currentUnsubscribe);
    } else if (!autoAccept && unsubscribe) {
      unsubscribe?.();
      setUnsubscribe(null);
    }
  }, [autoAcceptCallback, autoAccept, unsubscribe]);

  return (
    <lol-uikit-flat-checkbox>
      <input
        onChange={handleChange}
        checked={autoAccept}
        slot="input"
        name="isUnowned"
        type="checkbox"
        id="ember12382"
        className="ember-checkbox ember-view"
      />
      <label slot="label" className="collection-checkbox-label">
        Auto Ready
      </label>
    </lol-uikit-flat-checkbox>
  );
};

export default AutoReady;
