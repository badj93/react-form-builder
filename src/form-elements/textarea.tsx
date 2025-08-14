import type { ChangeEvent, HTMLAttributes } from 'react';
import type { FormCraftField } from '../types.ts';

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  f: FormCraftField;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ f, onChange, ...props }: TextAreaProps) {
  return <textarea onChange={onChange} {...f} {...props} />;
}
