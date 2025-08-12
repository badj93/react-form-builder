import type { ValidationRuleRes, ValidationRules } from '../types.ts';

export function validateEmail(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string]
): ValidationRuleRes {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (rule?.email?.value && !regex.test(fieldValues[key])) {
    return {
      value: fieldValues[key],
      message: rule.email?.message || 'Email is invalid',
    };
  }

  return null;
}
