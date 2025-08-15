import type { ChangeEvent, HTMLAttributes } from 'react';
import type { FormCraftField } from '../types.ts';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  f: FormCraftField;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  f: { name, placeholder, ...rest },
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <label htmlFor={name}>
      <input id={name} onChange={onChange} name={name} {...rest} {...props} />
      <span>{placeholder}</span>
    </label>
  );
}
