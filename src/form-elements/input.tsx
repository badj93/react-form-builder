import type { ChangeEvent, HTMLAttributes } from 'react';
import type { FormBuilderField } from '../types.ts';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  f: FormBuilderField;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ f, onChange, ...props }: InputProps) {
  return (
    <input
      onChange={onChange}
      key={f.name}
      name={f.name}
      type={f.type}
      placeholder={f.placeholder}
      disabled={f.disabled}
      autoComplete="off"
      {...props}
    />
  );
}
