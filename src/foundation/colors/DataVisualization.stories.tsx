import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, InfoCallout, ReviewCallout, ColorRow, byPrefix, sortSteps } from '../../shared/doc-kit';

const meta = { title: 'Trinity/Foundation/Colors/Data Visualization', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const phases = [...new Set(byPrefix('data/phase/').map(t => t.figma.split('/')[2]))].sort();

export const DataVisualization: Story = {
  name: 'Data Visualization',
  render: () => (
    <Ref>
      <InfoCallout>
        Data colors are for <b>charts, graphs and maps only</b> — never for UI states. Pair every series with a label,
        marker or pattern so color is never the only signal. The categorical and semantic sets are <b>pending team review</b>.
      </InfoCallout>

      <SectionTitle>Categorical — Series Order</SectionTitle>
      {sortSteps(byPrefix('data/categorical/')).map(t => <ColorRow key={t.figma} t={t} />)}

      <SectionTitle>Semantic — Status In Charts</SectionTitle>
      <ReviewCallout>
        these five are aliases instead of raw values, and <code>danger</code> points up into the Style collection
        (<code>interaction/danger/default</code>). The primitive tier should hold raw values only.
      </ReviewCallout>
      {byPrefix('data/semantic/').map(t => (
        <ColorRow key={t.figma} t={t} desc={`Alias → ${t.alias}${t.note ? ` (${t.note})` : ''}`} />
      ))}

      {phases.map(p => (
        <div key={p}>
          <SectionTitle>{`Truck Phase ${p}`}</SectionTitle>
          {sortSteps(byPrefix(`data/phase/${p}/`)).map(t => <ColorRow key={t.figma} t={t} />)}
        </div>
      ))}
    </Ref>
  ),
};
