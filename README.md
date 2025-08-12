# React Form Builder

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
npm install react-form-builder
```
## Basic Usage

```tsx
import { useState } from 'react';
import { 
    FormBuilder, 
    type ValidationErrors, 
    type FormBuilderOnChange 
} from 'react-formbuilder';

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
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email'
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
      ]
    },
    {
      name: 'agreeToTerms',
      label: 'I agree to the terms',
      type: 'checkbox'
    }
  ];

  const validationRules = {
    name: { required: true, message: 'Name is required', },
    email: { 
        required: true, 
        customRule: (value?: string) => {
            if (value && !value.includes('@')) {
                return { value, message: 'Email is invalid' };
            }
        },
    },
  };

  const handleSubmit = async (data: any, errors: ValidationErrors | null) => {
    if (!errors) {
      console.log('Form submitted:', data);
      // Process form data
    }
  };

  const handleChange = ({ field, value }: FormBuilderOnChange) => {
      console.log('field', field);
      console.log('value', value);
      // Process field data
  };

  return (
    <FormBuilder
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
### Props `FormBuilder`

| Prop | Type                                                            | Required | Description |
| --- |-----------------------------------------------------------------| --- | --- |
| `fields` | `FormBuilderField[]`                                            | Yes | Array of field configurations |
| `state` | `any`                                                           | Yes | Form state object |
| `submit` | `(data: any, errors: ValidationErrors \ null) => Promise<void>` | Yes | Submit handler function |
| `btnSubmit` | `ReactNode`                                                     | No | Custom submit button |
| `className` | `string`                                                        | No | CSS class for form element |
| `onChange` | `({ field, value }: FormBuilderOnChange) => void`               | No | Form change handler |
| `validationRules` | `ValidationRules`                                               | No | Validation rules for fields |

### Interface `FormBuilderField`
```tsx
interface FormBuilderField {
  name: string;
  label?: string;
  type: 'text' | 'email' | 'password' | 'select' | 'checkbox' | string;
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
    label: 'Custom Field',
    type: 'text',
    control: <MyCustomInput className="custom-input" />
  }
];

const fields2 = [
    {
        name: 'customField',
        label: 'Custom Field',
        type: 'text',
        control: MyCustomInput
    }
];

```

## Validation
FormBuilder supports validation rules:
```txs
const validationRules = {
  username: { required: true, message: 'Custom message' },
  email: {
    ...
    customRule: (value?: string) => {
      if (value && !value.includes('@')) {
        return { value, message: 'Email is invalid' };
      }
    }
  }
  ...
};
```
## License
MIT
