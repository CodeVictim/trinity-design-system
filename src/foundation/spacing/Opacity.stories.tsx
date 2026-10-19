import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, Tile, ReviewCallout, byCategory } from '../../shared/doc-kit';

const meta = { title: 'Trinity/Foundation/Spacing/Opacity', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const list = [...byCategory('opacity')].filter(t => !t.figma.includes('fraction')).sort((a, b) => a.value - b.value);

export const OpacityScale: Story = {
  name: 'Opacity Scale',
  render: () => (
    <Ref>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {list.map(t => (
          <Tile key={t.figma} label={`${t.value}%`} sub={t.out!} css={t.css}>
            <div style={{ position: 'relative', width: 56, height: 56, margin: '0 auto', borderRadius: 6, background: '#f0eeea' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 6, background: '#1594ef', opacity: `var(${t.css})` }} />
            </div>
          </Tile>
        ))}
      </div>
      <ReviewCallout><code>opacity/fraction/036</code> is stored as 0.36 while the rest of the scale is 0–100.</ReviewCallout>
    </Ref>
  ),
};
