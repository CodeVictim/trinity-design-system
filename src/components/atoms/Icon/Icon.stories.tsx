import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Trinity/Components/Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { glyph: 'e4d9', size: 'Large', icon: 'Default' },
  argTypes: { size: { control: 'inline-radio', options: ['XSmall', 'Small', 'Medium', 'Large'] }, icon: { control: 'inline-radio', options: ['Default', 'Brand'] } },
  parameters: { docs: { description: { component: 'One glyph from the TrinityIcons font (Default) or TrinityBrandIcons (Brand). Decorative by default (`aria-hidden`); pass `label` only when the icon carries meaning by itself. Figma: Icon 60882:389, 8 authored branches.' } } },
};
export default meta;
type S = StoryObj<typeof Icon>;

export const Default: S = {};
export const AllSizes: S = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 64px)', gap: 16, alignItems: 'center' }}>
      {(['XSmall', 'Small', 'Medium', 'Large'] as const).map(s => <Icon key={s} glyph="e4d9" size={s} />)}
      {(['XSmall', 'Small', 'Medium', 'Large'] as const).map(s => <Icon key={'b' + s} glyph="e00a" size={s} icon="Brand" />)}
    </div>
  ),
};
export const Meaningful: S = { args: { label: 'Settings' } };
