import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming'
import '../tokens/1-primitives/index.css'
import '../tokens/2-style-layout/index.css'

const preview: Preview = {
  globalTypes: {
    theme: { description: 'Trinity mode', toolbar: { title: 'Mode', icon: 'mirror', items: ['light', 'dark'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, ctx) => (
      <div data-theme={ctx.globals.theme} style={{ background: 'var(--layout-base)', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: create({
        base: 'light',
        fontBase: "'ABC Repro', system-ui, sans-serif",
        fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        textColor: '#211f1c',
        colorPrimary: '#0975c3',
        colorSecondary: '#0975c3',
      }),
    },
    a11y: {
      // 'error' fails the a11y test run on violations; 'todo' reports without failing
      test: 'error',
      options: {
        // WCAG 2.0 / 2.1 / 2.2 — Level A + AA (target: WCAG 2.2 AA)
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      },
    },
    options: {
      storySort: {
        order: [
          'Trinity', [
            'Getting Started', ['1. Overview', '2. Design Tokens', '3. Open Review Items'],
            'Foundation', [
              'Colors', ['Color System', 'Palette', 'Data Visualization'],
              'Typography', ['Type System', 'Type Scale', 'Type Styles'],
              'Spacing', ['Spacing System', 'Spacing Scale', 'Border Radius', 'Opacity'],
              'Shadows',
            ],
            'Components', ['Atoms', ['Icon', 'Spinner', 'Badge', '_checkboxInput'], 'Molecules', ['Checkbox', 'Button']],
          ],
        ],
      },
    },
  },
};

export default preview;
