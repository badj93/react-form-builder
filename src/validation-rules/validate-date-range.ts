import type { ValidationRuleRes, ValidationRules } from '../types.ts';

export function validateDateRange(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string]
): ValidationRuleRes {
  if (rule?.range?.value && rule.range.value instanceof Array) {
    const value = new Date(fieldValues[key]);

    if (rule.range.value.length !== 2) {
      return {
        value: rule.range.value,
        message: 'Range value is invalid. It should be an array with 2 values',
      };
    }

    if (
      typeof rule.range.value[0] === 'number' ||
      typeof rule.range.value[1] === 'number'
    ) {
      return null;
    }

    const range = rule.range.value as [Date, Date];

    if (range[0] instanceof Date && range[1] instanceof Date) {
      if (range[0] > range[1]) {
        return {
          value: range,
          message: rule.range?.message || 'Range start value is invalid',
        };
      }

      if (range[0] > value) {
        return {
          value: range,
          message: rule.range?.message || 'Range start value is invalid',
        };
      }

      if (range[1] < value) {
        return {
          value: range,
          message: rule.range?.message || 'Range end value is invalid',
        };
      }
    } else {
      return {
        value: range,
        message: rule.range?.message || 'Range should be a date',
      };
    }
  }

  return null;
}
