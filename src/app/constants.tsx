import type { FormCraftField, ValidationRules } from '../types.ts';

export const FIELDS: FormCraftField[] = [
  { name: 'name', type: 'text', placeholder: 'Enter...' },
  { name: 'surname', type: 'text', placeholder: 'Enter...' },
  { name: 'age', type: 'text', placeholder: 'Enter age...' },
  {
    name: 'sex',
    type: 'select',
    placeholder: 'Select...',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
  },
  { name: 'email', type: 'text', placeholder: 'Enter...' },
  { name: 'birthday', type: 'date', placeholder: 'Enter...' },
  { name: 'agree', type: 'checkbox', placeholder: 'Agree?' },
  {
    name: 'custom',
    type: 'text',
    placeholder: 'Enter custom...',
    control: <input />,
  },
];

export const VALIDATION_RULES: ValidationRules = {
  name: {
    required: {
      value: true,
      message: 'Name is required',
    },
    maxLength: {
      value: 10,
      message: 'Name is too long',
    },
    minLength: {
      value: 1,
      message: 'Name is too short',
    },
  },
  email: {
    required: {
      value: true,
      message: 'Email is required',
    },
    email: {
      value: true,
      message: 'Email is invalid',
    },
  },
  age: {
    range: {
      value: [18, 100],
    },
  },
  birthday: {
    range: {
      value: [new Date(1991, 0, 1), new Date(2025, 0, 1)],
    },
  },
};
