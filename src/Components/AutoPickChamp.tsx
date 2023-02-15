import { JSX, createRef, h } from 'preact';
import {
  ChangeEvent,
  TargetedEvent,
  createPortal,
  useEffect,
  useRef,
  useState,
} from 'preact/compat';
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

  const [search, setSearch] = useState('');

  const updateSearch = (e: TargetedEvent) => {
    const text = (e.target as HTMLInputElement).value;
    setSearch(text);
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const classes = Array.from(dropdownRef.current?.classList || []);
    if (classes.find((c) => c === 'active')) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [dropdownRef]);

  return (
    <div>
      <span className="split-panel-header-title active">
        Auto Champ Select:
      </span>

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
          .filter((champ) =>
            champ.name.toLowerCase().includes(search.toLowerCase())
          )
          .map(renderChampion)}
      </lol-uikit-framed-dropdown>
    </div>
  );
};

export default AutoPickChamp;

/** align-items: center;
    border-top: thin solid #1f2123;
    color: #cdbe91;
    cursor: pointer;
    display: block;
    min-height: 30px;
    line-height: var(--dropdown-option-framed-line-height);
    margin: 0;
    overflow: hidden;
    padding: 2px 9px 2px 7px;
    position: relative;
    text-overflow: ellipsis;
    white-space: var(--dropdown-option-framed-white-space);
    overflow-wrap: var(--dropdown-option-framed-overflow-wrap);
}
 */
