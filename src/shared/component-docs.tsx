// Blocks for component Reference pages: token tables read from the Figma Style/Layout pull,
// plus the accessibility tables (keyboard, WCAG mapping, testing checklist).
import type { ReactNode } from 'react';
import styleLayout from '../../tokens/source/figma-style-layout.json';
import { tokens as primitives, SimpleTable, Code } from './doc-kit';

type Mode = { chain: string[]; value: unknown };
type Var = { name: string; collection: string; type: string; modes: Record<string, Mode> };
const vars = (styleLayout as { variables: Var[] }).variables;
const aliasIds = (styleLayout as { aliasIds: Record<string, { name: string; resolved: string }> }).aliasIds;
const primHex = Object.fromEntries(primitives.map(t => [t.figma, t.value]));

export const cssName = (n: string) => '--' + n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const describe = (m: Mode) => {
  const v = m.value as any;
  if (v && typeof v === 'object' && 'opacity' in v) {
    const a = aliasIds[v.color.id];
    return { hex: a?.resolved, opacity: v.opacity / 100, text: `${a?.name} @ ${v.opacity}%` };
  }
  const src = m.chain[0]?.split(':')[1];
  const hex = typeof v === 'string' ? v : undefined;
  const num = typeof v === 'number' ? `${v}` : undefined;
  return { hex, opacity: 1, text: src ? `${src}${hex ? ` · ${hex}` : num ? ` · ${num}` : ''}` : (hex ?? num ?? '—') };
};

function Swatch({ hex, opacity = 1, dark }: { hex?: string; opacity?: number; dark?: boolean }) {
  if (!hex) return null;
  return (
    <span style={{ display: 'inline-block', width: 20, height: 20, borderRadius: 4, verticalAlign: 'middle', marginRight: 6,
      border: '1px solid #b6b1a5', background: dark ? '#000' : '#f0eeea', position: 'relative', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', inset: 0, background: hex, opacity }} />
    </span>
  );
}

/** Every Style/Layout token whose Figma name starts with one of `prefixes`, with Light/Dark values. */
export function TokenTable({ prefixes, exclude = [] }: { prefixes: string[]; exclude?: string[] }) {
  const list = vars.filter(v => prefixes.some(p => v.name.startsWith(p)) && !exclude.some(p => v.name.startsWith(p)))
    .sort((a, b) => a.name.localeCompare(b.name));
  const colors = list.filter(v => v.type === 'COLOR');
  const numbers = list.filter(v => v.type !== 'COLOR');
  return (
    <>
      {colors.length > 0 && <SimpleTable head={['Token', 'Light', 'Dark']} rows={colors.map(v => {
        const l = describe(v.modes.Light), d = describe(v.modes.Dark);
        return [<Code>{cssName(v.name)}</Code>,
          <span><Swatch hex={l.hex} opacity={l.opacity} />{l.text}</span>,
          <span><Swatch hex={d.hex} opacity={d.opacity} dark />{d.text}</span>];
      })} />}
      {numbers.length > 0 && <SimpleTable head={['Token', 'Value', 'Collection']} rows={numbers.map(v => {
        const m = describe(Object.values(v.modes)[0]);
        return [<Code>{cssName(v.name)}</Code>, m.text, v.collection];
      })} />}
    </>
  );
}

/** Primitive hex lookup for prose (e.g. hex('neutral/950')). */
export const hex = (figma: string) => primHex[figma];

export function Keyboard({ rows }: { rows: [string, ReactNode][] }) {
  return <SimpleTable head={['Key', 'Action']} rows={rows.map(([k, a]) => [<kbd>{k}</kbd>, a])} />;
}

export function Wcag({ rows }: { rows: [string, ReactNode, ('pass' | 'fail' | 'consumer')?][] }) {
  const tag = (s?: string) => s === 'fail' ? '✗ Fails' : s === 'consumer' ? 'Consumer' : '✓ Meets';
  return <SimpleTable head={['Criterion', 'How this component meets it', 'Status']} rows={rows.map(([c, h, s]) => [c, h, tag(s)])} />;
}

export function Checklist({ items }: { items: ReactNode[] }) {
  return <ul style={{ listStyle: 'none', paddingLeft: 0 }}>{items.map((i, n) => <li key={n}>☐ {i}</li>)}</ul>;
}
