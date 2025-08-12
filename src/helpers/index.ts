import type { ValidationErrors, ValidationRules } from '../types.ts';
import {
  validateCustomRule,
  validateEmail,
  validateFileRequired,
  validateMaxLength,
  validateMinLength,
  validateRange,
  validateRequired,
} from '../validation-rules';

export function validateField(
  key: string,
  fieldValues: any,
  rule: ValidationRules[string],
  errors: ValidationErrors | null
) {
  const newErrors: ValidationErrors = errors ? { ...errors } : {};

  const requiredError = validateRequired(key, fieldValues, rule);

  if (requiredError) {
    newErrors[key] = requiredError;
  }

  const requiredFileError = validateFileRequired(key, fieldValues, rule);

  if (requiredFileError) {
    newErrors[key] = requiredFileError;
  }

  const maxLengthError = validateMaxLength(key, fieldValues, rule);

  if (maxLengthError) {
    newErrors[key] = maxLengthError;
  }

  const minLengthError = validateMinLength(key, fieldValues, rule);

  if (minLengthError) {
    newErrors[key] = minLengthError;
  }

  const emailError = validateEmail(key, fieldValues, rule);

  if (emailError) {
    newErrors[key] = emailError;
  }

  const rangeError = validateRange(key, fieldValues, rule);

  if (rangeError) {
    newErrors[key] = rangeError;
  }

  const customRuleError = validateCustomRule(key, fieldValues, rule);

  if (customRuleError) {
    newErrors[key] = customRuleError;
  }

  return Object.keys(newErrors).length > 0 ? newErrors : null;
}
