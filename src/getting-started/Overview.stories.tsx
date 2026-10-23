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
          <li style={li}><b>Foundation</b>: Colors, Typography, Spacing, Shadows and Motion — each with a <i>System</i> page (how to use it) and reference pages (every value, with swatches and samples).</li>
          <li style={li}><b>Components</b>: built atom → molecule → organism from Figma — so far Icon, Spinner, Badge, _checkboxInput, Radio Button Input and Progress Bar (atoms), Checkbox, Radio Button Field and Button (molecules).</li>
        </ul>
      </DocSection>

      <DocSection title="System Architecture">
        <p style={{ margin: '0 0 8px', fontWeight: 500 }}>Design Tokens (Foundation Layer)</p>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}><b>Primitives</b>: raw values — colors (<Code>--primary-600</Code>, <Code>--neutral-700</Code>), type scale, spacing, radius, opacity, shadows. {tokens.length} primitives today, plus the Motion collection’s duration / easing scale.</li>
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
          <li style={li}>Target: <b>WCAG 2.2 Level AA</b>. That covers the standards accessibility is actually judged against: <b>WCAG 2.1 AA</b> (the US Department of Justice’s ADA rule for state and local government, most ADA lawsuits, and the EU’s European Accessibility Act through the EN 301 549 version in force — its new v4.1.1 adopts WCAG 2.2) and <b>WCAG 2.0 AA</b> (US federal Section 508). WCAG 2.2 AA includes everything in both. Not legal advice: confirm with legal / compliance which standard a contract names.</li>
          <li style={li}>Every page runs automated accessibility checks — see the <b>Accessibility</b> panel. <b>Automated checks only catch part of WCAG</b> (they can’t judge focus order, keyboard use or what a screen reader says), so each component’s <b>Testing</b> section also lists the manual checks. Both are needed to claim conformance.</li>
          <li style={li}>Where a rule is open to interpretation, the component page quotes the W3C’s own <i>Understanding WCAG 2.2</i> guidance as the source.</li>
          <li style={li}>Contrast is shown on every color swatch.</li>
        </ul>
      </DocSection>

      <DocSection title="Build Status">
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={li}><b>Foundation / primitives</b> — in review (see <b>3. Open Review Items</b>).</li>
          <li style={li}><b>Motion</b> — done: its own Figma collection, Foundation › Motion pages, and motion on Button, Checkbox and Spinner.</li>
          <li style={li}><b>Style + Layout tokens</b> — in place for the components built so far.</li>
          <li style={li}><b>Components</b> — 9 built (6 atoms, 3 molecules); more to follow, one at a time from Figma.</li>
        </ul>
      </DocSection>
    </Doc>
  ),
};
