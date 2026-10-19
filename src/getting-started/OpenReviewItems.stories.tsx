import type { Meta, StoryObj } from '@storybook/react-vite';
import { Doc, DocSection, SimpleTable, Code } from '../shared/doc-kit';

const meta = { title: 'Trinity/Getting Started/3. Open Review Items', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const ROWS: [string, string, string, string][] = [
  ['Colors', 'data/semantic/* (5)', 'Aliases, not raw values; data/semantic/danger points up into Style (interaction/danger/default)', 'Colors › Data Visualization'],
  ['Colors', 'Annotation · purple/500 · neutral/shadow', 'Look like Figma tooling colors, not product colors', 'Colors › Palette'],
  ['Spacing', 'spacing/large/10250 · 10450', 'Not whole pixels (409.67, 417.67)', 'Spacing › Spacing Scale'],
  ['Spacing', 'spacing/large/* over 200px (8)', 'Look like component dimensions — may belong in Layout', 'Spacing › Spacing Scale'],
  ['Opacity', 'opacity/fraction/036', 'Stored 0–1 while the rest of the scale is 0–100', 'Spacing › Opacity'],
  ['Typography', 'Text styles', 'Not bound to line-height / font-size primitives; Data/lg 60px has no primitive', 'Typography › Type Styles'],
  ['Typography', 'TrinityBrandIcons', 'Used by text styles but has no font-family primitive', 'Typography › Type Scale'],
  ['Shadows', 'Effect style “Focus Shadow”', 'Empty — “Focus Dropshadow” is the one in use', 'Shadows › Elevation Scale'],
  ['Missing', 'Motion · breakpoints · z-index', 'No primitives yet — nothing for components to alias', '—'],
];

export const OpenReviewItems: Story = {
  name: 'Open Review Items',
  render: () => (
    <Doc title="Open Review Items"
      lead="Found in the primitives during the read-only pull from Figma. Nothing was changed in Figma — these are for you and the team to decide.">
      <DocSection title="Primitives">
        <SimpleTable head={['Area', 'Where', 'Observation', 'See page']} rows={ROWS.map(([a, w, o, p]) => [a, <Code>{w}</Code>, o, p])} />
      </DocSection>
    </Doc>
  ),
};
