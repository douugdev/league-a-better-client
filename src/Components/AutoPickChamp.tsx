import { h } from 'preact';
import { createPortal, useEffect, useState } from 'preact/compat';
import {
  getAllGridChampions,
  getDataChampions,
  matchmakingChampionIntent,
  matchmakingChampionLock,
} from '../api';
import type { ApiGridChampion } from '../api/types';
import { useChampSelect } from '../context/ChampSelectContext';
import styles from '../assets/styles/AutoPickChamp.module.scss';

const AutoPickChamp = () => {
  const [availableChampions, setAvailableChampions] = useState<
    ApiGridChampion[]
  >([]);
  const [autoPickChampId, setAutoPickChampId] = useState<number>(-1);
  const { getOwnPickActions } = useChampSelect();

  const myPickActions = getOwnPickActions();

  const handleSelectChampion = (champId: number) => {
    setAutoPickChampId(champId);
  };

  const renderChampion = (champion: ApiGridChampion) => {
    return (
      <lol-uikit-dropdown-option
        selected={champion.id === autoPickChampId ? true : undefined}
        slot="lol-uikit-dropdown-option"
        onClick={() => handleSelectChampion(champion.id)}
        className="custom-bot-champions-dropdown-option framed-dropdown-type"
      >
        <div
          className={`custom-bot-champions-dropdown-option-content ${styles.row}`}
        >
          <div className="custom-member-icon ui-dropdown-option-only">
            <div className="custom-member-bot-icon">
              <img
                src={champion.squarePortraitPath}
                className="custom-member-bot-icon-img"
              />
              <div className="ring"></div>
            </div>
          </div>
          <div className="custom-bot-champion-name">{champion.name}</div>
        </div>
      </lol-uikit-dropdown-option>
    );
  };

  useEffect(() => {
    if (myPickActions && myPickActions[0]) {
      const mainPickAction = myPickActions[0];

      if (mainPickAction.isInProgress) {
        matchmakingChampionIntent(mainPickAction.id, autoPickChampId).then(
          () => {
            matchmakingChampionLock(mainPickAction.id, autoPickChampId);
          }
        );
      }
    }
  }, [myPickActions]);

  useEffect(() => {
    if (availableChampions.length === 0) {
      (async () => {
        const allGridChampions =
          (await getAllGridChampions()) ?? (await getDataChampions());
        const [emptyChamp, ...rest] = allGridChampions;

        setAvailableChampions([
          emptyChamp,
          ...rest.sort((a, b) => b.masteryPoints - a.masteryPoints),
        ]);
      })();
    }
  }, [availableChampions]);

  return (
    <div>
      <span className="split-panel-header-title active">
        Auto Champ Select:
      </span>
      <lol-uikit-framed-dropdown
        direction="upward"
        className="custom-bot-champions-dropdown"
        tabIndex={0}
      >
        {availableChampions.map(renderChampion)}
      </lol-uikit-framed-dropdown>
    </div>
  );
};

export default AutoPickChamp;
