import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';

import styles from '../assets/styles/HideFriendsList.module.scss';

export const injectOn = '.lol-social-lower-pane-container';

const HideFriendsList = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const handleChange = () => {
    setIsHidden((prev) => !prev);
  };

  useEffect(() => {
    const friendsList = document.querySelector(
      '.lol-social-lower-pane-container > lol-social-roster > lol-uikit-scrollable'
    );
    if (isHidden) {
      friendsList?.classList.add(styles.hidden);
    } else {
      friendsList?.classList.remove(styles.hidden);
    }
  }, [isHidden]);

  return (
    <>
      {createPortal(
        <span className="action-bar-button ember-view" onClick={handleChange}>
          <div className={isHidden ? styles.iconHidden : styles.icon} />
        </span>,
        document.querySelector('.actions-bar .buttons') ?? document.head
      )}
    </>
  );
};

HideFriendsList.on = injectOn;

export default HideFriendsList;
