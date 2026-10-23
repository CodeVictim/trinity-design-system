// Trinity Progress Bar (atom) — Figma "Progress Bar" 51692:17330, 8 authored variants (progress 0 · 5 · 10 · 25 · 50 · 75 · 90 · 100%).
// Assembly from Figma: track (279×8, progress bar/track fill, progress bar/radius) → "Progress" fill (width = the value,
// progress bar/progress fill). 0% has no fill layer. The Figma variants are sample values; the code takes any value 0–100.
// Motion exception (atom): the fill animates its own width change (Motion: progress bar/duration · easing; instant under
// reduced motion via progress bar/reduced/duration). Determinate only — Figma has no indeterminate variant.
import type { CSSProperties } from 'react';
import './ProgressBar.css';

export interface ProgressBarProps {
  /** Figma "progress" — a percentage, 0–100 (clamped). */
  value: number;
  /** Accessible name — what is progressing ("Uploading 3 files"). Required unless `labelledBy` points at a visible label. */
  label?: string;
  /** id of a visible label element that names the bar (preferred when one is on screen). */
  labelledBy?: string;
  /** Read out instead of the number, e.g. "Step 2 of 4". */
  valueText?: string;
  className?: string;
  style?: CSSProperties;
}

export function ProgressBar({ value, label, labelledBy, valueText, className, style }: ProgressBarProps) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={['tri-progress', className].filter(Boolean).join(' ')} style={style}
      role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={v} aria-valuetext={valueText}
      aria-label={labelledBy ? undefined : label} aria-labelledby={labelledBy}>
      {v > 0 && <div className="tri-progress__fill" style={{ width: `${v}%` }} aria-hidden="true" />}
    </div>
  );
}
