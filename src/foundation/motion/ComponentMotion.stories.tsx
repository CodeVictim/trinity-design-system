import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, InfoCallout, NoteBox, SimpleTable, Code, F } from '../../shared/doc-kit';
import { groups, componentTokenCount, type MotionGroup } from './motion-data';

const meta = { title: 'Trinity/Foundation/Motion/Component Motion', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const owner = (g: MotionGroup) => (
  <div style={{ lineHeight: 1.45 }}>
    <div>{g.owners}</div>
    <div style={{ fontSize: 12, color: F.body }}>
      {g.level}{g.exception ? ' · motion exception' : ''}{g.look ? ` · look only: ${g.look}` : ''}
    </div>
  </div>
);
const tokenList = (g: MotionGroup) => (
  <div style={{ display: 'grid', gap: 4 }}>
    {g.tokens.map(t => (
      <div key={t.figma} style={{ fontSize: 12 }}>
        <Code>{t.css}</Code> → <span style={{ fontFamily: F.mono, fontSize: 11, color: F.label }}>{t.aliasCss}</span> · {t.out}
      </div>
    ))}
  </div>
);
const table = (list: MotionGroup[]) => (
  <SimpleTable head={['Group', 'Handled by', 'Tokens → scale · value']} rows={list.map(g => [<Code>{g.group}</Code>, owner(g), tokenList(g)])} />
);

export const ComponentMotion: Story = {
  name: 'Component Motion',
  render: () => (
    <Ref>
      <InfoCallout>
        {groups.length} component groups, {componentTokenCount} tokens. Each group is named exactly as in Layout / Style (nav uses its
        existing subgroups: <Code>nav/link</Code>, <Code>nav/section</Code>, <Code>nav/sidebar</Code>, <Code>nav/topbar</Code>).
        Every token aliases the motion scale, so changing a scale value updates every component that uses it.
      </InfoCallout>
      <SectionTitle>Atoms with their own motion (exceptions)</SectionTitle>
      <NoteBox>Atoms define how something looks; they don’t animate. These five are the exceptions — their motion is their purpose, or they’re used on their own with states.</NoteBox>
      {table(groups.filter(g => g.exception))}
      <SectionTitle>Molecules and organisms</SectionTitle>
      <NoteBox>The molecule or organism handles the motion, including for the atoms inside it (e.g. Checkbox animates _checkboxInput’s parts).</NoteBox>
      {table(groups.filter(g => !g.exception))}
      <SectionTitle>No motion</SectionTitle>
      <p style={{ fontSize: 13, color: F.body }}>Icon, Badge, Tag, Truck Phase Tag, Avatar, Flag, Label, Helper Text, Suggestion Row, Scrollbar, Hub Breadcrumb Group, SegmentControl (its Alternate Buttons carry the motion), Page Layout, Dashboard / Widget.</p>
    </Ref>
  ),
};
