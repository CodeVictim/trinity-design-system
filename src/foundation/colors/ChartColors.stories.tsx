import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens, contrast, F } from '../../shared/doc-kit';
import { FAMILIES, type Family } from './chart-colors-data';

// Follows the Figma frame "Trinity — Chart Colors" (66095:69148, 🎨 Color page) section by section, in its order.
// Swatches use the real --data-charts-* / neutral tokens; every ratio is measured from them, never retyped.
const meta = { title: 'Trinity/Foundation/Colors/Chart Colors', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

// ---------- token helpers ----------
const v = (path: string) => `var(--${path.toLowerCase().replace(/[\/\s]+/g, '-')})`;
const hexOf = (path: string) => String(tokens.find(t => t.figma === path)?.value ?? '#000000');
const r2 = (n: number) => n.toFixed(2);
const WHITE = '#ffffff', LABEL_DARK = hexOf('neutral/950'), CARD_LIGHT = '#ffffff', CARD_DARK = hexOf('neutral/850');
const bestLabel = (hex: string) => (contrast(hex, WHITE) >= contrast(hex, LABEL_DARK) ? WHITE : LABEL_DARK);
const AREA_ORDER = ['quality', 'materials-mixes', 'contractor-experience', 'sustainability', 'operations', 'adoption']; // default VPI order
const fam = (key: string) => FAMILIES.find(f => f.key === key)!;
const SHORT: Record<string, string> = { quality: 'Quality', 'materials-mixes': 'Materials', 'contractor-experience': 'Contractor', sustainability: 'Sustain.', operations: 'Operations', adoption: 'Adoption' };

// ---------- styles (module-level constants) ----------
const page: CSSProperties = { fontFamily: F.font, color: F.ink, maxWidth: 1100, background: '#faf9f6', padding: '40px 32px 48px', boxSizing: 'border-box' }; // the frame's own background
const h1: CSSProperties = { fontSize: 40, fontWeight: 500, margin: '8px 0 12px', lineHeight: 1.15 };
const lead: CSSProperties = { fontSize: 15, lineHeight: 1.6, color: F.body, margin: '0 0 20px' };
const h2: CSSProperties = { fontSize: 22, fontWeight: 500, margin: '56px 0 6px' };
const h3: CSSProperties = { fontSize: 16, fontWeight: 500, margin: '24px 0 10px' };
const intro: CSSProperties = { fontSize: 13, lineHeight: 1.6, color: F.body, margin: '0 0 20px' };
const small: CSSProperties = { fontSize: 11, color: F.label, lineHeight: 1.45 };
const mono: CSSProperties = { fontFamily: F.mono, fontSize: 11, overflowWrap: 'anywhere' };
const two: CSSProperties = { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 32, alignItems: 'start' };
const darkPanel: CSSProperties = { background: CARD_DARK, color: '#faf9f6', borderRadius: 8, padding: '20px 16px' };
const lightPanel: CSSProperties = { background: CARD_LIGHT, borderRadius: 8, padding: '20px 16px' };
const greyPanel: CSSProperties = { background: '#f0eeea', borderRadius: 8, padding: '20px 16px' };
const rowLine: CSSProperties = { display: 'grid', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: `1px solid ${F.line}` };
const chip = (bg: string, extra: CSSProperties = {}): CSSProperties => ({ width: 62, height: 26, borderRadius: 4, background: bg, border: '1px solid rgba(0,0,0,0.25)', ...extra });
const num: CSSProperties = { fontSize: 22, color: F.label, fontWeight: 500 };

const Swatch = ({ bg, label, dashed }: { bg: string; label: string; dashed?: boolean }) => (
  <div><div style={dashed ? chip('transparent', { border: `2px dashed ${bg}` }) : chip(bg)} /><div style={{ ...small, marginTop: 4 }}>{label}</div></div>
);
const RankRow = ({ n, title, desc, children }: { n: number; title: string; desc: string; children: ReactNode }) => (
  <div style={{ ...rowLine, gridTemplateColumns: '40px 420px 1fr' }}>
    <span style={num}>{n}</span>
    <div><div style={{ fontSize: 16, fontWeight: 500 }}>{title}</div><div style={{ fontSize: 12, color: F.body, marginTop: 4, lineHeight: 1.5 }}>{desc}</div></div>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{children}</div>
  </div>
);
const Rules = ({ title = 'Rules', items }: { title?: string; items: string[] }) => (
  <div style={{ ...greyPanel, marginTop: 24 }}>
    <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 10 }}>{title}</div>
    {items.map((t, i) => <div key={i} style={{ fontSize: 13, lineHeight: 1.6, margin: '6px 0' }}>{i + 1}. {t}</div>)}
  </div>
);
const onCard = (hex: string, card: string) => `${r2(contrast(hex, card))}:1 on card`;

// ---------- sections ----------
const Overview = () => (
  <section>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ ...small, letterSpacing: '0.04em' }}>TRINITY / DATA VISUALIZATION</span>
      <span style={{ fontSize: 11, fontWeight: 500, border: `1px solid ${F.ink}`, padding: '4px 10px', borderRadius: 2 }}>APPROVED · 2026-10-22</span>
    </div>
    <h1 style={h1}>Trinity — Chart Colors</h1>
    <p style={lead}>Six fixed colors, one per business area, used only for data. Light mode is the branded version; dark mode keeps each hue and lightens it. Every swatch on this page is bound to its primitive in Brand Colors › data/charts.</p>
    <div style={{ ...greyPanel, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {[['Data only', 'Charts, the VPI bar, savings bars, area cards and legends. Never buttons, navigation or status.'],
        ['One area, one color', 'Ops data is always this orange, everywhere. Color comes from the area, never from list position.'],
        ['Every color passes AA', 'Fills 3:1 on the card, labels and text 4.5:1, touching marks split by a 2px card-color gap.']].map(([t, d]) => (
        <div key={t}><div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div><div style={{ fontSize: 12, color: F.body, marginTop: 6, lineHeight: 1.5 }}>{d}</div></div>
      ))}
    </div>
  </section>
);

const StartHere = () => (
  <section>
    <h2 style={{ ...h2, marginTop: 40 }}>Start here · which rule applies?</h2>
    {[['Does the chart compare areas?', 'Use the six area colors.', '§ 03'],
      ['Is it one area with several series?', 'Use that area’s shade family, up to three. More than three: step 4.', '§ 06'],
      ['Is it a metric (slump, water, temperature) with no category?', 'Use the page owner’s color, or Ink if no area owns it.', '§ 08'],
      ['More than three things in one chart?', 'Highlight one, grey the rest, or split into small multiples.', '§ 01 · 06'],
      ['Is it up, down or a broken limit?', 'Status color, always with an arrow or word.', '§ 01']].map(([q, a, s], i) => (
      <div key={q} style={{ ...rowLine, gridTemplateColumns: '28px 420px 1fr 70px' }}>
        <span style={{ ...num, fontSize: 16 }}>{i + 1}</span><b style={{ fontSize: 13, fontWeight: 500 }}>{q}</b>
        <span style={{ fontSize: 13, color: F.body }}>{a}</span><span style={{ ...small, textAlign: 'right' }}>{s}</span>
      </div>
    ))}
    <p style={{ ...small, marginTop: 10 }}>Check the steps in order and stop at the first yes.</p>
  </section>
);

const Hierarchy = () => (
  <section>
    <h2 style={h2}>01 / Color hierarchy</h2>
    <p style={intro}>Six roles, ranked. When two roles want the same color, the higher one keeps it and the lower one changes form: grey, a dash, an icon or a separate chart.</p>
    <RankRow n={1} title="Area identity" desc="The six area colors. Highest rank: whenever a chart shows areas, these win.">
      {AREA_ORDER.map(k => <Swatch key={k} bg={v(fam(k).area.light.fill)} label={SHORT[k]} />)}
    </RankRow>
    <RankRow n={2} title="Single series" desc="One metric, one color. Inside an area’s view use that area’s color. With no area, use Ink.">
      <Swatch bg={v('data/charts/operations/500')} label="In Ops view" /><Swatch bg="#56524b" label="No area" />
    </RankRow>
    <RankRow n={3} title="Highlight + context" desc="One series in its area color; everything else in Context grey. This is how charts scale past six.">
      <Swatch bg={v('data/charts/operations/500')} label="Highlight" /><Swatch bg="#8a867f" label="Context" />
    </RankRow>
    <RankRow n={4} title="Reference markers" desc="You, goal, average, top 10%. Ink with a shape or dash, never a hue, so they never read as an area.">
      <Swatch bg="#211f1c" label="You · solid" /><Swatch bg="#706a5c" label="Avg · dashed" />
    </RankRow>
    <RankRow n={5} title="Status" desc="Up and down only. Always arrow or word. Never in the same chart as area colors.">
      <Swatch bg="#457676" label="Positive" /><Swatch bg="#d70100" label="Negative" />
    </RankRow>
    <RankRow n={6} title="Surfaces" desc="Card, track and grid. Quiet by design so everything above stays readable.">
      <Swatch bg="#ffffff" label="Card" /><Swatch bg={v('neutral/100')} label="Open track" /><Swatch bg="#e5e1db" label="Grid" />
    </RankRow>
  </section>
);

const AreaEntry = ({ f, mode }: { f: Family; mode: 'light' | 'dark' }) => {
  const a = f.area[mode];
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 16, fontWeight: 500, margin: '0 0 8px' }}>{a.mapping}</div>
      <div style={{ background: v(a.fill), color: v(a.label), fontSize: 12, fontWeight: 500, padding: '10px 10px' }}>{f.name}</div>
      <div style={{ fontSize: 11, marginTop: 6 }}>Fill {hexOf(a.fill).toUpperCase()} · Label {hexOf(a.label).toUpperCase()} · Text {hexOf(a.text).toUpperCase()}</div>
      <div style={{ ...mono, fontSize: 10, opacity: 0.8 }}>Fill {a.fill} · Label {a.label} · Text {a.text}</div>
      <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>label on fill {r2(contrast(hexOf(a.label), hexOf(a.fill)))}:1 · text on card {r2(contrast(hexOf(a.text), mode === 'dark' ? CARD_DARK : CARD_LIGHT))}:1</div>
      {a.note && <div style={{ fontSize: 11, color: F.body, marginTop: 6 }}>{a.note}</div>}
    </div>
  );
};
const AreaPalette = () => (
  <section>
    <h2 style={h2}>03 / Area palette</h2>
    <p style={intro}>Fill is the mark. Label sits on the fill. Text is the area color used as type on the card.</p>
    <div style={two}>
      <div style={lightPanel}><div style={{ ...h3, marginTop: 0 }}>Light · card #FFFFFF (brand version)</div>{FAMILIES.map(f => <AreaEntry key={f.key} f={f} mode="light" />)}</div>
      <div style={darkPanel}><div style={{ ...h3, marginTop: 0 }}>Dark · card #2F2D28</div>{FAMILIES.map(f => <AreaEntry key={f.key} f={f} mode="dark" />)}</div>
    </div>
  </section>
);

const Primitives = () => (
  <section>
    <h2 style={h2}>02 / Primitives · Brand Colors › data/charts</h2>
    <p style={intro}>Every data color lives once in Brand Colors as a ramp, light → dark, in the same format as the Color Legend. Each swatch is bound to its variable; the line under the hex says where that stop is used in light and dark mode.</p>
    {FAMILIES.map(f => (
      <div key={f.key} style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 16, fontWeight: 500 }}>{f.name}</div>
        <div style={{ ...small, margin: '4px 0 10px' }}>{f.subtitle}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {f.stops.map(s => { const path = `data/charts/${f.key}/${s.step}`; return (
            <div key={s.step} style={{ width: 99 }}>
              <div style={{ height: 40, borderRadius: 4, background: v(path), border: '1px solid rgba(0,0,0,0.08)' }} />
              <div style={{ fontSize: 11, fontWeight: 500, marginTop: 4 }}>{s.step}</div>
              <div style={{ ...mono, fontSize: 10 }}>{hexOf(path).toUpperCase()}</div>
              <div style={{ fontSize: 9.5, color: F.label, marginTop: 2 }}>{s.note}</div>
            </div>); })}
        </div>
      </div>
    ))}
  </section>
);

const UsageRules = () => (
  <section>
    <h2 style={h2}>04 / Usage rules</h2>
    <div style={two}>
      <div style={{ padding: '16px 0' }}><div style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>Do</div>
        {['One area, one color, everywhere. Color comes from the area, never from list position, sort or filter.', 'Light mode is the brand version. Dark mode keeps the same hue, only lighter.', 'Split touching marks with a 2px gap in the card color. This is what makes neighbors pass AA in any order.', 'Always show the area name and value next to the color: legend or direct label.', 'Default VPI order: Quality, Materials, Contractor, Sustainability, Operations, Adoption.'].map((t, i) => <div key={i} style={{ fontSize: 13, lineHeight: 1.6, margin: '6px 0' }}>{i + 1}. {t}</div>)}
      </div>
      <div style={greyPanel}><div style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}>Don’t</div>
        {['Don’t add a seventh hue. Past six series, or with no area meaning, use highlight + context grey or tints of one color.', 'Don’t give markers (you, goal, average, top 10%) a hue. Use ink with a shape or dash.', 'Don’t show status colors in the same chart as area colors.', 'Don’t push Materials redder, or move Adoption toward a medium violet in light mode. Both break separation.', 'Don’t use Verifi Yellow (#E3F200) or tooltip-only identification for data.'].map((t, i) => <div key={i} style={{ fontSize: 13, lineHeight: 1.6, margin: '6px 0' }}>{i + 1}. {t}</div>)}
      </div>
    </div>
  </section>
);

const VPI = [18, 6, 7, 8, 10, 10];
const InUsePanel = ({ mode }: { mode: 'light' | 'dark' }) => {
  const track = mode === 'dark' ? v('neutral/600') : v('neutral/100');
  return (
    <div style={mode === 'dark' ? darkPanel : lightPanel}>
      <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}>VPI bar · area identity</div>
      <div style={{ display: 'flex', height: 20, background: track, borderRadius: 2, overflow: 'hidden' }}>
        {AREA_ORDER.map((k, i) => { const a = fam(k).area[mode]; return (
          <div key={k} style={{ width: `${VPI[i]}%`, background: v(a.fill), color: v(a.label), fontSize: 10, padding: '3px 6px', boxSizing: 'border-box', borderRight: `2px solid ${mode === 'dark' ? CARD_DARK : CARD_LIGHT}` }}>{VPI[i]}</div>); })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 11, margin: '10px 0 16px' }}>
        {AREA_ORDER.map((k, i) => <span key={k}><span style={{ display: 'inline-block', width: 8, height: 8, background: v(fam(k).area[mode].fill), marginRight: 4 }} />{fam(k).name === 'Materials & Mixes' ? 'Materials' : fam(k).name === 'Contractor Experience' ? 'Contractor' : fam(k).name} {VPI[i]}</span>)}
      </div>
      <div style={{ fontSize: 15, fontWeight: 500, margin: '16px 0 10px', paddingTop: 16, borderTop: `1px solid ${mode === 'dark' ? '#4a463f' : F.line}` }}>Highlight + context · Operations view</div>
      {[['Operations', 18, true], ['Quality', 14, false], ['Materials', 9, false], ['Sustainability', 6, false]].map(([n, val, hi]) => (
        <div key={n as string} style={{ display: 'grid', gridTemplateColumns: '86px 1fr', alignItems: 'center', gap: 8, margin: '8px 0', fontSize: 11 }}>
          <span style={{ fontWeight: hi ? 600 : 400 }}>{n}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ display: 'inline-block', height: 14, width: `${(val as number) / 18 * 80}%`, background: hi ? v(fam('operations').area[mode].fill) : '#8a867f' }} /><span style={{ fontWeight: hi ? 600 : 400 }}>£{val as number}K</span></span>
        </div>
      ))}
      <div style={{ fontSize: 11, opacity: 0.75, marginTop: 10 }}>Only the area in focus gets its color. Everything else is Context grey #8A867F.</div>
    </div>
  );
};
const InUse = () => (
  <section>
    <h2 style={h2}>05 / In use</h2>
    <p style={intro}>The same data in both modes. Values are illustrative.</p>
    <div style={two}><InUsePanel mode="light" /><InUsePanel mode="dark" /></div>
  </section>
);

const ShadeTable = ({ mode }: { mode: 'light' | 'dark' }) => (
  <div style={mode === 'dark' ? darkPanel : lightPanel}>
    <div style={{ ...h3, marginTop: 0 }}>{mode === 'dark' ? 'Dark · base, lighter, darker' : 'Light · base, darker, darkest'}</div>
    {FAMILIES.map(f => (
      <div key={f.key} style={{ display: 'grid', gridTemplateColumns: '120px repeat(3, 1fr)', gap: 8, alignItems: 'center', margin: '0 0 12px' }}>
        <span style={{ fontSize: 11, fontWeight: 500 }}>{f.name}</span>
        {f.shades[mode].map((p, i) => (
          <div key={p}><div style={{ height: 18, background: v(p), borderRadius: 2 }} />
            <div style={{ fontSize: 9.5, opacity: 0.8, marginTop: 3 }}>{['Base', 'Shade 2', 'Shade 3'][i]} {hexOf(p).toUpperCase()} · {r2(contrast(hexOf(p), mode === 'dark' ? CARD_DARK : CARD_LIGHT))}:1</div>
            <div style={{ ...mono, fontSize: 9, opacity: 0.65 }}>{p}</div></div>
        ))}
      </div>
    ))}
    {mode === 'light' && <div style={{ fontSize: 11, color: F.body, marginTop: 8 }}>Adoption is the exception in light mode: its base is already deep, so its extra shades go lighter.</div>}
  </div>
);
const DRILL = [[60, 48, 30], [70, 54, 42], [62, 58, 44], [80, 62, 48]];
const DrillChart = ({ mode }: { mode: 'light' | 'dark' }) => {
  const sh = fam('quality').shades[mode];
  return (
    <div style={mode === 'dark' ? darkPanel : lightPanel}>
      <div style={{ display: 'flex', gap: 14, fontSize: 10, marginBottom: 12 }}>
        {['Plant A', 'Plant B', 'Plant C'].map((p, i) => <span key={p}><span style={{ display: 'inline-block', width: 8, height: 8, background: v(sh[i]), marginRight: 4 }} />{p}</span>)}
        <span><span style={{ display: 'inline-block', width: 7, height: 7, border: `1px dashed ${v(sh[0])}`, marginRight: 4 }} />Target</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22, height: 110, borderBottom: `1px solid ${mode === 'dark' ? '#4a463f' : '#d3cec6'}` }}>
        {DRILL.map((m, mi) => (
          <div key={mi} style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
            {m.map((h, i) => <div key={i} style={{ width: 18, height: h, background: v(sh[i]) }} />)}
            <div style={{ width: 16, height: 72, border: `1px dashed ${v(sh[0])}`, boxSizing: 'border-box' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 22, fontSize: 9.5, marginTop: 4 }}>{['Jul', 'Aug', 'Sep', 'Oct'].map(m => <span key={m} style={{ width: 76, textAlign: 'center' }}>{m}</span>)}</div>
      <div style={{ fontSize: 11, opacity: 0.75, marginTop: 10 }}>Three shades of one hue, 2px gaps between bars, target as a dashed outline in the base color.</div>
    </div>
  );
};
const SingleArea = () => {
  const q = fam('quality'); const L = q.shades.light;
  return (
    <section>
      <h2 style={h2}>06 / Single-area charts</h2>
      <p style={intro}>When a chart shows only one area (a QC drill-down, an Ops trend) with several data series, the area color becomes a family of up to three shades of the same hue. Past three, use grey, a dash or a hatch, never more color.</p>
      <RankRow n={1} title="Main series" desc="The area’s base color. Exactly one series gets it, usually this period or this plant."><Swatch bg={v(L[0])} label="Base" /></RankRow>
      <RankRow n={2} title="Second and third series" desc="Shades of the same hue. Light mode goes darker; dark mode goes one lighter, one darker."><Swatch bg={v(L[1])} label="Shade 2" /><Swatch bg={v(L[2])} label="Shade 3" /></RankRow>
      <RankRow n={3} title="Comparisons" desc="Last period, target, forecast: the color of the series it compares to, dashed (lines) or hatched (bars). Never a new shade."><Swatch bg={v(L[0])} label="Dashed / hatched" dashed /></RankRow>
      <RankRow n={4} title="More than three series" desc="Highlight one in the base color and grey the rest, or split into small multiples."><Swatch bg={v(L[0])} label="Highlight" /><Swatch bg="#8a867f" label="Context" /></RankRow>
      <RankRow n={5} title="Ordered data" desc="Heatmaps and ranges may use the full light-to-dark ramp. Every cell shows its value.">
        {q.ramps.light.map(r => <Swatch key={r.level} bg={v(r.token)} label={r.level} />)}
      </RankRow>
      <h3 style={{ ...h3, fontSize: 18, marginTop: 32 }}>Shade families · every shade passes 3:1 on its card</h3>
      <div style={two}><ShadeTable mode="light" /><ShadeTable mode="dark" /></div>
      <h3 style={{ ...h3, fontSize: 18, marginTop: 32 }}>Example · Quality drill-down, three plants + target</h3>
      <div style={two}><DrillChart mode="light" /><DrillChart mode="dark" /></div>
      <Rules items={['One area’s chart uses one hue: up to three shades, base color first.', 'Light mode: extra shades go darker. Lighter tints fail 3:1 on white (Adoption excepted, see above).', 'Dark mode: one shade lighter, one darker. All listed shades pass on #2F2D28.', 'Comparisons reuse their series color as a dash or hatch. They never take a new shade.', 'More than three series: highlight one, grey the rest (#8A867F), or use small multiples.', 'Never borrow another area’s color for a second series. A blue line in an Ops chart reads as Quality.', 'Ordered data (heatmaps, ranges) may use the full ramp, with the value shown in every cell.', 'Keep the darkest Operations shade away from Materials data; it drifts toward brown.']} />
    </section>
  );
};

const RampPanel = ({ mode }: { mode: 'light' | 'dark' }) => {
  const card = mode === 'dark' ? CARD_DARK : CARD_LIGHT;
  return (
    <div style={mode === 'dark' ? darkPanel : lightPanel}>
      <div style={{ ...h3, marginTop: 0 }}>{mode === 'dark' ? 'Dark · card #2F2D28' : 'Light · card #FFFFFF'}</div>
      {FAMILIES.map(f => (
        <div key={f.key} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 6 }}>{f.name}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {f.ramps[mode].map(r => { const hex = hexOf(r.token); const lbl = bestLabel(hex); return (
              <div key={r.level}>
                <div style={{ background: v(r.token), color: lbl, padding: '8px 8px', minHeight: 48, boxSizing: 'border-box' }}>
                  <div style={{ fontSize: 10, fontWeight: 500 }}>{r.level}</div><div style={{ fontSize: 13, fontWeight: 600 }}>{hex.toUpperCase()}</div>
                </div>
                <div style={{ fontSize: 9.5, opacity: 0.75, marginTop: 4 }}>{r2(contrast(hex, card))}:1 card · {contrast(hex, lbl).toFixed(1)}:1 text</div>
                <div style={{ ...mono, fontSize: 9, opacity: 0.65 }}>{r.token}</div>
              </div>); })}
          </div>
        </div>
      ))}
    </div>
  );
};
const OrderedRamps = () => (
  <section>
    <h2 style={h2}>07 / Ordered ramps · Low → Mid → High → Max</h2>
    <p style={intro}>For heatmaps and ranges only, with the value shown in every cell. Each swatch is bound to its primitive; under it: contrast on the card, contrast of the cell label, and the primitive name.</p>
    <div style={two}><RampPanel mode="light" /><RampPanel mode="dark" /></div>
  </section>
);

const Line = ({ color, dashed }: { color: string; dashed?: boolean }) => <span style={{ display: 'inline-block', width: 26, borderTop: `2px ${dashed ? 'dashed' : 'solid'} ${color}`, verticalAlign: 'middle' }} />;
const MetricChart = ({ title, legend2, mode, low }: { title: string; legend2: string; mode: 'light' | 'dark'; low?: boolean }) => {
  const ink = mode === 'dark' ? '#faf9f6' : '#211f1c'; const metric = v(fam('quality').area[mode].fill); const grid = mode === 'dark' ? '#4a463f' : '#d3cec6';
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{title}</div>
      <div style={{ display: 'flex', gap: 10, fontSize: 9.5, margin: '6px 0' }}><span><Line color={metric} /> {title}</span><span><Line color={ink} dashed /> {legend2}</span><span><span style={{ display: 'inline-block', width: 9, height: 9, background: 'rgba(138,134,127,0.2)', border: '1px solid #8a867f', verticalAlign: 'middle' }} /> Discharge</span></div>
      <svg viewBox="0 0 240 110" width="100%" role="img" aria-label={`${title} example chart`}>
        {[100, 150, 180].map(x => <rect key={x} x={x} y="5" width="14" height="100" fill="rgba(138,134,127,0.2)" stroke="#8a867f" strokeWidth="1" />)}
        {[40, 46, 210, 222].map(x => <line key={x} x1={x} x2={x} y1="5" y2="105" stroke={ink} strokeWidth="0.6" />)}
        <line x1="10" x2="230" y1="105" y2="105" stroke={grid} />
        <line x1="20" x2="230" y1={low ? 8 : 18} y2={low ? 8 : 18} stroke={ink} strokeDasharray="3 3" strokeWidth="1" />
        <polyline fill="none" stroke={metric} strokeWidth="2" points={low ? '10,105 38,105 42,62 230,62' : '10,105 25,105 30,28 40,22 60,20 230,20'} />
      </svg>
    </div>
  );
};
const OtherMetrics = () => (
  <section>
    <h2 style={h2}>08 / Charts with other metrics</h2>
    <p style={intro}>Slump, water, drum speed, temperature and similar measurements are not categories, so they never get their own hue. A metric takes the color of the area that owns the page. With no owner, it uses Ink.</p>
    <h3 style={h3}>Why: a hue per metric collides with the areas</h3>
    <div style={two}>
      <div style={greyPanel}><div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>Before · one hue per metric</div>
        {[['Slump', 'reads as Sustainability', v('data/charts/sustainability/500')], ['Admix', 'reads as Operations', v('data/charts/operations/500')], ['Temperature', 'reads as Adoption', v('data/charts/adoption/400')], ['Drum speed', 'reads as Materials', v('data/charts/materials-mixes/600')], ['Revolutions', 'reads as a problem', '#d70100']].map(([m, r, c]) => (
          <div key={m} style={{ display: 'grid', gridTemplateColumns: '36px 110px 1fr', alignItems: 'center', fontSize: 12, margin: '8px 0' }}><Line color={c} /><b style={{ fontWeight: 500 }}>{m}</b><span style={{ color: '#b40100' }}>{r}</span></div>))}
      </div>
      <div style={{ padding: '20px 16px' }}><div style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>After · on a QC page, every metric is Quality blue</div>
        {['Slump', 'Admix', 'Temperature', 'Drum speed', 'Revolutions'].map(m => (
          <div key={m} style={{ display: 'grid', gridTemplateColumns: '36px 110px 1fr', alignItems: 'center', fontSize: 12, margin: '8px 0' }}><Line color={v('data/charts/quality/600')} /><b style={{ fontWeight: 500 }}>{m}</b><span style={{ color: F.body, fontSize: 11 }}>Quality #0975C3 · chart title names the metric</span></div>))}
      </div>
    </div>
    <h3 style={h3}>Every part of a metric chart</h3>
    {[[<Line color={v('data/charts/quality/600')} />, 'Metric line or bars', 'Owner area base color · Ink if no owner'],
      [<Line color={v('data/charts/quality/700')} />, 'Second metric on the same chart', 'Owner area shade 2'],
      [<Line color="#211f1c" dashed />, 'Target, limit, max allowed', 'Ink, dashed'],
      [<Line color="#d70100" />, 'A value that breaks a limit', 'Negative status, with icon or word'],
      [<span style={{ display: 'inline-block', width: 40, height: 16, background: 'rgba(138,134,127,0.2)', border: '1px solid #8a867f' }} />, 'Context bands (discharge, shifts)', '#8A867F at 20% fill + 1px #8A867F edges. The fill alone is 1.24:1 and fails; the edges pass (3.62:1 light, 3.80:1 dark).'],
      [<span style={{ display: 'inline-block', width: 1, height: 18, background: '#211f1c' }} />, 'Event markers (LP, AS, BP, LS, RP)', 'Ink, 1px line + label'],
      [<b>×</b>, 'Mean or median marker', 'Ink with a shape (× or bar), never a hue'],
      [<span style={{ display: 'inline-flex' }}>{fam('quality').ramps.light.map(r => <span key={r.level} style={{ width: 12, height: 16, background: v(r.token) }} />)}</span>, 'Ordered scale (acceptance %)', 'Owner area ramp, light to dark, ends labeled']].map(([g, t, d], i) => (
      <div key={i} style={{ ...rowLine, gridTemplateColumns: '60px 290px 1fr', padding: '10px 0' }}>{g}<b style={{ fontSize: 12, fontWeight: 500 }}>{t}</b><span style={{ fontSize: 12, color: F.body }}>{d}</span></div>
    ))}
    <h3 style={h3}>Example · load detail on a QC page</h3>
    <div style={two}>
      <div style={{ ...lightPanel, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><MetricChart title="Slump" legend2="Target slump" mode="light" /><MetricChart title="Water" legend2="Maximum allowed water" mode="light" low /><div style={{ gridColumn: '1 / -1', fontSize: 11, color: F.body }}>Metric in the owner’s color. Target and max are dashed ink. Discharge periods are a 20% grey band with 1px #8A867F edges, so the band passes 3:1. Phase markers are thin ink lines.</div></div>
      <div style={{ ...darkPanel, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><MetricChart title="Slump" legend2="Target slump" mode="dark" /><MetricChart title="Water" legend2="Maximum allowed water" mode="dark" low /><div style={{ gridColumn: '1 / -1', fontSize: 11, opacity: 0.75 }}>Metric in the owner’s color. Target and max are dashed ink. Discharge periods are a 20% grey band with 1px #8A867F edges, so the band passes 3:1. Phase markers are thin ink lines.</div></div>
    </div>
    <Rules items={['Metrics are not categories. Never assign a hue per metric.', 'Use the color of the area that owns the page: load detail and slump-water views are QC, contractor time on site is Contractor Experience.', 'If no area owns the page, use Ink (#36322D light / #FFFFFF dark).', 'Two metrics on one chart: owner base + owner shade 2. Three: add shade 3. More: split the chart.', 'Targets and limits are dashed ink. Red appears only on a value that actually breaks a limit, with an icon or word.', 'Context bands, event markers and mean markers stay neutral, so they never read as data. A band needs edges or a hatch at 3:1; a light fill alone fails AA.', 'Never add a new palette. If a chart seems to need one, split it or use highlight + context.']} />
  </section>
);

type N = [string, string, string, string | null, boolean?];
const NEUTRALS_LIGHT: N[] = [
  ['Ink · text, “You” marker, targets (dashed)', '#211F1C', 'Chart ink', 'neutral/900'], ['No area · single series', '#211F1C', 'Ink, per the frame’s rule', 'neutral/900'],
  ['Secondary text · “Avg” marker (dashed)', '#706A5C', 'Secondary text pair', null], ['Context grey', '#8A867F', 'Same in both modes', null],
  ['Context band · 20% fill + 1px edge', '#8A867F', 'Fill fails alone; the edge passes', null, true], ['Positive status', '#457676', 'Same hue, lightened to pass 4.5:1', null],
  ['Negative status', '#D70100', 'Approved dark Negative', 'status/error/500'], ['Open track', '#DFDEDD', 'Empty part of a bar', 'neutral/100'],
  ['Grid', '#E5E1DB', 'Grid line', null], ['Axis line', '#D3CEC6', 'Chart axis', null], ['Card', '#FFFFFF', 'Surface everything sits on', 'neutral/0']];
const NEUTRALS_DARK: N[] = [
  ['Ink · text, “You” marker, targets (dashed)', '#FAF9F6', 'Chart ink', null], ['No area · single series', '#FAF9F6', 'Ink, per the frame’s rule', null],
  ['Secondary text · “Avg” marker (dashed)', '#D3CEC6', 'Secondary text pair', null], ['Context grey', '#8A867F', 'Same in both modes', null],
  ['Context band · 20% fill + 1px edge', '#8A867F', 'Fill fails alone; the edge passes', null, true], ['Positive status', '#6B9D9D', 'Same hue, lightened to pass 4.5:1', null],
  ['Negative status', '#FF8A80', 'Approved dark Negative', null], ['Open track', '#565147', 'Empty part of a bar', 'neutral/600'],
  ['Grid', '#4A463F', 'Grid line', null], ['Axis line', '#565147', 'Chart axis', 'neutral/600'], ['Card', '#2F2D28', 'Surface everything sits on', 'neutral/850']];
const NeutralPanel = ({ mode }: { mode: 'light' | 'dark' }) => {
  const card = mode === 'dark' ? CARD_DARK : CARD_LIGHT; const list = mode === 'dark' ? NEUTRALS_DARK : NEUTRALS_LIGHT;
  return (
    <div style={mode === 'dark' ? darkPanel : lightPanel}>
      <div style={{ ...h3, marginTop: 0 }}>{mode === 'dark' ? 'Dark · card #2F2D28' : 'Light · card #FFFFFF'}</div>
      {list.map(([name, hex, note, prim, band]) => (
        <div key={name} style={{ display: 'grid', gridTemplateColumns: '68px 1fr', gap: 12, alignItems: 'center', margin: '0 0 10px' }}>
          <div style={{ height: 32, borderRadius: 4, background: band ? 'rgba(138,134,127,0.2)' : prim ? v(prim) : hex, border: band ? '1px solid #8a867f' : '1px solid rgba(128,128,128,0.35)' }} />
          <div style={{ lineHeight: 1.35 }}>
            <div style={{ fontSize: 12, fontWeight: 500 }}>{name}</div>
            <div style={{ fontSize: 10, opacity: 0.8 }}>{hex}{band ? ' @ 20% + 1px edge' : ''} · {onCard(hex.toLowerCase(), card)} · {note}</div>
            <div style={{ fontSize: 10, color: prim ? 'inherit' : mode === 'dark' ? '#f0907a' : '#a8422a', opacity: prim ? 0.7 : 1 }}>{prim ?? 'no primitive yet'}</div>{/* 5.88:1 / 6.04:1 — passes 4.5:1 */}
          </div>
        </div>
      ))}
    </div>
  );
};
const Neutrals = () => (
  <section>
    <h2 style={h2}>09 / Neutrals, markers and status</h2>
    <p style={intro}>Supporting colors for every chart. Bound to a primitive where one exists. Colors marked “no primitive yet” are used by the approved charts but are not in Brand Colors.</p>
    <div style={two}><NeutralPanel mode="light" /><NeutralPanel mode="dark" /></div>
  </section>
);

const Dot = ({ c }: { c: string }) => <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: c, marginRight: 8 }} />;
const Change = ({ title, from, token }: { title: string; from: string; token: string }) => (
  <div style={{ ...darkPanel, padding: '12px 14px', marginBottom: 10 }}>
    <div style={{ fontSize: 11, fontWeight: 500, marginBottom: 8 }}>{title}</div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={chip(from, { width: 44 })} /><span>→</span><span style={chip(v(token), { width: 60 })} /><span style={{ fontSize: 10, opacity: 0.85 }}>{from.toUpperCase()} → {hexOf(token).toUpperCase()}<br />{token}</span></div>
  </div>
);
const Accessibility = () => (
  <section>
    <h2 style={h2}>10 / Accessibility</h2>
    <p style={intro}>Standard: WCAG 2.2 AA. Text and cell values need 4.5:1 (1.4.3). Marks a reader must see need 3:1 against the card (1.4.11). Every color on this page passes under the rules below.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
      <div><div style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}><Dot c="#087846" />Approved changes</div>
        <Change title="Operations dark Shade 3 / ramp Mid" from="#b76349" token="data/charts/operations/600" />
        <Change title="Adoption dark Shade 3 / ramp Mid" from="#8b6fba" token="data/charts/adoption/500" />
        <div style={{ fontSize: 11, color: F.body, lineHeight: 1.5 }}>Cell values on these two failed 4.5:1 with both label colors. The new colors take the dark label #171614 at 4.61:1 and stay 3.51:1 on the dark card. Approved by John Drogalis, 2026-10-22.</div>
      </div>
      <div><div style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}><Dot c="#b95b3d" />Accepted at the limit · lock these</div>
        {['Contractor Experience #B35887 (data/charts/contractor-experience/600) with white text: 4.50:1.', 'Operations text #B95B3D (data/charts/operations/700) on white: 4.54:1.', 'Positive dark #6B9D9D on the dark card: 4.54:1.', 'These pass, but any change to the hex fails. Do not adjust them without re-checking.'].map(t => <div key={t} style={{ fontSize: 12, lineHeight: 1.5, margin: '0 0 8px' }}>• {t}</div>)}
      </div>
      <div><div style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}><Dot c="#706a5c" />Covered by the rules on this page</div>
        {['Low and light Mid steps are under 3:1 on the card → ordered data only, value in every cell (§ 06 rule 7).', 'Top three dark steps sit about 1.4–1.6:1 apart → value in every cell + 2px card-color gap (§ 06 rule 7, Do rule 3).', 'Context band fill alone is about 1.2:1 → always draw the 1px edge or a hatch (§ 08 rule 6).', 'Grid, axis and track lines are under 3:1 → supporting only; values are always labeled (W3C Understanding 1.4.11).'].map(t => <div key={t} style={{ fontSize: 12, lineHeight: 1.5, margin: '0 0 8px' }}>• {t}</div>)}
      </div>
    </div>
  </section>
);

const OpenItems = () => (
  <section style={{ ...darkPanel, background: '#211f1c', marginTop: 56, padding: '24px 20px' }}>
    <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 12 }}>11 / Open items</div>
    {['Negative status #B44B6A is nearly the same as Contractor magenta. Proposed: Negative moves to #D70100 light (existing danger color) / #FF8A80 dark.', 'The prototype’s goal marker uses blue and its top-10% marker uses orange. Under tier 4 both become ink with a shape or dash.', 'Checked with simulated color blindness. Closest pairs: Operations vs Sustainability (red-blind) and Quality vs Adoption in dark mode (green-blind). Labels stay required.', 'Existing load-detail charts use a hue per metric (green slump, orange admix, purple temperature, brown drum speed, red revolutions) and a green discharge band. They need to move to section 08.', 'Not yet tested on real displays or with users.', 'Added 2026-10-22: nine supporting colors have no primitive yet: #FAF9F6 (dark ink), #706A5C and #D3CEC6 (secondary text / Avg marker), #8A867F (context grey), #457676 and #6B9D9D (positive), #FF8A80 (dark negative), #E5E1DB and #4A463F (grid).', 'Added 2026-10-22: “No area” uses Ink (#211F1C / #FAF9F6) per tier 2; the tier 2 chip still shows #56524B.'].map(t => <div key={t} style={{ fontSize: 13, lineHeight: 1.6, margin: '0 0 8px' }}>• {t}</div>)}
  </section>
);

export const ChartColors: Story = {
  name: 'Chart Colors',
  render: () => (
    <div style={page}>
      <Overview /><StartHere /><Hierarchy /><AreaPalette /><Primitives /><UsageRules /><InUse /><SingleArea /><OrderedRamps /><OtherMetrics /><Neutrals /><Accessibility /><OpenItems />
    </div>
  ),
};
