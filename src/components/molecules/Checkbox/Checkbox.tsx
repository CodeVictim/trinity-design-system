// Trinity Checkbox (molecule) — Figma "Checkbox" 30515:78521.
// Assembly from Figma: _checkboxInput instance, then Label Text, in a row (gap checkbox/gap). Imports the real atom.
// Behavior: native <input type="checkbox"> → Space toggles, Enter does not (form submit). Click on the label toggles.
import { useEffect, useRef, type ChangeEvent } from 'react';
import { CheckboxInput } from '../../atoms/CheckboxInput/CheckboxInput';
import './Checkbox.css';

export interface CheckboxProps {
  /** Label text. Always required: when the label is hidden (Figma "label" = false) it becomes the accessible name. */
  label: string;
  /** Figma "label" boolean. */
  showLabel?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** Docs only: shows an authored state without interacting. */
  state?: 'default' | 'hover' | 'focus';
}

export function Checkbox({ label, showLabel = true, checked, defaultChecked, indeterminate = false, disabled = false, name, value, onChange, state = 'default' }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  const isChecked = checked ?? defaultChecked ?? false;

  return (
    <label className={['tri-checkbox', disabled && 'is-disabled', state !== 'default' && `is-${state}`].filter(Boolean).join(' ')}>
      <input ref={ref} type="checkbox" className="tri-checkbox__native"
        checked={checked} defaultChecked={defaultChecked} disabled={disabled} name={name} value={value}
        onChange={onChange} aria-label={showLabel ? undefined : label} />
      <CheckboxInput value={isChecked} indeterminate={indeterminate} disabled={disabled}
        state={state === 'default' ? undefined : state} />
      {showLabel && <span className="tri-checkbox__label">{label}</span>}
    </label>
  );
}
