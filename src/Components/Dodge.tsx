import { h, Fragment } from 'preact';
import { createPortal } from 'preact/compat';
import { cancelChampSelect, dodgeQueue } from '../api';

const on = '.bottom-right-buttons';

const Dodge = () => {
  const handleDodge = async () => {
    await dodgeQueue();
    await cancelChampSelect();
  };

  return createPortal(
    <>
      <div class="quit-button" onClick={handleDodge}>
        <lol-uikit-flat-button>Sair</lol-uikit-flat-button>
      </div>
    </>,
    document.querySelector(on) ?? document.head
  );
};

Dodge.on = on;

export default Dodge;
