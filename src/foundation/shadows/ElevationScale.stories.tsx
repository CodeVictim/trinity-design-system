import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, InfoCallout, ReviewCallout, ShadowRow, byCategory } from '../../shared/doc-kit';

const meta = { title: 'Trinity/Foundation/Shadows/Elevation Scale', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DESC: Record<string, string> = {
  'Content Container Shadow': 'Resting containers that sit on the page background.',
  'Card Hover Shadow': 'Interactive cards on hover — signals clickability.',
  'Focus Dropshadow': 'Keyboard focus ring. Must stay visible (WCAG 2.4.7) and reach 3:1 against its surroundings.',
};

export const ElevationScale: Story = {
  name: 'Elevation Scale',
  render: () => {
    const list = byCategory('shadow');
    return (
      <Ref>
        <InfoCallout>
          Shadows come from Figma <b>effect styles</b> (shadows can’t be Figma variables) and are exported as
          CSS shadow tokens. Use the <b>lowest elevation</b> that creates enough separation.
        </InfoCallout>
        <SectionTitle>Effect Styles</SectionTitle>
        {list.filter(t => t.css && t.figma !== 'Focus Dropshadow').map(t => (
          <ShadowRow key={t.figma} name={t.figma} css={t.css!} value={String(t.value)} desc={DESC[t.figma] ?? ''} />
        ))}
        <SectionTitle>Focus</SectionTitle>
        {list.filter(t => t.figma === 'Focus Dropshadow').map(t => (
          <ShadowRow key={t.figma} name={t.figma} css={t.css!} value={String(t.value)} desc={DESC[t.figma]} />
        ))}
        <ReviewCallout>the effect style “Focus Shadow” is empty — “Focus Dropshadow” is the one in use.</ReviewCallout>
      </Ref>
    );
  },
};
