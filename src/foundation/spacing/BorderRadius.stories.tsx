import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, Tile, byCategory } from '../../shared/doc-kit';

const meta = { title: 'Trinity/Foundation/Spacing/Border Radius', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const LABEL: Record<string, string> = {
  none: 'None', xsm: 'XSmall', sm: 'Small', 'sm-plus': 'Small+', md: 'Medium', lg: 'Large', xl: 'XLarge',
  xxl: '2XLarge', xxxl: '3XLarge', xxxxl: '4XLarge', pill: 'Pill', circle: 'Circle',
};

export const BorderRadiusScale: Story = {
  name: 'Border Radius Scale',
  render: () => (
    <Ref>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {[...byCategory('radius')].sort((a, b) => a.value - b.value).map(t => {
          const k = t.figma.split('/').pop()!;
          return (
            <Tile key={t.figma} label={LABEL[k] ?? k} sub={t.out!} css={t.css}>
              <div style={{ width: 76, height: 76, margin: '0 auto', background: '#c5e4fb', border: '2px solid #1594ef', borderRadius: `var(${t.css})` }} />
            </Tile>
          );
        })}
      </div>
    </Ref>
  ),
};
