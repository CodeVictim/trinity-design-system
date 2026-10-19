import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Trinity-branded Storybook frame (values from Trinity primitives)
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Trinity Design System',
    brandTarget: '_self',
    colorPrimary: '#0975c3',   // primary/600
    colorSecondary: '#0975c3', // primary/600 — selected item / accents
    appBg: '#f6f4f2',          // neutral/25
    appContentBg: '#ffffff',   // neutral/0
    appBorderColor: '#dfdedd', // neutral/100
    appBorderRadius: 6,        // radius/md
    textColor: '#211f1c',      // neutral/900
    textMutedColor: '#565147', // neutral/600
    barBg: '#ffffff',
    barSelectedColor: '#0975c3',
    fontBase: "'ABC Repro', system-ui, sans-serif",
    fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  }),
  sidebar: { showRoots: true },
});
