import { type } from 'os';
import { h, VNode, createContext, ComponentChild } from 'preact';
import {
  type StateUpdater,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'preact/hooks';
import { subscribeToEndpoint } from '../api';
import { Action, ParsedWebSocketMessage, Session } from '../api/types';

export interface ChampSelectInfo {
  currentSession: Session | null;
  getOwnBanActions: () => Action[] | null;
  getOwnPickActions: () => Action[] | null;
}

export const champSelectContext = createContext({} as ChampSelectInfo);

export const ChampSelectProvider = ({
  children,
}: {
  children: ComponentChild;
}) => {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const updateSessionCallback = useCallback(
    async (message: ParsedWebSocketMessage<Session>) => {
      if (message.eventType === 'Update') {
        setCurrentSession(message.data);
      } else if (message.eventType === 'Delete') {
        setCurrentSession(null);
      }
    },
    []
  );

  const getOwnBanActions = () => {
    if (process.env.DEBUG === 'true' && !currentSession?.actions) {
      console.info('[DEBUG] Trying to get a ban action on empty session.');
    }
    return (
      currentSession?.actions
        .flat()
        .filter(
          (action) =>
            action.actorCellId === currentSession.localPlayerCellId &&
            action.type === 'ban'
        ) ?? null
    );
  };
  const getOwnPickActions = () => {
    if (process.env.DEBUG === 'true' && !currentSession?.actions) {
      console.info('[DEBUG] Trying to get a pick action on empty session.');
    }
    return (
      currentSession?.actions
        .flat()
        .filter(
          (action) =>
            action.actorCellId === currentSession.localPlayerCellId &&
            action.type === 'pick'
        ) ?? null
    );
  };

  useEffect(() => {
    const unsubscribe = subscribeToEndpoint(
      '/lol-champ-select/v1/session',
      updateSessionCallback
    );
    return () => unsubscribe();
  }, [updateSessionCallback]);

  return (
    <champSelectContext.Provider
      value={{
        currentSession,
        getOwnBanActions,
        getOwnPickActions,
      }}
    >
      {children}
    </champSelectContext.Provider>
  );
};

export const useChampSelect = () => {
  const ctx = useContext(champSelectContext);

  return ctx;
};
