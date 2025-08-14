# React Form Craft

A lightweight, flexible form building library for React applications with TypeScript support.

## Features

- 🔧 Easy form setup with declarative configuration
- 🧩 Built-in form elements (Input, Select, Checkbox)
- 🛠 Custom control components support
- ✅ Validation support
- 🔄 Form state management
- 🎨 Customizable styling

## Installation

```bash
npm install react-form-craft
```
## Basic Usage

```tsx
import { useState } from 'react';
import { 
    FormCraft, 
    type ValidationErrors, 
    type FormCraftOnChange 
} from 'react-form-craft';

function MyForm() {
  const formState = {
      name: '',
      email: '',
      role: 'user',
      agreeToTerms: false
  };

  const fields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Enter your name'
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email'
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
      ]
    },
    {
      name: 'agreeToTerms',
      type: 'checkbox'
    }
  ];

  const validationRules = {
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
        required: true, 
        customRule: (value?: string) => {
            if (value && !value.includes('@')) {
                return { value, message: 'Email is invalid' };
            }
        },
    },
    age: {
      range: {
        value: [18, 100],
      },
    }
  };

  const handleSubmit = async (data: any, errors: ValidationErrors | null) => {
    if (!errors) {
      console.log('Form submitted:', data);
      // Process form data
    }
  };

  const handleChange = ({ field, value }: FormCraftOnChange) => {
      console.log('field', field);
      console.log('value', value);
      // Process field data
  };

  return (
    <FormCraft
      fields={fields}
      state={formState}
      submit={handleSubmit}
      onChange={handleChange}
      validationRules={validationRules}
      className="my-form"
      btnSubmit={<button type='submit' className="submit-btn">Submit Form</button>}
    />
  );
}

```
## API Reference
### Props `FormCraft`

| Prop | Type                                                            | Required | Description |
| --- |-----------------------------------------------------------------| --- | --- |
| `fields` | `FormCraftField[]`                                              | Yes | Array of field configurations |
| `state` | `any`                                                           | Yes | Form state object |
| `submit` | `(data: any, errors: ValidationErrors \ null) => Promise<void>` | Yes | Submit handler function |
| `btnSubmit` | `ReactNode`                                                     | No | Custom submit button |
| `className` | `string`                                                        | No | CSS class for form element |
| `onChange` | `({ field, value }: FormCraftOnChange) => void`                 | No | Form change handler |
| `validationRules` | `ValidationRules`                                               | No | Validation rules for fields |

### Interface `FormCraftField`
```tsx
interface FormCraftField {
  name: string;
  type: 
      'text' | 
      'email' | 
      'password' | 
      'select' | 
      'checkbox' | 
      'textarea' | 
      'file' | 
      'number' | 
      'date' |
      'password';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  control?: ReactElement | ComponentType<any>;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  // Additional properties can be passed to the input elements
}
```

## Custom Form Controls
You can provide custom form controls using the property: `control`
```tsx
import { MyCustomInput } from './components';

const fields = [
  {
    name: 'customField',
    type: 'text',
    control: <MyCustomInput className="custom-input" />
  }
];

const fields2 = [
    {
        name: 'customField',
        type: 'text',
        control: MyCustomInput
    }
];

```

## Validation
FormCraft supports validation rules:
```txs
const validationRules = {
  username: { 
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
    }
  },
  email: {
    ...
    email: {
      value: true,
      message: 'Email is invalid',
    },
    customRule: (value?: string) => {
      if (value && !value.includes('@')) {
        return { value, message: 'Email is invalid' };
      }
    }
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
  ...
};
```
## License
MIT
