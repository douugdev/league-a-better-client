import { h, render } from 'preact';
import AutoReady from './Components/AutoReady';
import App from './App';
import { linkCss } from './utils/stylesheet';
import AutoPickChamp from './Components/AutoPickChamp';
import MinimalistTheme from './Components/MinimalistTheme';
import Dodge from './Components/Dodge';
import HideFriendsList from './Components/HideFriendsList';
import LobbySettings from './Components/LobbySettings';

// Add components that need an element not readily available at launch here
const PortalComponents = [
  LobbySettings,
  MinimalistTheme,
  Dodge,
  HideFriendsList,
];

const onInit = async () => {
  window.addEventListener('load', async () => {
    const root = () => document.getElementById('rcp-fe-viewport-root');
    while (!root()) await new Promise((r) => setTimeout(r, 200));
    const observer = new MutationObserver(async (mutationsList) => {
      for (const Component of PortalComponents) {
        const comp = document.querySelector(Component.on);
        if (!!comp && !document.getElementById(Component.name)) {
          await render(<App />, root()!);
        }
      }
    });

    linkCss('//assets/styles/global.css');

    const config = { attributes: true, childList: true, subtree: true };
    const targetNode =
      document.getElementById('rcp-fe-viewport-root') ?? document.body;
    observer.observe(targetNode, config);
  });
};

onInit();
