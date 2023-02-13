import { h } from 'preact';
import { createPortal } from 'preact/compat';

const on = '.main-navigation-menu-item';

const MinimalistTheme = () => {
  return createPortal(
    <link
      href={'//assets/styles/MinimalistTheme.global.css'}
      rel="stylesheet"
    />,
    document.body
  );
};

MinimalistTheme.on = on;

export default MinimalistTheme;
