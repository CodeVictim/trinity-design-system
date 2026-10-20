import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, InfoCallout, F, Code } from '../../shared/doc-kit';
import { easings, USE_FOR, groupsUsing, CURVES } from './motion-data';
import { MotionDemo, CurvePreview } from './MotionDemo';

const meta = { title: 'Trinity/Foundation/Motion/Easing', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Easing: Story = {
  name: 'Easing',
  render: () => (
    <Ref>
      <InfoCallout>
        Four easings from the Figma <b>Motion</b> collection (<Code>easing/*</Code>), stored as CSS keywords and exported unquoted.
        <b> ease-out</b> is Trinity’s default. The curve shows progress (up) over time (across). Each demo runs at <Code>--duration-medium</Code> (300ms) so the shape is easy to see.
      </InfoCallout>
      <SectionTitle>Easing curves</SectionTitle>
      {easings.map(t => {
        const used = groupsUsing(t);
        const c = CURVES[String(t.value)];
        return (
          <div key={t.figma} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0', borderBottom: `1px solid ${F.line}` }}>
            <CurvePreview keyword={String(t.value)} />
            <div style={{ minWidth: 200, lineHeight: 1.4 }}>
              <div style={{ fontFamily: F.mono, fontSize: 12 }}>{t.css}</div>
              <div style={{ fontWeight: 500, fontSize: 15 }}>{t.out}</div>
              {c && <div style={{ fontFamily: F.mono, fontSize: 11, color: F.label }}>cubic-bezier({c.join(', ')})</div>}
            </div>
            <div style={{ flex: 1, lineHeight: 1.45 }}>
              <div style={{ fontSize: 13 }}>{USE_FOR[t.figma]}</div>
              <div style={{ fontSize: 12, color: F.body }}>{used.length ? `Used by: ${used.join(' · ')}` : 'Not aliased by any component group'}</div>
            </div>
            <MotionDemo duration="var(--duration-medium)" easing={`var(${t.css})`} label={`${t.figma} demo`} />
          </div>
        );
      })}
    </Ref>
  ),
};
