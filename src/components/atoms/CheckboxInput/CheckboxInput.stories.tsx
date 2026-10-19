import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxInput } from './CheckboxInput';

const meta: Meta<typeof CheckboxInput> = {
  title: 'Trinity/Components/Atoms/_checkboxInput',
  component: CheckboxInput,
  tags: ['autodocs'],
  args: { value: false, indeterminate: false, disabled: false, state: 'default' },
  parameters: { docs: { description: { component: 'Private base of Checkbox (Figma _checkboxInput 30515:78570): the 24×24 touchpoint, the 16×16 box, and the check / indeterminate mark. Visual only (`aria-hidden`). Don\'t use it on its own; Checkbox owns the real input and drives hover and focus.' } } },
};
export default meta;
type S = StoryObj<typeof CheckboxInput>;

export const Default: S = {};
export const AllVariants: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 48px)', gap: 16 }}>
      {(['default', 'hover', 'focus'] as const).flatMap(st => [
        <CheckboxInput key={st + 1} state={st} />, <CheckboxInput key={st + 2} state={st} value />, <CheckboxInput key={st + 3} state={st} indeterminate />])}
      <CheckboxInput disabled /><CheckboxInput disabled value /><CheckboxInput disabled indeterminate />
    </div>
  ),
};
