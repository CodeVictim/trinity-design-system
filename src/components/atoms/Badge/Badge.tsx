// Trinity Badge (atom) — Figma "Badge" 7477:297479. Only the 23 authored branches exist:
//   number/text × Default/Alternate/Outline/Error × type Default/Data · dot × Default/Alternate/Error · icon × 4 states (type Icon).
import type { ReactNode } from 'react';
import { DatabaseIcon } from './DatabaseIcon';
import '../Spinner/Spinner.css'; // .tri-visually-hidden
import './Badge.css';

export type BadgeState = 'Default' | 'Error' | 'Alternate' | 'Outline';

interface Common { state?: BadgeState; className?: string }
export type BadgeProps = Common & (
  | { content: 'number' | 'text'; type?: 'Default' | 'Data'; value: string }
  | { content: 'dot'; state?: Exclude<BadgeState, 'Outline'>; /** What the dot means — read by screen readers. */ label: string }
  | { content: 'icon'; /** Instance swap (Figma "Icon"); defaults to u-database. */ icon?: ReactNode; label: string }
);

export function Badge(props: BadgeProps) {
  const state = props.state ?? 'Default';
  const type = props.content === 'icon' ? 'Icon' : props.content === 'dot' ? 'Default' : (props.type ?? 'Default');
  const cls = ['tri-badge', `tri-badge--${props.content}`, `tri-badge--${state.toLowerCase()}`, `tri-badge--type-${type.toLowerCase()}`, props.className]
    .filter(Boolean).join(' ');

  if (props.content === 'dot') return <span className={cls}><span className="tri-visually-hidden">{props.label}</span></span>;
  if (props.content === 'icon') return (
    <span className={cls}>
      <span className="tri-badge__icon" aria-hidden="true">{props.icon ?? <DatabaseIcon />}</span>
      <span className="tri-visually-hidden">{props.label}</span>
    </span>
  );
  return <span className={cls}>{props.value}</span>;
}
