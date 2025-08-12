import type { ValidationRuleRes, ValidationRules } from '../types.ts';

export function validateCustomRule(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string]
): ValidationRuleRes {
  if (typeof rule?.customRule === 'function') {
    const res = rule.customRule(fieldValues[key]);

    if (res) {
      return {
        value: fieldValues[key],
        message: res?.message || 'This field is invalid',
      };
    }
  }

  return null;
}
