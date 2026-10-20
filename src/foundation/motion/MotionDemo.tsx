import React, { useState } from 'react';
import { CURVES } from './motion-data';
import './motion-docs.css';

type Vars = React.CSSProperties & Record<'--demo-duration' | '--demo-easing', string>;

/** Live demo: a dot that travels the track using the real duration + easing tokens. */
export function MotionDemo({ duration, easing = 'var(--easing-ease-out)', label, fade = false }:
  { duration: string; easing?: string; label: string; fade?: boolean }) {
  const [on, setOn] = useState(false);
  const style: Vars = { '--demo-duration': duration, '--demo-easing': easing };
  return (
    <div className={`tri-motion-demo${on ? ' is-on' : ''}`} style={style}>
      {fade ? <div className="tri-motion-fade" aria-hidden="true" />
        : <div className="tri-motion-demo__track" aria-hidden="true"><div className="tri-motion-demo__dot" /></div>}
      <button type="button" className="tri-motion-demo__play" aria-pressed={on} onClick={() => setOn(v => !v)}>
        {on ? 'Reset' : 'Play'}<span className="tri-motion-sr"> {label}</span>
      </button>
    </div>
  );
}

/** Curve preview for an easing keyword (x = time, y = progress). */
export function CurvePreview({ keyword }: { keyword: string }) {
  const [x1, y1, x2, y2] = CURVES[keyword] ?? [0, 0, 1, 1];
  const s = 64, p = 6, X = (v: number) => p + v * s, Y = (v: number) => p + (1 - v) * s;
  return (
    <svg width={s + 2 * p} height={s + 2 * p} viewBox={`0 0 ${s + 2 * p} ${s + 2 * p}`} role="img"
      aria-label={`${keyword} curve: cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`} style={{ flexShrink: 0 }}>
      <rect x={p} y={p} width={s} height={s} fill="#f6f4f2" rx="3" />
      <line x1={X(0)} y1={Y(0)} x2={X(x1)} y2={Y(y1)} stroke="#c9c5be" strokeWidth="1" />
      <line x1={X(1)} y1={Y(1)} x2={X(x2)} y2={Y(y2)} stroke="#c9c5be" strokeWidth="1" />
      <path d={`M ${X(0)} ${Y(0)} C ${X(x1)} ${Y(y1)}, ${X(x2)} ${Y(y2)}, ${X(1)} ${Y(1)}`} fill="none" stroke="#0975c3" strokeWidth="2" />
    </svg>
  );
}
