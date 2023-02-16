import { h } from 'preact';
import { TargetedEvent, useEffect, useRef, useState } from 'preact/compat';
import { getOwnedChampions, getDataChampions, matchmakingChampionIntent, matchmakingChampionLock } from '../api';
import type { ApiGridChampion } from '../api/types';
import { useChampSelect } from '../context/ChampSelectContext';
import styles from '../assets/styles/AutoPickChamp.module.scss';
import { useSettings } from '../context/SettingsContext';

const AutoPickChamp = () => {
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  const [picked, setPicked] = useState<boolean>(false);
  const [intended, setIntended] = useState<boolean>(false);
  const [availableChampions, setAvailableChampions] = useState<ApiGridChampion[]>([]);
  const [search, setSearch] = useState('');
  const { autoPickChampionId, setAutoPickChampionId } = useSettings();
  const { getOwnPickActions } = useChampSelect();
  const myPickActions = getOwnPickActions();

  const handleSelectChampion = (champId: number) => {
    console.log('id', champId);
    setAutoPickChampionId(champId);
  };

  const renderChampion = (champion: ApiGridChampion) => {
    return (
      <lol-uikit-dropdown-option
        selected={champion.id === autoPickChampionId ? true : undefined}
        slot="lol-uikit-dropdown-option"
        onClick={() => handleSelectChampion(champion.id)}
        className="custom-bot-champions-dropdown-option framed-dropdown-type"
      >
        <div className={`custom-bot-champions-dropdown-option-content ${styles.row}`}>
          <div className="custom-member-icon ui-dropdown-option-only">
            <div className="custom-member-bot-icon">
              <img src={champion.squarePortraitPath} className="custom-member-bot-icon-img" />
              <div className="ring"></div>
            </div>
          </div>
          <div className="custom-bot-champion-name">{champion.name}</div>
        </div>
      </lol-uikit-dropdown-option>
    );
  };

  useEffect(() => {
    (async () => {
      if (myPickActions && myPickActions[0]) {
        // Get the first pick action
        const firstPickAction = myPickActions[0];

        if (firstPickAction.isInProgress && !picked) {
          try {
            await matchmakingChampionLock(firstPickAction.id, autoPickChampionId);
          } finally {
            setPicked(true);
          }
        } else if (!intended) {
          try {
            await matchmakingChampionIntent(firstPickAction.id, autoPickChampionId);
          } finally {
            setIntended(true);
          }
        }
      }
    })();
  }, [myPickActions, autoPickChampionId, intended]);

  useEffect(() => {
    if (availableChampions.length === 0) {
      (async () => {
        const allGridChampions = (await getOwnedChampions()) ?? (await getDataChampions());
        const [emptyChamp, ...rest] = allGridChampions;

        setAvailableChampions([emptyChamp, ...rest.sort((a, b) => b.masteryPoints - a.masteryPoints)]);
      })();
    }
  }, [availableChampions]);

  const updateSearch = (e: TargetedEvent) => {
    const text = (e.target as HTMLInputElement).value;
    setSearch(text);
  };

  return (
    <div>
      <span className="split-panel-header-title active">Auto Champ Select:</span>

      <lol-uikit-framed-dropdown
        ref={dropdownRef}
        direction="upward"
        className="custom-bot-champions-dropdown"
        tabIndex={0}
      >
        <div slot="lol-uikit-dropdown-option">
          <lol-uikit-flat-input>
            <input
              type="search"
              placeholder="Buscar"
              maxLength={50}
              class="collection-search-text"
              onInput={(e) => updateSearch(e)}
            />
          </lol-uikit-flat-input>
        </div>
        {availableChampions
          .filter((champ) => champ.name.toLowerCase().includes(search.toLowerCase()))
          .map(renderChampion)}
      </lol-uikit-framed-dropdown>
    </div>
  );
};

export default AutoPickChamp;
