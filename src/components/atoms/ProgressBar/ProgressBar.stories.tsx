import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';
import { ModePanel, type SpecimenRow } from '../../../shared/mode-panels';

// Figma Progress Bar 51692:17330 — all 8 authored values, shown in Light and Dark panels like the page's
// "Component Breakdown" frame.
const VALUES = [100, 90, 75, 50, 25, 10, 5, 0];
const ROWS: SpecimenRow[] = VALUES.map(v => ({ label: `${v}%`, render: () => <ProgressBar value={v} label={`Example progress, ${v}%`} /> }));

const meta: Meta<typeof ProgressBar> = {
  title: 'Trinity/Components/Atoms/Progress Bar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: { value: 50, label: 'Uploading 3 files' },
  argTypes: { value: { control: { type: 'range', min: 0, max: 100, step: 1 } } },
  parameters: { docs: { description: { component: 'Determinate progress (Figma Progress Bar 51692:17330): a 279×8 track with a fill whose width is the value. `role="progressbar"` with `aria-valuenow` 0–100; give it a name (`label`, or `labelledBy` for a visible label). Show the percentage as text beside it where you can. The fill animates value changes (300ms ease-out; instant under reduced motion) — move the `value` slider to see it.' } } },
};
export default meta;
type S = StoryObj<typeof ProgressBar>;

export const Playground: S = {};
export const LightMode: S = { name: 'Light Mode', parameters: { layout: 'padded', controls: { disable: true } }, render: () => <ModePanel mode="light" rows={ROWS} /> };
export const DarkMode: S = { name: 'Dark Mode', parameters: { layout: 'padded', controls: { disable: true } }, render: () => <ModePanel mode="dark" rows={ROWS} /> };
