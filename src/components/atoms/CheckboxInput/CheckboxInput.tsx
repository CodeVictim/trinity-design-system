// Trinity _checkboxInput (atom, private base of Checkbox) — Figma 30515:78570.
// Visual indicator only: touchpoint 24 → inputContainer 16 → input 16 → check / indeterminate.
// It has no behavior of its own; Checkbox owns the native input and drives these states.
import './CheckboxInput.css';

export interface CheckboxInputProps {
  value?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  /** Forces a visual state for documentation. In use, hover/focus come from the parent Checkbox. */
  state?: 'default' | 'hover' | 'focus';
  className?: string;
}

export function CheckboxInput({ value = false, indeterminate = false, disabled = false, state = 'default', className }: CheckboxInputProps) {
  const cls = ['tri-cbi', value && 'is-checked', indeterminate && 'is-indeterminate', disabled && 'is-disabled',
    state !== 'default' && `is-${state}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls} aria-hidden="true">
      <span className="tri-cbi__container">
        <span className="tri-cbi__input">
          {indeterminate
            ? <span className="tri-cbi__indeterminate" />
            : <svg className="tri-cbi__check" viewBox="0 0 7 5" fill="none" focusable="false">
                <path d="M0.5 1.83333L2.9 4.5C4.30589 2.9379 5.09411 2.0621 6.5 0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>}
        </span>
      </span>
    </span>
  );
}
