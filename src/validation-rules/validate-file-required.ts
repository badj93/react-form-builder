import type { ValidationRuleRes, ValidationRules } from '../types.ts';

export function validateFileRequired(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string]
): ValidationRuleRes {
  if (
    rule?.required?.value === true &&
    fieldValues[key] instanceof File &&
    fieldValues[key].size === 0
  ) {
    return {
      value: fieldValues[key],
      message: rule.required?.message || 'File is required',
    };
  }

  return null;
}
