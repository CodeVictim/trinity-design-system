import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Badge, type BadgeState } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Trinity/Components/Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Static status / count label (Figma Badge 7477:297479). All 23 Figma variants are shown. Non-interactive; no live region. Dots and icon badges carry a screen-reader label because their meaning is visual.' } } },
};
export default meta;
type S = StoryObj<typeof Badge>;

const states: BadgeState[] = ['Default', 'Alternate', 'Outline', 'Error'];
const Row = ({ children }: { children: ReactNode }) => <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>{children}</div>;

export const Number: S = { args: { content: 'number', value: '99+', state: 'Default', type: 'Default' } };
export const AllVariants: S = {
  render: () => (
    <div>
      <Row>{states.map(s => <Badge key={s} content="number" value="99+" state={s} />)}</Row>
      <Row>{states.map(s => <Badge key={s} content="text" value="NEW" state={s} />)}</Row>
      <Row>{states.map(s => <Badge key={s} content="number" type="Data" value="99+" state={s} />)}</Row>
      <Row>{states.map(s => <Badge key={s} content="text" type="Data" value="NEW" state={s} />)}</Row>
      <Row>{(['Default', 'Alternate', 'Error'] as const).map(s => <Badge key={s} content="dot" state={s} label={`${s} status`} />)}</Row>
      <Row>{states.map(s => <Badge key={s} content="icon" state={s} label="Database" />)}</Row>
    </div>
  ),
};
