// Trinity Radio Button Input (atom, base of Radio Button Field) — Figma 30173:78572, 8 authored variants.
// Visual indicator only: touchpoint 24 (radiobutton/width|height, padding 2) → inputContainer 20 (padding 2, circle)
// → input 16 (circle). Selected = a 4px inside ring (unselected = 1px). It has no behavior of its own:
// Radio Button Field owns the native <input type="radio"> and drives hover / focus.
import './RadioButtonInput.css';

export interface RadioButtonInputProps {
  /** Figma "isSelected". */
  selected?: boolean;
  /** Figma "isDisabled". Only authored with state default. */
  disabled?: boolean;
  /** Figma "state" — forces a visual state for documentation. In use, hover/focus come from the parent Field. */
  state?: 'default' | 'hover' | 'focus';
  className?: string;
}

export function RadioButtonInput({ selected = false, disabled = false, state = 'default', className }: RadioButtonInputProps) {
  const cls = ['tri-rbi', selected && 'is-selected', disabled && 'is-disabled', state !== 'default' && `is-${state}`, className]
    .filter(Boolean).join(' ');
  return (
    <span className={cls} aria-hidden="true">
      <span className="tri-rbi__container">
        <span className="tri-rbi__input" />
      </span>
    </span>
  );
}
