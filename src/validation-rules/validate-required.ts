import type { ValidationRuleRes, ValidationRules } from '../types.ts';

export function validateRequired(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string]
): ValidationRuleRes {
  if (rule?.required?.value === true && !fieldValues[key]) {
    return {
      value: fieldValues[key],
      message: rule.required?.message || 'This field is required',
    };
  }

  return null;
}
