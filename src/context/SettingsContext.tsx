import { h, VNode, createContext, ComponentChild } from 'preact';
import {
  type StateUpdater,
  useContext,
  useState,
  useEffect,
} from 'preact/hooks';
import { retrieveBoolean, retrieveNumber, store } from '../utils/storage';

export interface SettingsInfo {
  autoClaimEventTokens: boolean;
  setAutoClaimEventTokens: StateUpdater<boolean>;
  autoAccept: boolean;
  setAutoAccept: StateUpdater<boolean>;
  autoPickChampionId: number;
  setAutoPickChampionId: StateUpdater<number>;
}

export const settingsContext = createContext({} as SettingsInfo);

export const SettingsProvider = ({
  children,
}: {
  children: ComponentChild;
}) => {
  const [autoAccept, setAutoAccept] = useState<boolean>(
    retrieveBoolean('autoAccept')
  );
  const [autoClaimEventTokens, setAutoClaimEventTokens] = useState<boolean>(
    retrieveBoolean('autoClaimEventTokens')
  );
  const [autoPickChampionId, setAutoPickChampionId] = useState<number>(
    retrieveNumber('autoPickChampionId') ?? -1
  );

  useEffect(() => {
    store('autoAccept', autoAccept);
    store('autoClaimEventTokens', autoClaimEventTokens);
    store('autoPickChampionId', autoPickChampionId);
  }, [autoAccept, autoClaimEventTokens, autoPickChampionId]);

  return (
    <settingsContext.Provider
      value={{
        autoAccept,
        setAutoAccept,
        autoClaimEventTokens,
        setAutoClaimEventTokens,
        autoPickChampionId,
        setAutoPickChampionId,
      }}
    >
      {children}
    </settingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(settingsContext);

  return ctx;
};
