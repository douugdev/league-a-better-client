import { createPortal } from 'preact/compat';
import { h } from 'preact';
import { useState, useEffect, useRef, useContext } from 'preact/hooks';
import pkg from '../../package.json';

export const on = '#lol-uikit-layer-manager-wrapper';

const SettingsMenu = () => {
  const [visible, setVisible] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const [opener, setOpener] = useState<HTMLDivElement | null>(null);

  const show = (on: boolean) => {
    setVisible(on);
  };

  const showDefaultSettings = () => {
    opener?.click();
    show(false);
  };

  useEffect(() => {
    {
      const opener = document.querySelector<HTMLDivElement>(
        'div[action=settings]'
      );
      setOpener(opener);
    }
  }, []);

  useEffect(() => {
    if (opener) {
      opener.addEventListener(
        'click',
        (e: Event) => {
          if (!visible) {
            e.stopImmediatePropagation();
            show(true);
          }
        },
        { once: true }
      );
      frame.current?.shadowRoot
        ?.querySelector('lol-uikit-close-button')
        ?.addEventListener('click', () => show(false));
    }
  }, [opener, visible]);

  return createPortal(
    <div
      class="modal"
      style="position: absolute; inset: 0px; z-index: 8500"
      hidden={!visible || undefined}
    >
      <lol-uikit-full-page-backdrop
        class="backdrop"
        style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px"
      />
      <div
        class="dialog-confirm"
        style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px"
      >
        <lol-uikit-dialog-frame
          ref={frame}
          class="dialog-frame"
          orientation="bottom"
          close-button="false"
        >
          <div class="dialog-content">
            <lol-uikit-content-block
              class="app-controls-exit-dialog"
              type="dialog-medium"
              style="position: relative; overflow: hidden"
            >
              <div style="position: absolute; top: 60px">
                <video
                  autoPlay
                  loop
                  muted
                  src="https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/blt7a72b1686eb3219a/618d75137ae6ce6fab413b1f/background-video-d-02.mp4"
                  style="object-fit: cover; object-position: center center; height: 100%; width: 100%; transform-origin: center center; transform: scale(2.5)"
                ></video>
              </div>
              <div style="position: relative">
                <div style="margin-bottom: 24px">
                  <h4 style="padding: 6px 0">A Better Client</h4>
                  <p>v{pkg.version}</p>
                </div>
                <hr class="heading-spacer" />
                <div style="display: flex; flex-direction: column; align-items: center; gap: 12px">
                  <lol-uikit-flat-button-secondary
                    style="display:inline-block; width: 180px"
                    onClick={() => window.openDevTools()}
                  >
                    Open DevTools (F12)
                  </lol-uikit-flat-button-secondary>
                  <lol-uikit-flat-button-secondary
                    style="display:inline-block; width: 180px"
                    onClick={() => window.location.reload()}
                  >
                    Reload Client (Ctrl Shift R)
                  </lol-uikit-flat-button-secondary>
                  <lol-uikit-flat-button-secondary
                    style="display:inline-block; width: 180px"
                    onClick={() => window.openPluginsFolder()}
                  >
                    Open plugins folder
                  </lol-uikit-flat-button-secondary>
                </div>
                <hr class="heading-spacer" />
                <p
                  style="padding: 20px 0"
                  class="lol-settings-code-of-conduct-link lol-settings-window-size-text"
                >
                  <a href="https://leagueloader.app" target="_blank">
                    leagueloader.app
                  </a>
                </p>
              </div>
            </lol-uikit-content-block>
          </div>
          <lol-uikit-flat-button-group type="dialog-frame">
            <lol-uikit-flat-button
              tabIndex={1}
              class="button-accept"
              onClick={() => showDefaultSettings()}
            >
              Open Settings
            </lol-uikit-flat-button>
            <lol-uikit-flat-button
              tabIndex={2}
              class="button-decline"
              onClick={() => show(false)}
            >
              Close
            </lol-uikit-flat-button>
          </lol-uikit-flat-button-group>
        </lol-uikit-dialog-frame>
      </div>
    </div>,
    document.querySelector(on) ?? document.head
  );
};

SettingsMenu.on = on;

export default SettingsMenu;
