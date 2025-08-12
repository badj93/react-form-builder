import type { ValidationErrors, ValidationRules } from '../types.ts';

export function validateField(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string],
  errors: ValidationErrors | null
) {
  const newErrors: ValidationErrors = errors ? { ...errors } : {};

  if (rule?.required?.value === true && !fieldValues[key]) {
    newErrors[key] = {
      value: fieldValues[key],
      message: rule.required.message || 'This field is required',
    };
  }

  if (
    rule?.required?.value === true &&
    fieldValues[key] instanceof File &&
    fieldValues[key].size === 0
  ) {
    newErrors[key] = {
      value: fieldValues[key],
      message: rule.required.message || 'File is required',
    };
  }

  if (typeof rule?.customRule === 'function') {
    const res = rule.customRule(fieldValues[key]);

    if (res) {
      newErrors[key] = {
        value: fieldValues[key],
        message: res?.message || 'This field is invalid',
      };
    }
  }

  return Object.keys(newErrors).length > 0 ? newErrors : null;
}
