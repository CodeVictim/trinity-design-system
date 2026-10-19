import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Trinity/Components/Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: { size: '40' },
  argTypes: { size: { control: 'inline-radio', options: ['16', '24', '40'] } },
  parameters: { docs: { description: { component: 'Loading mark (Figma Spinner 10259:29263, sizes 16 / 24 / 40). Static, as authored in Figma. Decorative (`aria-hidden`); the component using it announces the busy state.' } } },
};
export default meta;
type S = StoryObj<typeof Spinner>;

export const Default: S = {};
export const AllSizes: S = { render: () => <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}><Spinner size="16" /><Spinner size="24" /><Spinner size="40" /></div> };
