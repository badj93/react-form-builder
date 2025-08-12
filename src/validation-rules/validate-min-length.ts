import type { ValidationRules } from '../types.ts';

export function validateMinLength(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string]
): { value: any; message: string } | null {
  if (!rule?.minLength?.value) {
    return null;
  }

  if (typeof rule.minLength.value === 'string') {
    if (Number(rule.minLength.value) > fieldValues[key].length) {
      return {
        value: fieldValues[key],
        message: rule.minLength?.message || 'Value is too short',
      };
    }
  }

  if (
    typeof rule.minLength.value === 'number' &&
    rule.minLength.value > fieldValues[key].length
  ) {
    return {
      value: fieldValues[key],
      message: rule.minLength?.message || 'Value is too short',
    };
  }

  return null;
}
