import { FormBuilder } from '../form-builder.tsx';
import type { FormBuilderOnChange } from '../types.ts';
import { FIELDS, VALIDATION_RULES } from './constants.tsx';
import './app.css';

export function App() {
  const submit = async (data: any, errors: any) => {
    console.log('errors', errors);
    console.log('data', data);
  };

  const onChange = ({ field, value }: FormBuilderOnChange) => {
    console.log('field', field);
    console.log('value', value);
  };

  return (
    <FormBuilder
      className="form"
      fields={FIELDS}
      state={{
        name: 'test',
        email: 'test@test.ru',
      }}
      validationRules={VALIDATION_RULES}
      submit={submit}
      onChange={onChange}
    />
  );
}
