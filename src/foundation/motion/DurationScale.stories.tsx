import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, InfoCallout, NoteBox, F, Code } from '../../shared/doc-kit';
import { durations, USE_FOR, groupsUsing, motionMeta } from './motion-data';
import { MotionDemo } from './MotionDemo';

const meta = { title: 'Trinity/Foundation/Motion/Duration Scale', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const DurationScale: Story = {
  name: 'Duration Scale',
  render: () => (
    <Ref>
      <InfoCallout>
        Six durations from the Figma <b>Motion</b> collection (<Code>duration/*</Code>). Figma stores each as a whole number of
        milliseconds; the CSS is <Code>ms</Code>. Components never use these directly — their own motion token aliases one.
        Press <b>Play</b> to see each one with <Code>ease-out</Code>.
      </InfoCallout>
      <SectionTitle>Durations</SectionTitle>
      {durations.map(t => {
        const used = groupsUsing(t);
        return (
          <div key={t.figma} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0', borderBottom: `1px solid ${F.line}` }}>
            <div style={{ minWidth: 230, lineHeight: 1.4 }}>
              <div style={{ fontFamily: F.mono, fontSize: 12 }}>{t.css}</div>
              <div style={{ fontWeight: 500, fontSize: 15 }}>{t.out}</div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: F.label }}>Figma: {t.figma}</div>
            </div>
            <div style={{ flex: 1, lineHeight: 1.45 }}>
              <div style={{ fontSize: 13 }}>{USE_FOR[t.figma]}</div>
              <div style={{ fontSize: 12, color: F.body }}>
                {used.length ? `Used by: ${used.join(' · ')}` : 'Not aliased by any component group'}
              </div>
            </div>
            <MotionDemo duration={`var(${t.css})`} label={`${t.figma} demo`} />
          </div>
        );
      })}
      <NoteBox>Pulled from Figma “{motionMeta.file}” on {motionMeta.pulled}. Re-run <Code>node scripts/build-motion.mjs</Code> after a new pull.</NoteBox>
    </Ref>
  ),
};
