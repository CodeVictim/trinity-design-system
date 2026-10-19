import type { Meta, StoryObj } from '@storybook/react-vite';
import { Doc, DocSection, Code, tokens } from '../shared/doc-kit';

const meta = { title: 'Trinity/Getting Started/1. Overview', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const li: React.CSSProperties = { margin: '4px 0' };

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <Doc title="Trinity Design System"
      lead="Verifi’s design system — design tokens, components and standards for consistent, accessible product experiences.">
      <DocSection title="What’s Here">
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}><b>Getting Started</b>: this overview, how the design tokens work, and open review items.</li>
          <li style={li}><b>Foundation</b>: Colors, Typography, Spacing and Shadows — each with a <i>System</i> page (how to use it) and reference pages (every value, with swatches and samples).</li>
          <li style={li}><b>Components</b>: added atom → molecule → organism, after the Style and Layout tokens are in place.</li>
        </ul>
      </DocSection>

      <DocSection title="System Architecture">
        <p style={{ margin: '0 0 8px', fontWeight: 500 }}>Design Tokens (Foundation Layer)</p>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}><b>Primitives</b>: raw values — colors (<Code>--primary-600</Code>, <Code>--neutral-700</Code>), type scale, spacing, radius, opacity, shadows. {tokens.length} primitives today.</li>
          <li style={li}><b>Style + Layout</b>: a small set of shared roles plus component-scoped tokens (e.g. <Code>--button-primary-fill</Code>), Light / Dark on Style.</li>
          <li style={li}><b>Components</b>: use only their own Style / Layout tokens — never primitives.</li>
        </ul>
      </DocSection>

      <DocSection title="Single Source of Truth">
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}><b>Figma</b> → <b>Tokens</b> → <b>Components</b> → <b>Documentation</b>. Figma file: <i>Trinity Design System (for review)</i>.</li>
          <li style={li}>Tokens are pulled from Figma read-only and generated into CSS — never edited by hand.</li>
        </ul>
      </DocSection>

      <DocSection title="Accessibility">
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}>Target: <b>WCAG 2.2 Level AA</b>.</li>
          <li style={li}>Every page runs automated accessibility checks — see the <b>Accessibility</b> panel.</li>
          <li style={li}>Contrast is shown on every color swatch.</li>
        </ul>
      </DocSection>

      <DocSection title="Build Status">
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}><b>Foundation / primitives</b> — in review (see <b>3. Open Review Items</b>).</li>
          <li style={li}><b>Style + Layout tokens</b> — next.</li>
          <li style={li}><b>Components</b> — after Style + Layout, starting with atoms.</li>
        </ul>
      </DocSection>
    </Doc>
  ),
};
