// Trinity Icon (atom) — Figma "Icon" 60882:389. One glyph from the TrinityIcons / TrinityBrandIcons font.
// Sizes and fonts come from the Figma text styles "Icon Fonts/*"; color from `icon/default`.
import './Icon.css';

export type IconSize = 'XSmall' | 'Small' | 'Medium' | 'Large';
export type IconFont = 'Default' | 'Brand';

export interface IconProps {
  /** The glyph: a character or a hex code point (e.g. "e4d9"). */
  glyph: string;
  size?: IconSize;
  icon?: IconFont;
  /** Give a label only when the icon carries meaning on its own. Without it the icon is decorative (hidden from AT). */
  label?: string;
  className?: string;
}

const toChar = (g: string) => (/^[0-9a-f]{4,5}$/i.test(g) ? String.fromCodePoint(parseInt(g, 16)) : g);

export function Icon({ glyph, size = 'XSmall', icon = 'Default', label, className }: IconProps) {
  const cls = ['tri-icon', `tri-icon--${size.toLowerCase()}`, icon === 'Brand' && 'tri-icon--brand', className].filter(Boolean).join(' ');
  return label
    ? <span className={cls} role="img" aria-label={label}>{toChar(glyph)}</span>
    : <span className={cls} aria-hidden="true">{toChar(glyph)}</span>;
}
