import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButtonInput } from './RadioButtonInput';
import { ModePanel, type SpecimenRow } from '../../../shared/mode-panels';

// Figma Radio Button Input 30173:78572 — all 8 authored variants, shown in Light and Dark panels like the
// page's "Component Breakdown" frame. Disabled is only authored with state default.
const ROWS: SpecimenRow[] = [
  { label: 'Default', render: () => <RadioButtonInput /> },
  { label: 'Selected', render: () => <RadioButtonInput selected /> },
  { label: 'Hover', render: () => <RadioButtonInput state="hover" /> },
  { label: 'Hover, selected', render: () => <RadioButtonInput state="hover" selected /> },
  { label: 'Focus', render: () => <RadioButtonInput state="focus" /> },
  { label: 'Focus, selected', render: () => <RadioButtonInput state="focus" selected /> },
  { label: 'Disabled', render: () => <RadioButtonInput disabled /> },
  { label: 'Disabled, selected', render: () => <RadioButtonInput disabled selected /> },
];

const meta: Meta<typeof RadioButtonInput> = {
  title: 'Trinity/Components/Atoms/Radio Button Input',
  component: RadioButtonInput,
  tags: ['autodocs'],
  args: { selected: false, disabled: false, state: 'default' },
  parameters: { docs: { description: { component: 'Base of Radio Button Field (Figma Radio Button Input 30173:78572): the 24×24 touchpoint, the 20px container and the 16px circle. Selected is a 4px inside ring. Visual only (`aria-hidden`). Don\'t use it on its own; Radio Button Field owns the real radio input and drives hover and focus.' } } },
};
export default meta;
type S = StoryObj<typeof RadioButtonInput>;

export const Playground: S = {};
export const LightMode: S = { name: 'Light Mode', parameters: { layout: 'padded', controls: { disable: true } }, render: () => <ModePanel mode="light" rows={ROWS} /> };
export const DarkMode: S = { name: 'Dark Mode', parameters: { layout: 'padded', controls: { disable: true } }, render: () => <ModePanel mode="dark" rows={ROWS} /> };
