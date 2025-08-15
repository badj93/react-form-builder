import { FormCraft } from '../form-craft.tsx';
import type {
  FormCraftHandleSubmitParams,
  FormCraftOnChange,
} from '../types.ts';
import { FIELDS, VALIDATION_RULES } from './constants.tsx';
import './app.css';

export function App() {
  const submit = async ({
    state,
    payload,
    errors,
  }: FormCraftHandleSubmitParams) => {
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
      state={{}}
      validationRules={VALIDATION_RULES}
      submit={submit}
      onChange={onChange}
    />
  );
}
