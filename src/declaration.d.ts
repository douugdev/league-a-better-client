import 'preact';

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'lol-uikit-flat-checkbox': HTMLAttributes<HTMLDivElement>;
      'lol-uikit-full-page-backdrop': HTMLAttributes<HTMLDivElement>;
      'lol-uikit-dialog-frame': HTMLAttributes<HTMLDivElement> & {
        orientation?: 'bottom' | 'top' | 'left' | 'right';
      };
      'lol-uikit-content-block': HTMLAttributes<HTMLDivElement>;
      'lol-uikit-flat-button-secondary': HTMLAttributes<HTMLButtonElement>;
      'lol-uikit-flat-button-group': HTMLAttributes<HTMLDivElement>;
      'lol-uikit-flat-button': HTMLAttributes<HTMLButtonElement>;
      'lol-uikit-framed-dropdown': HTMLAttributes<HTMLButtonElement> & {
        direction?: 'upward';
      };
      'lol-uikit-dropdown-option': HTMLAttributes<HTMLButtonElement>;
      'lol-uikit-section-controller': HTMLAttributes<HTMLDivElement> & {
        animation: 'crossfade';
      };
      'lol-uikit-section': HTMLAttributes<HTMLDivElement>;
      'lol-uikit-navigation-bar': HTMLAttributes<HTMLDivElement> & {
        selectedindex: number;
      };
      'lol-uikit-navigation-item': HTMLAttributes<HTMLDivElement> & {
        priority: number;
        active: boolean;
      };
    }
  }
}

declare global {
  module '*.jpg' {
    const content: string;
    export default content;
  }
  module '*.png' {
    const content: string;
    export default content;
  }
  module '*.scss' {
    const content: Record<string, string>;
    export default content;
  }
  namespace NodeJS {
    interface ProcessEnv {
      DEBUG: string;
    }
  }
  interface Window {
    openDevTools: () => void;
    openPluginsFolder: () => void;
    Effect: {
      readonly current: EffectName | undefined;
      apply(name: EffectName, options?: EffectOptions): boolean;
      clear(): void;
    };
  }
}

type EffectName = 'mica' | 'acrylic' | 'unified' | 'blurbehind';

interface EffectOptions {
  color?: string;
}
