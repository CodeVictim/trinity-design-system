import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ref, SectionTitle, InfoCallout, NoteBox, SimpleTable, Code, CodeBlock } from '../../shared/doc-kit';
import { MotionDemo } from './MotionDemo';

const meta = { title: 'Trinity/Foundation/Motion/Reduced Motion', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

function SystemSetting() {
  const q = '(prefers-reduced-motion: reduce)';
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q); const f = () => setOn(m.matches);
    m.addEventListener('change', f); return () => m.removeEventListener('change', f);
  }, []);
  return <NoteBox>Your system setting right now: reduced motion is <b>{on ? 'ON' : 'OFF'}</b>. {on ? 'The moving demo below jumps; the fade still fades.' : 'Turn it on in your OS settings to see the demos below change.'}</NoteBox>;
}

const rows: ReactNode[][] = [
  ['Button, Checkbox, Radio, Chip, Card, inputs, tabs, menu items', 'Colour fade', 'Unchanged — colour only, nothing moves'],
  ['Spinner', '800ms linear rotation, infinite', <>Slows to 1500ms (<Code>--spinner-reduced-duration</Code>) — essential feedback, so it doesn’t stop</>],
  ['Toggle', 'Knob slides 200ms', <>Knob jumps (<Code>--toggle-reduced-duration</Code> = 0ms); colour still fades</>],
  ['Accordion, Nav section, Nav topbar, Table row', 'Height expand 300ms + chevron rotate', <>Opens instantly (<Code>…-reduced-duration</Code> = 0ms); chevron swaps</>],
  ['Progress Bar', 'Value eases 300ms', <>Value jumps (<Code>--progress-bar-reduced-duration</Code> = 0ms)</>],
  ['Menus, dropdowns, date picker, tooltip', 'Fade + small slide', 'Fade only'],
  ['Modal / Drawer', 'Fade + scale / drawer slides 300ms', 'Fade only'],
  ['Notification', 'Slide + fade', 'Fade only; auto-dismiss must be pausable (WCAG 2.2.2)'],
  ['Banner', 'Fade out on dismiss', 'Unchanged (already only a fade)'],
];

export const ReducedMotion: Story = {
  name: 'Reduced Motion',
  render: () => (
    <Ref>
      <InfoCallout>
        Trinity <b>reduces</b> motion rather than removing it. Colour and opacity fades stay (they aren’t movement). Movement —
        slide, scale, rotate, height — becomes instant or a fade. Every component that animates ships its own
        <Code>@media (prefers-reduced-motion: reduce)</Code> block, in the component that handles the motion. Focus rings never transition.
      </InfoCallout>
      <SystemSetting />
      <SectionTitle>Try it</SectionTitle>
      <div style={{ display: 'grid', gap: 12 }}>
        <div><div style={{ fontSize: 12, marginBottom: 4 }}>Movement (300ms, ease-out) — jumps under reduced motion</div><MotionDemo duration="var(--duration-medium)" label="movement demo" /></div>
        <div><div style={{ fontSize: 12, marginBottom: 4 }}>Fade (300ms, ease-out) — stays under reduced motion</div><MotionDemo duration="var(--duration-medium)" label="fade demo" fade /></div>
      </div>
      <SectionTitle>What each component does</SectionTitle>
      <SimpleTable head={['Component', 'Normally', 'Under reduced motion']} rows={rows} />
      <SectionTitle>Pattern</SectionTitle>
      <CodeBlock>{`.tri-toggle__knob { transition: transform var(--toggle-duration) var(--toggle-easing); }
.tri-toggle__track { transition: background-color var(--toggle-duration) var(--toggle-easing); }

@media (prefers-reduced-motion: reduce) {
  .tri-toggle__knob { transition-duration: var(--toggle-reduced-duration); } /* movement → instant */
  /* the track colour fade is left alone */
}`}</CodeBlock>
      <SectionTitle>WCAG</SectionTitle>
      <SimpleTable head={['Criterion', 'What it means here']} rows={[
        ['2.3.3 Animation from Interactions (AAA, house rule)', 'Movement can be turned off via the OS setting — see the table above'],
        ['2.3.1 Three Flashes (A)', 'Nothing flashes more than 3 times per second'],
        ['2.2.2 Pause, Stop, Hide (A)', 'Anything that moves or auto-updates for more than 5 seconds can be paused (auto-dismissing notifications)'],
        ['2.4.7 Focus Visible (AA)', 'Focus rings snap on — no transition, under any setting'],
      ]} />
    </Ref>
  ),
};
