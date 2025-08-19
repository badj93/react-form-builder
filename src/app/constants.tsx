import type { FormCraftField, ValidationRules } from '../types.ts';

export const FIELDS: FormCraftField[] = [
  { name: 'fio', placeholder: 'Enter fio...' },
  { name: 'age', placeholder: 'Enter age...' },
  {
    name: 'sex',
    type: 'select',
    placeholder: 'Select...',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ],
  },
  { name: 'email', placeholder: 'Enter email...' },
  { name: 'birthday', type: 'date', placeholder: 'Enter birthday...' },
  {
    name: 'agree',
    type: 'checkbox',
    placeholder: 'Agree?',
  },
  {
    name: 'custom',
    placeholder: 'Enter custom...',
    control: <input />,
  },
  {
    name: 'review',
    type: 'textarea',
    placeholder: 'Enter review',
  },
  {
    name: 'radio',
    type: 'radio',
    options: ['radio1', 'radio2', 'radio3'],
    placeholder: 'Radio',
  },
  {
    name: 'group example',
    type: 'group',
    className: 'css class',
    group: [
      {
        name: 'name',
        placeholder: 'Enter name',
      },
      {
        name: 'surname',
        placeholder: 'Enter surname',
      },
      {
        name: 'agree_with_policy',
        type: 'checkbox',
        placeholder: 'Do you agree with user policy?',
      },
    ],
  },
];

export const VALIDATION_RULES: ValidationRules = {
  fio: {
    required: {
      value: true,
      message: 'Fio is required',
    },
    maxLength: {
      value: 10,
      message: 'Fio is too long',
    },
    minLength: {
      value: 1,
      message: 'Fio is too short',
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
  review: {
    required: {
      value: true,
      message: 'Review is required',
    },
  },
};
