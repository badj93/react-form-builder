import { useActionState, useState } from 'react';
import type {
  ValidationErrors,
  ValidationRules,
  FormCraftHandleSubmitParams,
} from './types.ts';
import { validateField } from './helpers';

interface FormProps<STATE, PAYLOAD> {
  formAction: (payload: PAYLOAD) => void;
  pending: boolean;
  formState: STATE;
  errors: ValidationErrors | null;
}

export function useForm<STATE, PAYLOAD>(
  handleSubmit: (params: FormCraftHandleSubmitParams) => Promise<STATE> | STATE,
  initialState: Awaited<STATE>,
  validationRules?: ValidationRules
): FormProps<STATE, PAYLOAD> {
  const [formState, formAction, pending] = useActionState<STATE, PAYLOAD>(
    onSubmit,
    initialState
  );
  const [errors, setErrors] = useState<ValidationErrors | null>(null);

  async function onSubmit(
    state: Awaited<STATE>,
    payload: PAYLOAD
  ): Promise<STATE> {
    const fieldValues = Object.fromEntries(payload as any) as PAYLOAD;
    let errors: ValidationErrors | null = null;

    if (validationRules && Object.keys(validationRules).length > 0) {
      for (const key of Object.keys(validationRules)) {
        errors = validateField(key, fieldValues, validationRules[key], errors);
      }
    }

    setErrors(errors);

    const result = (await handleSubmit({
      state,
      payload: Object.fromEntries(payload as any) as PAYLOAD,
      errors,
    })) as Promise<STATE>;

    if (result) return result;

    return state as STATE;
  }

  return {
    pending,
    formState,
    errors,
    formAction,
  };
}
