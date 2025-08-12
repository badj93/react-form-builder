import { FormCraft } from '../form-craft.tsx';
import type { FormCraftOnChange } from '../types.ts';
import { FIELDS, VALIDATION_RULES } from './constants.tsx';
import './app.css';

export function App() {
  const submit = async (data: any, errors: any) => {
    console.log('errors', errors);
    console.log('data', data);
  };

  const onChange = ({ field, value }: FormCraftOnChange) => {
    console.log('field', field);
    console.log('value', value);
  };

  return (
    <FormCraft
      className="form"
      fields={FIELDS}
      state={{
        name: null,
        email: null,
      }}
      validationRules={VALIDATION_RULES}
      submit={submit}
      onChange={onChange}
    />
  );
}
