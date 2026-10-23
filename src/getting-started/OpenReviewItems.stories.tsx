import type { Meta, StoryObj } from '@storybook/react-vite';
import { Doc, DocSection, SimpleTable, Code } from '../shared/doc-kit';

const meta = { title: 'Trinity/Getting Started/3. Open Review Items', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const ROWS: [string, string, string, string][] = [
  ['Colors', 'data/semantic/* (5)', 'Aliases, not raw values; data/semantic/danger points up into Style (interaction/danger/default)', 'Colors › Data Visualization'],
  ['Colors', 'Annotation · purple/500 · neutral/shadow', 'Look like Figma tooling colors, not product colors', 'Colors › Palette'],
  ['Colors', 'Chart supporting colors (9)', 'Used by the approved charts but not in Brand Colors yet: #FAF9F6, #706A5C, #D3CEC6, #8A867F, #457676, #6B9D9D, #FF8A80, #E5E1DB, #4A463F (from the Chart Colors frame’s own open items)', 'Colors › Chart Colors'],
  ['Spacing', 'spacing/large/10250 · 10450', 'Not whole pixels (409.67, 417.67)', 'Spacing › Spacing Scale'],
  ['Spacing', 'spacing/large/* over 200px (8)', 'Look like component dimensions — may belong in Layout', 'Spacing › Spacing Scale'],
  ['Opacity', 'opacity/fraction/036', 'Stored 0–1 while the rest of the scale is 0–100', 'Spacing › Opacity'],
  ['Typography', 'Text styles', 'Not bound to line-height / font-size primitives; Data/lg 60px has no primitive', 'Typography › Type Styles'],
  ['Typography', 'TrinityBrandIcons', 'Used by text styles but has no font-family primitive', 'Typography › Type Scale'],
  ['Shadows', 'Effect style “Focus Shadow”', 'Empty — “Focus Dropshadow” is the one in use', 'Shadows › Elevation Scale'],
  ['Missing', 'Breakpoints · z-index', 'No primitives yet — nothing for components to alias', '—'],
  ['Motion', 'Motion collection (94 variables)', '✅ Done 2026-10-19 — its own collection: a duration / easing scale plus component groups that alias it', 'Motion › Motion System'],
];

// Found while building components. Nothing was changed in Figma for these — they're for the owners to decide.
const COMPONENT_ROWS: [string, string, string, string][] = [
  ['Table_Cell', 'IconButton (library component)', 'Its hover reactions (200ms ease-in-out) don’t match the Motion tokens. It comes from another library file, so it’s left for that library’s owner.', '—'],
  ['Radio Button Input', 'disabled + selected', 'Bound to radiobutton/label-disabled (fill) and radiobutton/focus-inner-stroke (ring) — every other state uses the input-* tokens. Built as bound.', 'Radio Button Input › Reference'],
  ['Radio Button Field', 'prototype: click on a selected radio', 'Unselects it in the prototype. Real radios can’t be unselected by clicking; the code follows standard radio behaviour (agreed 2026-10-22).', 'Radio Button Field › Reference'],
  ['Radio Button', 'unused tokens (5)', 'radiobutton/icon-color, icon-color-disabled, input-selected-fill and radiobutton/large/track/width|height aren’t used by any radio variant (the track sizes look like Toggle tokens).', '—'],
  ['Progress Bar', '100% variant · track stroke token', 'The 100% track binds size/1 + radius/sm (others: progress bar/height + radius, same values). progress bar/track stroke isn’t used by any variant.', 'Progress Bar › Reference'],
  ['Progress Bar', 'drawn fill widths', 'Not drawn at their labelled % of the 279px track: 10% = 12.5%, 90% = 88.2%, 5% = 5.4%. The code draws the true percentage.', 'Progress Bar › Reference'],
  ['Progress Bar', 'track vs page, Light', '1.85:1 — the fill passes against the track (8.46:1), but the faint track end marks 100%. Pattern fix without a design change: show the percentage as text.', 'Progress Bar › Reference'],
  ['Button', 'destructive · focus inner stroke', 'Bound to button/accent/focus-inner-stroke — the other variants use their own focus-inner-stroke. Left as is for now.', 'Button › Reference'],
];

export const OpenReviewItems: Story = {
  name: 'Open Review Items',
  render: () => (
    <Doc title="Open Review Items"
      lead="Found during the read-only pulls from Figma and while building components. Nothing was changed in Figma for these — they are for you and the team to decide.">
      <DocSection title="Primitives">
        <SimpleTable head={['Area', 'Where', 'Observation', 'See page']} rows={ROWS.map(([a, w, o, p]) => [a, <Code>{w}</Code>, o, p])} />
      </DocSection>
      <DocSection title="Components">
        <SimpleTable head={['Component', 'Where', 'Observation', 'See page']} rows={COMPONENT_ROWS.map(([a, w, o, p]) => [a, <Code>{w}</Code>, o, p])} />
      </DocSection>
    </Doc>
  ),
};
