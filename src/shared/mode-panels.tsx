// Light / Dark specimen panels for component stories — the layout of the component pages' Figma
// documentation frames (a Light panel and a Dark panel on layout/base). Each row: a plain header + the specimen.
// Headers are plain doc text (ink on Light, white on Dark) — never Figma's magenta annotation colour.
import type { CSSProperties, ReactNode } from 'react';

export type SpecimenRow = { label: string; render: () => ReactNode };

const panel: CSSProperties = { background: 'var(--layout-base)', padding: '32px 40px', display: 'inline-block', borderRadius: 8 };
const grid: CSSProperties = { display: 'grid', gridTemplateColumns: 'max-content max-content', alignItems: 'center', columnGap: 32, rowGap: 18 };
const header = (mode: 'light' | 'dark'): CSSProperties => ({
  fontFamily: 'var(--font-family-trinityfont), sans-serif', fontWeight: 500, fontSize: 14, lineHeight: 1.4,
  color: mode === 'dark' ? '#ffffff' : '#211f1c', justifySelf: 'end',
});

export function ModePanel({ mode, rows }: { mode: 'light' | 'dark'; rows: SpecimenRow[] }) {
  return (
    <div data-theme={mode} style={panel}>
      <div style={grid}>
        {rows.flatMap(r => [<span key={r.label + '-h'} style={header(mode)}>{r.label}</span>, <span key={r.label}>{r.render()}</span>])}
      </div>
    </div>
  );
}
