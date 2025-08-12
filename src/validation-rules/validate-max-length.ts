import type { ValidationRules } from '../types.ts';

export function validateMaxLength(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string]
): { value: any; message: string } | null {
  if (!rule?.maxLength?.value) {
    return null;
  }

  if (typeof rule.maxLength.value === 'string') {
    if (Number(rule.maxLength.value) < fieldValues[key].length) {
      return {
        value: fieldValues[key],
        message: rule.maxLength?.message || 'Value is too long',
      };
    }
  }

  if (
    typeof rule.maxLength.value === 'number' &&
    rule.maxLength.value < fieldValues[key].length
  ) {
    return {
      value: fieldValues[key],
      message: rule.maxLength?.message || 'Value is too long',
    };
  }

  return null;
}
