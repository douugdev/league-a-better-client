import { h, createContext, ComponentChild } from 'preact';
import { useContext, useState, useCallback, useEffect } from 'preact/hooks';
import { subscribeToEndpoint } from '../api';
import { Action, Lobby, ParsedWebSocketMessage, Session } from '../api/types';

export interface LobbyInfo {
  currentLobby: Lobby | null;
  // getCurrentGameMode: () => Action[] | null;
  startQueue: () => void;
  stopQueue: () => void;

  quitLobby: () => void;
  joinLobby: () => void;
}

export const lobbyContext = createContext({} as LobbyInfo);

export const LobbyProvider = ({ children }: { children: ComponentChild }) => {
  const [currentLobby, setCurrentLobby] = useState<Session | null>(null);

  const updateLobbyCallback = useCallback(async (message: ParsedWebSocketMessage<Session>) => {
    if (message.eventType === 'Update') {
      setCurrentLobby(message.data);
    } else if (message.eventType === 'Delete') {
      setCurrentLobby(null);
    }
  }, []);

  const getCurrentGameMode = () => {
    return (
      currentLobby?.actions
        .flat()
        .filter((action) => action.actorCellId === currentLobby.localPlayerCellId && action.type === 'ban') ?? null
    );
  };

  useEffect(() => {
    const unsubscribe = subscribeToEndpoint('/lol-champ-select/v1/session', updateLobbyCallback);
    return () => unsubscribe();
  }, [updateLobbyCallback]);

  return (
    <lobbyContext.Provider
      value={{
        getCurrentGameMode,
      }}
    >
      {children}
    </lobbyContext.Provider>
  );
};

export const useLobby = () => {
  const ctx = useContext(lobbyContext);

  return ctx;
};
