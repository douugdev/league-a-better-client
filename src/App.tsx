import { h } from 'preact';
import AutoReady from './Components/AutoReady';
import MinimalistTheme from './Components/MinimalistTheme';
import SettingsMenu from './Components/SettingsMenu';
import { SettingsProvider } from './context/SettingsContext';
import AutoPickChamp from './Components/AutoPickChamp';
import { ChampSelectProvider } from './context/ChampSelectContext';
import Dodge from './Components/Dodge';
import HideFriendsList from './Components/HideFriendsList';

const App = () => {
  return (
    <SettingsProvider>
      <AutoReady />
      <MinimalistTheme />
      <SettingsMenu />
      <HideFriendsList />
      <ChampSelectProvider>
        <Dodge />
        <AutoPickChamp />
      </ChampSelectProvider>
    </SettingsProvider>
  );
};

export default App;
