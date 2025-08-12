import type { FormCraftField } from '../types.ts';

export const FIELDS: FormCraftField[] = [
  { name: 'name', type: 'text', placeholder: 'Enter...' },
  { name: 'surname', type: 'text', placeholder: 'Enter...' },
  { name: 'age', type: 'text', placeholder: 'Enter...' },
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

export const VALIDATION_RULES = {
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
    customRule: (value?: string) => {
      if (value && !value.includes('@')) {
        return { value, message: 'Email is invalid' };
      }
    },
  },
};
