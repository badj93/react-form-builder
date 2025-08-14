import type { ChangeEvent, HTMLAttributes } from 'react';
import type { FormCraftField } from '../types.ts';

interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  f: FormCraftField;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Radio({ f, onChange, defaultValue, ...props }: RadioProps) {
  return (
    <fieldset>
      <legend>{f.placeholder}</legend>
      {f.options?.map((o: string) => (
        <label key={o} htmlFor={o}>
          <input
            defaultChecked={o === defaultValue}
            id={o}
            value={o}
            onChange={onChange}
            type="radio"
            name={f.name}
            {...props}
          />
          {o}
        </label>
      ))}
    </fieldset>
  );
}
