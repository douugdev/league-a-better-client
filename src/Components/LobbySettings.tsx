import { h } from 'preact';
import { createPortal, type PropsWithChildren } from 'preact/compat';
import styles from '../assets/styles/LobbySettings.module.scss';

export const on = '.invite-info-panel-container';

const LobbySettings = ({ children }: PropsWithChildren) => {
  return createPortal(
    <div className={styles.container}>{children}</div>,
    document.querySelector(on) ?? document.head
  );
};

LobbySettings.on = on;

export default LobbySettings;
