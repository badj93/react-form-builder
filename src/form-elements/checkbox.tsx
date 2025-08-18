import { type ChangeEvent, type HTMLAttributes, useState } from 'react';
import type { FormCraftField } from '../types.ts';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  f: FormCraftField;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  f: { name, placeholder, ...rest },
  onChange,
  defaultChecked,
  ...props
}: CheckboxProps) {
  const [checked, setChecked] = useState(!!defaultChecked);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') onChange(e);
    setChecked(e.target.checked);
  };

  return (
    <label htmlFor={name}>
      <input
        id={name}
        name={name}
        {...rest}
        {...props}
        onChange={onChangeHandler}
        defaultChecked={checked}
      />
      <span>{placeholder}</span>
    </label>
  );
}
