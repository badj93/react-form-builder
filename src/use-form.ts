import { useActionState, useState } from 'react';
import type { ValidationRules, ValidationErrors } from './types.ts';
import { validateField } from './helpers';

interface FormProps<T> {
  formAction: () => void;
  pending: boolean;
  formState: T;
  errors: ValidationErrors | null;
}

export function useForm<T extends Record<string, any>>(
  handleSubmit: (data: T, errors: ValidationErrors | null) => Promise<void>,
  initialState: Awaited<T>,
  validationRules?: ValidationRules
): FormProps<T> {
  const [formState, formAction, pending] = useActionState<T>(
    // @ts-ignore
    onSubmit,
    initialState
  );
  const [errors, setErrors] = useState<ValidationErrors | null>(null);

  async function onSubmit(_previousState: T, formData: FormData): Promise<T> {
    const fieldValues = Object.fromEntries(formData) as T;
    let errors: ValidationErrors | null = null;

    if (validationRules && Object.keys(validationRules).length > 0) {
      for (const key of Object.keys(validationRules)) {
        errors = validateField(key, fieldValues, validationRules[key], errors);
      }
    }

    setErrors(errors);

    await handleSubmit(fieldValues, errors);

    return fieldValues;
  }

  return {
    pending,
    formState,
    errors,
    formAction,
  };
}
