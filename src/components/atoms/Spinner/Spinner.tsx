// Trinity Spinner (atom) — Figma "Spinner" 10259:29263. Arc geometry exported from the Figma Arc layer.
// Static, as authored in Figma (no rotation reaction exists). Fill `spinner/fill`; sizes `spinner/{small,medium,large}/*`.
import './Spinner.css';

export type SpinnerSize = '16' | '24' | '40';

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const ARC = 'M20.0039 4.00072C16.3022 4.00072 12.715 5.28423 9.85352 7.63255C6.9921 9.98088 5.03368 13.2491 4.31152 16.8796C3.58951 20.5099 4.14783 24.2783 5.89258 27.5427C7.63754 30.8073 10.4609 33.3664 13.8809 34.7829C17.3007 36.1995 21.1062 36.3858 24.6484 35.3113C28.1906 34.2367 31.2511 31.9672 33.3076 28.8894C35.364 25.8116 36.2896 22.1161 35.9268 18.4324C35.5639 14.7486 33.9348 11.3047 31.3174 8.68724L34.1455 5.85814C37.4173 9.12988 39.4536 13.4351 39.9072 18.0398C40.3608 22.6446 39.2035 27.2647 36.6328 31.112C34.0621 34.9592 30.2373 37.7962 25.8096 39.1394C21.3819 40.4825 16.6254 40.2488 12.3506 38.4783C8.0757 36.7075 4.54644 33.5092 2.36523 29.4285C0.184074 25.3477 -0.515 20.6365 0.387695 16.0984C1.29041 11.5605 3.73897 7.47607 7.31543 4.54076C10.8922 1.60535 15.3768 0.000718505 20.0039 0.000717163V4.00072Z';
const SIZE: Record<SpinnerSize, string> = { '16': 'small', '24': 'medium', '40': 'large' };

export function Spinner({ size = '40', className }: SpinnerProps) {
  return (
    <svg className={['tri-spinner', `tri-spinner--${SIZE[size]}`, className].filter(Boolean).join(' ')}
      viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <path d={ARC} fill="currentColor" />
    </svg>
  );
}
