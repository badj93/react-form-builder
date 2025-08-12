import type { HTMLAttributes, ReactElement, ComponentType } from 'react';

export interface FormCraftField
  extends HTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  name: string;
  type:
    | 'text'
    | 'email'
    | 'select'
    | 'textarea'
    | 'file'
    | 'number'
    | 'date'
    | 'password'
    | 'checkbox';
  options?: any[];
  disabled?: boolean;
  placeholder?: string;
  control?: ReactElement | ComponentType<any>;
}

export interface FormCraftOnChange {
  field: string;
  value: any;
}

export interface ValidationRuleDesc {
  value: any;
  message?: string;
}

export interface ValidationRules {
  [key: string]: {
    required?: ValidationRuleDesc;
    maxLength?: ValidationRuleDesc;
    minLength?: ValidationRuleDesc;
    email?: ValidationRuleDesc;
    range?: ValidationRuleDesc;
    customRule?: (value?: any) => { message: string } | undefined;
  };
}

export type ValidationRuleRes = { value: any; message: string } | null;

export interface ValidationErrors {
  [key: string]: {
    value: any;
    message: string;
  };
}
