import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, ReviewCallout, SpacingRow, byCategory } from '../../shared/doc-kit';

const meta = { title: 'Trinity/Foundation/Spacing/Spacing Scale', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const sp = [...byCategory('spacing')].sort((a, b) => a.value - b.value);
const tier = (g: string) => sp.filter(t => t.group === g && t.value <= 64);

export const SpacingScale: Story = {
  name: 'Spacing Scale',
  render: () => (
    <Ref>
      <SectionTitle>Micro (0–8px)</SectionTitle>
      {tier('spacing/micro').map(t => <SpacingRow key={t.figma} t={t} />)}
      <SectionTitle>Small (10–16px)</SectionTitle>
      {tier('spacing/small').map(t => <SpacingRow key={t.figma} t={t} />)}
      <SectionTitle>Medium (18–38px)</SectionTitle>
      {tier('spacing/medium').map(t => <SpacingRow key={t.figma} t={t} />)}
      <SectionTitle>Large (40–64px)</SectionTitle>
      {tier('spacing/large').map(t => <SpacingRow key={t.figma} t={t} />)}
      <SectionTitle>Extended (over 64px)</SectionTitle>
      <ReviewCallout>
        these values sit in the spacing collection but look like component dimensions (and two aren’t whole pixels:
        409.67, 417.67). They likely belong in Layout as component tokens.
      </ReviewCallout>
      {sp.filter(t => t.value > 64).map(t => <SpacingRow key={t.figma} t={t} max={600} />)}
    </Ref>
  ),
};
