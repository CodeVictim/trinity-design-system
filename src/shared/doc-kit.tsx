// Shared building blocks for Trinity's Getting Started + Foundation pages.
// Layout follows the house documentation format: uppercase section labels, blue
// info callouts, swatch rows with accessibility tags, token-left / sample-right rows.
// Data comes from the generated tokens/1-primitives/primitives.json.
import React from 'react';
import data from '../../tokens/1-primitives/primitives.json';

export type Token = {
  category: string; group: string; figma: string; css: string | null;
  value: any; out?: string; alias?: string | null; note?: string | null; usedBy?: string[];
};
export const tokens = (data as { tokens: Token[] }).tokens;
export const meta = (data as any).meta as { file: string; fileKey: string; pulled: string };
export const byCategory = (c: string) => tokens.filter(t => t.category === c);
export const byPrefix = (p: string) => tokens.filter(t => t.figma.startsWith(p));
export const stepNum = (t: Token) => parseFloat(t.figma.split('/').pop()!);
export const sortSteps = (l: Token[]) => [...l].sort((a, b) => stepNum(a) - stepNum(b));

// ---------- contrast ----------
const lum = (hex: string) => {
  const h = hex.replace('#', '').slice(0, 6);
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const contrast = (a: string, b = '#ffffff') => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

// ---------- "used by" summary (from Style / Layout aliases) ----------
export const usedBySummary = (list: string[] = []) => {
  if (!list.length) return 'Not referenced by any Style / Layout token';
  const counts: Record<string, number> = {};
  const dark = new Set<string>(), light = new Set<string>();
  for (const u of list) {
    const ns = u.replace(/ \((Light|Dark)\)$/, '').split('/')[0];
    counts[ns] = (counts[ns] || 0) + 1;
    if (u.endsWith('(Dark)')) dark.add(ns); else light.add(ns);
  }
  const parts = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([ns, n]) =>
    `${ns}${n > 1 ? ` ×${n}` : ''}${dark.has(ns) && !light.has(ns) ? ' (dark mode)' : ''}`);
  return 'Used by: ' + (parts.length > 6 ? parts.slice(0, 6).join(' · ') + ` · +${parts.length - 6} more` : parts.join(' · '));
};

// ---------- styles ----------
export const F = {
  font: "var(--font-family-trinityfont)",
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  ink: '#211f1c', body: '#45413a', label: '#565147', line: '#e7e5e1',
};
const base: React.CSSProperties = { fontFamily: F.font, color: F.ink };

export function Ref({ children }: { children: React.ReactNode }) {
  return <div style={{ ...base, maxWidth: 860, fontSize: 13 }}>{children}</div>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ ...base, fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: F.label, margin: '32px 0 12px' }}>{children}</h2>;
}

export function InfoCallout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...base, background: '#eef9ff', borderLeft: '4px solid #0975c3', borderRadius: '0 8px 8px 0', padding: '16px 20px', fontSize: 13, lineHeight: 1.6, margin: '0 0 24px' }}>
      {children}
    </div>
  );
}

export function ReviewCallout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...base, background: '#ffefa9', borderLeft: '4px solid #894f18', borderRadius: '0 8px 8px 0', padding: '12px 20px', fontSize: 13, lineHeight: 1.6, margin: '8px 0 24px' }}>
      <b>Review in Figma — </b>{children}
    </div>
  );
}

export function NoteBox({ children }: { children: React.ReactNode }) {
  return <div style={{ ...base, background: '#f6f4f2', borderRadius: 8, padding: '10px 16px', fontSize: 12, color: F.body, margin: '8px 0 16px' }}>{children}</div>;
}

export function A11yTag({ hex }: { hex: string }) {
  const r = contrast(hex);
  const [label, bg, fg] = r >= 4.5 ? ['AA text ✓', '#d5f1d2', '#15322f']
    : r >= 3 ? ['Large text / icons only', '#ffefa9', '#4f3c08']
    : ['Background only', '#f0eeea', '#45413a'];
  return <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 500, padding: '1px 6px', borderRadius: 3, background: bg, color: fg, marginTop: 3 }}>{label} <span style={{ fontWeight: 400 }}>· {r.toFixed(1)}:1 on white</span></span>;
}

export function ColorRow({ t, desc }: { t: Token; desc?: string }) {
  const hex = String(t.value);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <div style={{ width: 50, height: 50, borderRadius: 6, background: `var(${t.css})`, border: '1px solid rgba(0,0,0,0.08)', flexShrink: 0 }} />
      <div style={{ lineHeight: 1.35 }}>
        <div style={{ fontWeight: 500, fontSize: 13 }}>{t.css} <span style={{ fontWeight: 400, fontFamily: F.mono, fontSize: 11, color: F.label }}>{hex}</span></div>
        <div style={{ fontSize: 12, color: F.body }}>{desc ?? usedBySummary(t.usedBy)}</div>
        {hex.startsWith('#') && <A11yTag hex={hex} />}
      </div>
    </div>
  );
}

export function SpacingRow({ t, max = 64 }: { t: Token; max?: number }) {
  const px = Number(t.value);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
      <span style={{ fontFamily: F.mono, fontSize: 11, color: F.ink, minWidth: 220 }}>{t.css}</span>
      <span style={{ display: 'inline-block', height: 20, width: `${Math.max(Math.min(px, max) / max * 360, px ? 1 : 0)}px`, background: '#41a8f2', borderRadius: 2, flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: F.body }}>{t.out}</span>
    </div>
  );
}

export function Tile({ label, sub, css, children }: { label: string; sub: string; css?: string | null; children: React.ReactNode }) {
  return (
    <div style={{ textAlign: 'center', width: 100 }}>
      {children}
      <div style={{ fontWeight: 500, fontSize: 13, marginTop: 8 }}>{label}</div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: F.label }}>{sub}</div>
      {css && <div style={{ fontFamily: F.mono, fontSize: 11, color: F.label }}>{css}</div>}
    </div>
  );
}

export function TypeRow({ token, value, children }: { token: React.ReactNode; value?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '10px 0', borderBottom: `1px solid ${F.line}` }}>
      <span style={{ fontFamily: F.mono, fontSize: 11, color: F.ink, minWidth: 220, flexShrink: 0 }}>{token}</span>
      {value !== undefined && <span style={{ minWidth: 70, flexShrink: 0 }}>{value}</span>}
      <span style={{ color: F.ink }}>{children}</span>
    </div>
  );
}

export function ShadowRow({ name, css, value, desc }: { name: string; css: string; value: string; desc: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
      <div style={{ width: 96, height: 96, borderRadius: 8, background: '#ffffff', boxShadow: `var(${css})`, flexShrink: 0 }} />
      <div>
        <div style={{ fontWeight: 500, fontSize: 15 }}>{name}</div>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: F.ink }}>{css}</div>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: F.ink }}>{value}</div>
        <div style={{ fontSize: 13, color: F.body, marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}

// ---------- Getting Started (document style) ----------
export function Doc({ title, lead, children }: { title: string; lead: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ ...base, maxWidth: 800, fontSize: 14, lineHeight: 1.6 }}>
      <h1 style={{ fontSize: 30, fontWeight: 500, margin: '0 0 8px', lineHeight: 1.2 }}>{title}</h1>
      <p style={{ fontSize: 16, color: F.body, margin: 0 }}>{lead}</p>
      {children}
    </div>
  );
}
export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <hr style={{ border: 0, borderTop: `1px solid ${F.line}`, margin: '32px 0' }} />
      <h2 style={{ fontSize: 19, fontWeight: 500, margin: '0 0 12px' }}>{title}</h2>
      {children}
    </section>
  );
}
export const Code = ({ children }: { children: React.ReactNode }) =>
  <code style={{ fontFamily: F.mono, fontSize: 12, background: '#eef9ff', color: '#0d598f', padding: '1px 5px', borderRadius: 4, whiteSpace: 'nowrap' }}>{children}</code>;
export function CodeBlock({ children }: { children: string }) {
  return <pre style={{ fontFamily: F.mono, fontSize: 12, background: '#f6f4f2', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', margin: '8px 0 16px', lineHeight: 1.6 }}>{children}</pre>;
}
export function TierBox({ tone, title, desc, example }: { tone: 'blue' | 'green' | 'yellow'; title: string; desc: string; example: string }) {
  const c = { blue: ['#eef9ff', '#c5e4fb'], green: ['#d5f1d2', '#a9e3a3'], yellow: ['#feffd6', '#e3f200'] }[tone];
  return (
    <div style={{ background: c[0], border: `1px solid ${c[1]}`, borderRadius: 8, padding: '16px 20px' }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: F.label, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, marginBottom: 8 }}>{desc}</div>
      <div style={{ fontFamily: F.mono, fontSize: 11 }}>{example}</div>
    </div>
  );
}
export const Arrow = ({ children = 'aliased to' }: { children?: string }) =>
  <div style={{ textAlign: 'center', fontSize: 15, color: F.body, margin: '8px 0' }}>↓ {children}</div>;

// ---------- table used inside the System (MDX) pages ----------
export function ColorTable({ list }: { list: Token[] }) {
  const cell: React.CSSProperties = { padding: '8px 12px', borderBottom: `1px solid ${F.line}`, verticalAlign: 'middle', fontSize: 13 };
  return (
    <table style={{ ...base, borderCollapse: 'collapse', width: '100%', margin: '8px 0 24px' }}>
      <thead>
        <tr style={{ background: '#f6f4f2', textAlign: 'left' }}>
          {['', 'Token', 'Hex', 'Contrast', 'Text safe?', 'Used by'].map(h => <th key={h} scope="col" style={{ ...cell, fontWeight: 500 }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {list.map(t => {
          const hex = String(t.value); const r = contrast(hex);
          return (
            <tr key={t.figma}>
              <td style={cell}><span style={{ display: 'inline-block', width: 22, height: 22, borderRadius: 4, background: `var(${t.css})`, border: '1px solid rgba(0,0,0,0.08)' }} /></td>
              <td style={cell}><Code>{t.css}</Code></td>
              <td style={{ ...cell, fontFamily: F.mono, fontSize: 12 }}>{hex.toUpperCase()}</td>
              <td style={{ ...cell, fontWeight: r >= 3 ? 500 : 400 }}>{r.toFixed(1)}:1</td>
              <td style={cell}>{r >= 4.5 ? 'AA ✓' : r >= 3 ? 'Large only' : 'BG only'}</td>
              <td style={{ ...cell, color: F.body, fontSize: 12 }}>{usedBySummary(t.usedBy).replace('Used by: ', '')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function SimpleTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  const cell: React.CSSProperties = { padding: '8px 12px', borderBottom: `1px solid ${F.line}`, verticalAlign: 'top', fontSize: 13 };
  return (
    <table style={{ ...base, borderCollapse: 'collapse', width: '100%', margin: '8px 0 24px' }}>
      <thead><tr style={{ background: '#f6f4f2', textAlign: 'left' }}>{head.map(h => <th key={h} scope="col" style={{ ...cell, fontWeight: 500 }}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={cell}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}
