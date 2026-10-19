import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, InfoCallout, ReviewCallout, NoteBox, F, byCategory } from '../../shared/doc-kit';

const meta = { title: 'Trinity/Foundation/Typography/Type Styles', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const styles = byCategory('textStyle');
const GROUPS: { key: string; title: string; note: string }[] = [
  { key: 'Data', title: 'Data', note: '60 · 40 · 32px · Medium · large numbers in dashboards and KPI widgets.' },
  { key: 'Heading', title: 'Headings', note: '24 · 20 · 16px · Medium · page, section and card titles. Keep heading levels in order (h1 → h2 → h3).' },
  { key: 'Body', title: 'Body', note: '16 · 14 · 12px · Regular, with Medium for emphasis · paragraphs, table cells, form text.' },
  { key: 'Link', title: 'Links', note: '14px · Regular / Medium · inline and standalone links. Links also need a non-color cue (underline) in body text.' },
  { key: 'Caption', title: 'Caption', note: '10px · Medium · smallest labels and meta. Needs full 4.5:1 contrast; check at 200% zoom.' },
];

const Row = ({ s }: { s: (typeof styles)[number] }) => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'baseline', padding: '14px 0', borderBottom: `1px solid ${F.line}` }}>
    <div style={{ minWidth: 220, flexShrink: 0 }}>
      <div style={{ fontWeight: 500, fontSize: 13 }}>{s.figma}</div>
      <div style={{ fontFamily: F.mono, fontSize: 11 }}>{s.css}</div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: F.label }}>{s.value.size}px · {s.value.style} · lh {s.value.lh}</div>
    </div>
    <div className={s.css!.slice(1)} style={{ color: F.ink }}>Trinity Design System</div>
  </div>
);

export const TypeStyles: Story = {
  name: 'Type Styles',
  render: () => (
    <Ref>
      <InfoCallout>
        These are <b>composite type styles</b> — each class maps to a named text style in Figma (family, size, weight,
        line height, letter spacing). Apply the class instead of restating font properties. Base primitives are in
        <b> Typography &gt; Type Scale</b>.
      </InfoCallout>
      {GROUPS.map(g => (
        <div key={g.key}>
          <SectionTitle>{g.title}</SectionTitle>
          {styles.filter(s => s.group === g.key).sort((a, b) => b.value.size - a.value.size).map(s => <Row key={s.figma} s={s} />)}
          <NoteBox>{g.note}</NoteBox>
        </div>
      ))}
      <SectionTitle>Icon Fonts</SectionTitle>
      {styles.filter(s => s.group === 'Icon Fonts').map(s => (
        <div key={s.figma} style={{ display: 'flex', gap: 24, padding: '8px 0', borderBottom: `1px solid ${F.line}` }}>
          <div style={{ minWidth: 220, fontWeight: 500, fontSize: 13 }}>{s.figma.replace('Icon Fonts/', '')}</div>
          <div style={{ fontFamily: F.mono, fontSize: 11 }}>{s.css} · {s.value.family} · {s.value.size}px</div>
        </div>
      ))}
      <ReviewCallout>
        text styles store line height as a percentage and aren’t bound to the <code>line-height/*</code> or most
        <code> font-size/*</code> primitives; <code>Data/lg</code> (60px) has no font-size primitive.
      </ReviewCallout>
    </Ref>
  ),
};
