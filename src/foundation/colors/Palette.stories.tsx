import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, InfoCallout, ReviewCallout, ColorRow, byCategory, sortSteps } from '../../shared/doc-kit';

const meta = { title: 'Trinity/Foundation/Colors/Palette', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const brand = byCategory('color').filter(t => !t.figma.startsWith('data/'));
const fam = (g: string) => sortSteps(brand.filter(t => t.group === g));
const status = (s: string) => sortSteps(brand.filter(t => t.figma.startsWith(`status/${s}/`)));
const other = brand.filter(t => !['primary', 'secondary', 'neutral', 'status'].includes(t.group));

export const Palette: Story = {
  name: 'Palette',
  render: () => (
    <Ref>
      <InfoCallout>
        <b>See the Color System docs</b> for usage guidance, contrast tables and do/don't rules.
        Navigate to <b>Trinity &gt; Foundation &gt; Colors &gt; Color System</b> in the sidebar.
        Each row lists the Style / Layout tokens that use the color (from Figma).
      </InfoCallout>

      <SectionTitle>Primary — Brand Blue</SectionTitle>
      {fam('primary').map(t => <ColorRow key={t.figma} t={t} />)}

      <SectionTitle>Secondary — Brand Chartreuse</SectionTitle>
      {fam('secondary').map(t => <ColorRow key={t.figma} t={t} />)}

      <SectionTitle>Neutral — Structure, Text, Borders</SectionTitle>
      {fam('neutral').map(t => <ColorRow key={t.figma} t={t} />)}

      <SectionTitle>Status — System Feedback Only</SectionTitle>
      {['warning', 'success', 'error'].flatMap(s => status(s)).map(t => <ColorRow key={t.figma} t={t} />)}

      <SectionTitle>Other — Tooling</SectionTitle>
      <ReviewCallout>these look like Figma annotation / tooling colors rather than product colors.</ReviewCallout>
      {other.map(t => <ColorRow key={t.figma} t={t} />)}
    </Ref>
  ),
};
