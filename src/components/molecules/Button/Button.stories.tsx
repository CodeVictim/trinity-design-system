import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, type ButtonVariant, type ButtonSize } from './Button';

// Figma Button 30033:78562 — 144 authored variants (6 variants × 4 sizes × 6 states).
// The two matrix stories copy the Figma documentation frames on the Button page:
//   "Buttons Light Mode" 62643:13798 and "Buttons Dark Mode" 62643:14375 —
//   states across (Default · Hover · Active · Focus · Disabled · Loading), variants down,
//   four size blocks (xlarge → large → medium → small), column + row headers, layout/base background.
const ROWS: { variant: ButtonVariant; label: string }[] = [
  { variant: 'primary', label: 'Primary' },
  { variant: 'accent', label: 'Accent' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'link', label: 'Ghost' },
  { variant: 'destructive', label: 'Destructive' },
  { variant: 'destructive-secondary', label: 'Destructive secondary' },
];
const sizes: ButtonSize[] = ['xlarge', 'large', 'medium', 'small'];
type StateKey = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
const COLUMNS: { key: StateKey; label: string }[] = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover' },
  { key: 'active', label: 'Active' },
  { key: 'focus', label: 'Focus' },
  { key: 'disabled', label: 'Disabled' },
  { key: 'loading', label: 'Loading' },
];

const meta: Meta<typeof Button> = {
  title: 'Trinity/Components/Molecules/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Content', variant: 'primary', size: 'xlarge', prefixIcon: 'e4d9', suffixIcon: 'e4d9', loading: false, disabled: false },
  argTypes: { variant: { control: 'select', options: ROWS.map(r => r.variant) }, size: { control: 'inline-radio', options: sizes } },
  parameters: { docs: { description: { component: 'Native `<button>` (Figma Button 30033:78562, 144 authored variants) built from the Icon and Spinner atoms. Enter and Space activate. Loading keeps the name, sets `aria-busy`, and ignores clicks. Icon-only (`showContent={false}`) needs `aria-label`.' } } },
};
export default meta;
type S = StoryObj<typeof Button>;

// ---------- frame formatting, as in Figma (module-level constants — no inline styles) ----------
const frame: CSSProperties = { background: 'var(--layout-base)', padding: '48px 40px 48px 24px', display: 'inline-block' };
const matrix: CSSProperties = { display: 'grid', gridTemplateColumns: '120px repeat(6, 190px)', alignItems: 'center', justifyItems: 'center', rowGap: 28 };
// Column + row headers only tell the team what each button is. Figma draws them in its magenta Annotation colour;
// that's a Figma annotation, not part of the design, so here they're plain doc headers (house ink / white on Dark).
const header = (mode: 'light' | 'dark'): CSSProperties => ({ fontFamily: 'var(--font-family-trinityfont), sans-serif', fontWeight: 500, fontSize: 14, lineHeight: 1.4, color: mode === 'dark' ? '#ffffff' : '#211f1c' });
const rowHeader = (mode: 'light' | 'dark'): CSSProperties => ({ ...header(mode), justifySelf: 'end', textAlign: 'right', paddingRight: 16 });
const blockGap: CSSProperties = { gridColumn: '1 / -1', height: 12 };

const Cell = ({ variant, size, state }: { variant: ButtonVariant; size: ButtonSize; state: StateKey }) => (
  <Button variant={variant} size={size} prefixIcon="e4d9" suffixIcon="e4d9"
    state={state === 'hover' || state === 'active' || state === 'focus' ? state : 'default'}
    disabled={state === 'disabled'} loading={state === 'loading'}>Content</Button>
);

const Matrix = ({ mode }: { mode: 'light' | 'dark' }) => (
  <div data-theme={mode} style={frame}>
    <div style={matrix}>
      <span />
      {COLUMNS.map(c => <span key={c.key} style={header(mode)}>{c.label}</span>)}
      {sizes.map((size, i) => [
        i > 0 && <span key={size + '-gap'} style={blockGap} />,
        ...ROWS.flatMap(r => [
          <span key={size + r.variant} style={rowHeader(mode)}>{r.label}</span>,
          ...COLUMNS.map(c => <Cell key={size + r.variant + c.key} variant={r.variant} size={size} state={c.key} />),
        ]),
      ])}
    </div>
  </div>
);

export const Playground: S = {};

export const ButtonsLightMode: S = {
  name: 'Buttons Light Mode',
  parameters: { layout: 'fullscreen', controls: { disable: true }, docs: { description: { story: 'Matches the Figma frame “Buttons Light Mode” (62643:13798).' } } },
  render: () => <Matrix mode="light" />,
};

export const ButtonsDarkMode: S = {
  name: 'Buttons Dark Mode',
  parameters: { layout: 'fullscreen', controls: { disable: true }, docs: { description: { story: 'Matches the Figma frame “Buttons Dark Mode” (62643:14375) — the same matrix with the Dark mode tokens.' } } },
  render: () => <Matrix mode="dark" />,
};
