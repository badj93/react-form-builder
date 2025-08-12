import type { ChangeEvent, HTMLAttributes } from 'react';
import type { FormBuilderField } from '../types.ts';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  f: FormBuilderField;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ f, onChange, ...props }: CheckboxProps) {
  return (
    <label key={f.name} htmlFor={f.name}>
      <input
        id={f.name}
        type={f.type}
        onChange={onChange}
        name={f.name}
        {...props}
      />
      <span>{f.placeholder}</span>
    </label>
  );
}
