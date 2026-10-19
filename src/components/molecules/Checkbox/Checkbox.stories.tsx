import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Trinity/Components/Molecules/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Content', showLabel: true, defaultChecked: false, indeterminate: false, disabled: false },
  parameters: { docs: { description: { component: 'Native checkbox + label (Figma Checkbox 30515:78521), built from the `_checkboxInput` atom. Space toggles (Enter does not). Clicking the label toggles. Indeterminate is set on the native input. Target 24×24.' } } },
};
export default meta;
type S = StoryObj<typeof Checkbox>;

export const Default: S = {};
export const AllVariants: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 160px)', gap: 16 }}>
      {(['default', 'hover', 'focus'] as const).flatMap(st => [
        <Checkbox key={st + 1} label={`${st}`} state={st} />,
        <Checkbox key={st + 2} label={`${st}, checked`} state={st} defaultChecked />,
        <Checkbox key={st + 3} label={`${st}, mixed`} state={st} indeterminate />])}
      <Checkbox label="disabled" disabled /><Checkbox label="disabled, checked" disabled defaultChecked /><Checkbox label="disabled, mixed" disabled indeterminate />
    </div>
  ),
};
export const HiddenLabel: S = { args: { label: 'Select row', showLabel: false } };
