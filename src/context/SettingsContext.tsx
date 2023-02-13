import { h, VNode, createContext, ComponentChild } from "preact";
import { type StateUpdater, useContext, useState } from "preact/hooks";
import { retrieveBoolean } from "../utils/storage";

export interface SettingsInfo {
  autoClaimEventTokens: boolean;
  setAutoClaimEventTokens: StateUpdater<boolean>;
  autoAccept: boolean;
  setAutoAccept: StateUpdater<boolean>;
}

export const settingsContext = createContext({} as SettingsInfo);

export const SettingsProvider = ({
  children,
}: {
  children: ComponentChild;
}) => {
  const [autoAccept, setAutoAccept] = useState(retrieveBoolean("autoAccept"));
  const [autoClaimEventTokens, setAutoClaimEventTokens] = useState(
    retrieveBoolean("autoClaimEventTokens")
  );

  return (
    <settingsContext.Provider
      value={{
        autoAccept,
        setAutoAccept,
        autoClaimEventTokens,
        setAutoClaimEventTokens,
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
