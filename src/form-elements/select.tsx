import type { ChangeEvent, HTMLAttributes } from 'react';
import type { FormCraftField } from '../types.ts';

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  f: FormCraftField;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  f: { name, options, ...rest },
  onChange,
  ...props
}: SelectProps) {
  return (
    <select onChange={onChange} name={name} {...rest} {...props}>
      {options?.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
