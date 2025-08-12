import type { ChangeEvent, HTMLAttributes } from 'react';
import type { FormBuilderField } from '../types.ts';

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  f: FormBuilderField;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ f, onChange, ...props }: SelectProps) {
  return (
    <select {...f} onChange={onChange} key={f.name} name={f.name} {...props}>
      {f.options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
