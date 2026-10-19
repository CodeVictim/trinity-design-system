import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, TypeRow, byPrefix } from '../../shared/doc-kit';

const meta = { title: 'Trinity/Foundation/Typography/Type Scale', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const SIZE_LABEL: Record<number, string> = { 10: 'Caption', 12: 'XSmall', 14: 'Small', 16: 'Body', 20: 'Medium', 24: 'Large', 32: 'XLarge', 40: 'Data' };
// sample glyphs from the TrinityIcons font (star, home, user, search, truck, calendar)
const ICONS = [57569, 57472, 57604, 57548, 57590, 57384].map(c => String.fromCodePoint(c)).join(' ');
const BRAND = [57345, 57346, 57347, 57348, 57349, 57350].map(c => String.fromCodePoint(c)).join(' ');

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => (
    <Ref>
      <SectionTitle>Font Families</SectionTitle>
      {byPrefix('font-family/').map(f => (
        <TypeRow key={f.figma} token={f.css}>
          {f.figma.includes('Icon')
            ? <span style={{ fontFamily: `var(${f.css})`, fontSize: 20 }} aria-label="TrinityIcons sample glyphs" role="img">{ICONS}</span>
            : <span style={{ fontFamily: `var(${f.css})`, fontSize: 16 }}>{String(f.value)} — The quick brown fox</span>}
        </TypeRow>
      ))}
      <TypeRow token="TrinityBrandIcons (no primitive yet)">
        <span style={{ fontFamily: 'TrinityBrandIcons', fontSize: 20 }} aria-label="TrinityBrandIcons sample glyphs" role="img">{BRAND}</span>
      </TypeRow>

      <SectionTitle>Font Sizes</SectionTitle>
      {[...byPrefix('font-size/')].sort((a, b) => a.value - b.value).map(s => (
        <TypeRow key={s.figma} token={s.css} value={<span style={{ fontSize: `var(${s.css})` }}>{s.out}</span>}>
          <span style={{ fontSize: `var(${s.css})`, lineHeight: 1.2 }}>Trinity Design System — {SIZE_LABEL[s.value] ?? ''}</span>
        </TypeRow>
      ))}

      <SectionTitle>Font Weights (ABC Repro)</SectionTitle>
      {byPrefix('font-weight/').map(w => (
        <TypeRow key={w.figma} token={w.css} value={<span style={{ fontSize: 16, fontWeight: w.value }}>{w.figma.split('/').pop()}</span>}>
          <span style={{ fontSize: 16, fontWeight: w.value }}>Trinity Design System</span>
        </TypeRow>
      ))}

      <SectionTitle>Line Heights</SectionTitle>
      {byPrefix('line-height/').map(l => (
        <TypeRow key={l.figma} token={l.css} value={l.out}>
          <span style={{ display: 'inline-block', fontSize: 14, lineHeight: `var(${l.css})`, background: '#eef9ff', padding: '0 6px' }}>Two lines of text<br />at this line height</span>
        </TypeRow>
      ))}

      <SectionTitle>Letter Spacing</SectionTitle>
      {byPrefix('letter-spacing/').map(l => (
        <TypeRow key={l.figma} token={l.css} value={l.out}>
          <span style={{ fontSize: 20, letterSpacing: `var(${l.css})` }}>Trinity Design System</span>
        </TypeRow>
      ))}
    </Ref>
  ),
};
