import { FormCraft } from '../form-craft.tsx';
import type { FormCraftOnChange, ValidationErrors } from '../types.ts';
import { FIELDS, VALIDATION_RULES } from './constants.tsx';
import './app.css';

export function App() {
  const submit = async (
    state: any,
    payload: any,
    errors: ValidationErrors | null
  ) => {
    console.log('state', state);
    console.log('payload', payload);
    console.log('errors', errors);
    return payload;
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
        fio: null,
        email: null,
        review: 'test review',
        radio: 'radio3',
      }}
      validationRules={VALIDATION_RULES}
      submit={submit}
      onChange={onChange}
    />
  );
}
