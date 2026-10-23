// Trinity Radio Button Field (molecule) — Figma "Radio Button Field" 30173:78607, 8 authored variants.
// Assembly from Figma: Radio Button Input instance, then Label (Body/sm), in a row (gap radiobutton/gap). Imports the real atom.
// Behavior: native <input type="radio"> → standard radio behavior: Space selects, arrow keys move the selection
// between radios that share a `name`, and a selected radio can't be unselected by clicking it (the Figma prototype
// lets a click unselect it — not standard; logged on the Reference page). Clicking the label selects.
import type { ChangeEvent } from 'react';
import { RadioButtonInput } from '../../atoms/RadioButtonInput/RadioButtonInput';
import './RadioButtonField.css';

export interface RadioButtonFieldProps {
  /** Label text. Always required: when the label is hidden (Figma "show label" = false) it becomes the accessible name. */
  label: string;
  /** Figma "show label" boolean. */
  showLabel?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  /** Figma "isDisabled". */
  disabled?: boolean;
  /** Radios in one group share a name — that's what makes arrow keys and "1 of N" work. */
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Docs only: shows an authored state without interacting. */
  state?: 'default' | 'hover' | 'focus';
}

export function RadioButtonField({ label, showLabel = true, checked, defaultChecked, disabled = false, name, value, onChange, state = 'default' }: RadioButtonFieldProps) {
  const isSelected = checked ?? defaultChecked ?? false;
  return (
    <label className={['tri-radio', disabled && 'is-disabled', state !== 'default' && `is-${state}`].filter(Boolean).join(' ')}>
      <input type="radio" className="tri-radio__native"
        checked={checked} defaultChecked={defaultChecked} disabled={disabled} name={name} value={value}
        onChange={onChange} aria-label={showLabel ? undefined : label} />
      <RadioButtonInput selected={isSelected} disabled={disabled} state={state === 'default' ? undefined : state} />
      {showLabel && <span className="tri-radio__label">{label}</span>}
    </label>
  );
}
