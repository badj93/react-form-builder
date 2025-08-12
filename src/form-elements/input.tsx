import type { ChangeEvent, HTMLAttributes } from 'react';
import type { FormCraftField } from '../types.ts';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  f: FormCraftField;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ f, onChange, ...props }: InputProps) {
  return <input onChange={onChange} {...f} autoComplete="on" {...props} />;
}
