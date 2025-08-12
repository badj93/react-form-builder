import type { ValidationRuleRes, ValidationRules } from '../types.ts';

export function validateRange(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string]
): ValidationRuleRes {
  if (rule?.range?.value && rule.range.value instanceof Array) {
    if (rule.range.value.length !== 2) {
      return {
        value: rule.range.value,
        message: 'Range value is invalid. It should be an array with 2 values',
      };
    }

    if (
      typeof rule.range.value[0] !== 'number' ||
      typeof rule.range.value[1] !== 'number'
    ) {
      return {
        value: rule.range.value,
        message: 'Range value is invalid. It should be an array with 2 numbers',
      };
    }

    const value = Number(fieldValues[key]);

    if (isNaN(value)) {
      return {
        value,
        message: 'Value is not a number',
      };
    }

    if (
      fieldValues[key] < rule.range.value[0] ||
      fieldValues[key] > rule.range.value[1]
    ) {
      return {
        value: fieldValues[key],
        message: rule.range?.message || 'Value is out of range',
      };
    }
  }

  return null;
}
