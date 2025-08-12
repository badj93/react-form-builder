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

export interface ValidationRules {
  [key: string]: {
    required?: {
      value: boolean;
      message?: string;
    };
    customRule?: (value?: any) => { message: string } | undefined;
  };
}

export interface ValidationErrors {
  [key: string]: {
    value: any;
    message: string;
  };
}
