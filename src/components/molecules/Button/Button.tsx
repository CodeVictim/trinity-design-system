// Trinity Button (molecule) — Figma "Button" 30033:78562 (144 authored branches).
// Assembly from Figma: root → Button Container → [Prefix Icon (Icon atom), Button Text, Suffix Icon (Icon atom)];
// loading branches → Button Container → Spinner atom only (16 for small/medium, 24 for large/xlarge), fixed 120px wide.
// Loading exists only for state=default, disabled=false. While loading the button stays busy (Figma's hover reaction is not copied).
import type { ButtonHTMLAttributes } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { Spinner } from '../../atoms/Spinner/Spinner';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'destructive' | 'accent' | 'destructive-secondary';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma "content". */
  children?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Glyph code point for Figma "prefixIcon" / "suffixIcon" (Icon atom: XSmall on size small, Small otherwise). Omit to hide. */
  prefixIcon?: string;
  suffixIcon?: string;
  /** Figma "Show content" = false → icon-only. Then `aria-label` is required. */
  showContent?: boolean;
  loading?: boolean;
  /** Docs only: shows an authored state without interacting. */
  state?: 'default' | 'hover' | 'focus' | 'active';
}

export function Button({ children = 'Content', variant = 'primary', size = 'xlarge', prefixIcon, suffixIcon, showContent = true,
  loading = false, disabled = false, state = 'default', className, onClick, ...rest }: ButtonProps) {
  // Figma: size=small uses the XSmall icon (12px); every other size uses Small (16px).
  const iconSize = size === 'small' ? 'XSmall' : 'Small';
  const cls = ['tri-btn', `tri-btn--${variant}`, `tri-btn--${size}`, loading && 'is-loading', state !== 'default' && `is-${state}`, className]
    .filter(Boolean).join(' ');
  return (
    <button type="button" {...rest} className={cls} disabled={disabled}
      aria-disabled={loading || undefined} aria-busy={loading || undefined}
      aria-label={rest['aria-label'] ?? (!showContent || loading ? children : undefined)}
      onClick={loading ? e => e.preventDefault() : onClick}>
      <span className="tri-btn__container">
        {loading
          ? <Spinner size={size === 'small' || size === 'medium' ? '16' : '24'} />
          : <>
              {prefixIcon && <Icon glyph={prefixIcon} size={iconSize} />}
              {showContent && <span className="tri-btn__text">{children}</span>}
              {suffixIcon && <Icon glyph={suffixIcon} size={iconSize} />}
            </>}
      </span>
    </button>
  );
}
