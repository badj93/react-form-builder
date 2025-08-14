import { describe, it, expect } from 'vitest';
import { validateRequired } from '../src/validation-rules';
import { ValidationRules } from '../src/types';

describe('validate-required', () => {
  const key = 'testRequired';
  const rule: ValidationRules[string] = {
    required: {
      value: true,
      message: 'Value is required',
    },
  };

  it('return null if value exists', () => {
    const fieldsValues = { testRequired: 'test' };
    const result = validateRequired(key, fieldsValues, rule);

    expect(result).toBeNull();
  });

  it('return error if value doesnt exist', () => {
    const fieldsValues = { testRequired: undefined };
    const result = validateRequired(key, fieldsValues, rule);

    expect(result.message).toBe('Value is required');
  });

  it('return custom error if value doesnt exist and has custom message', () => {
    const fieldsValues = { testRequired: undefined };
    rule.required.message = 'custom error message';
    const result = validateRequired(key, fieldsValues, rule);

    expect(result.message).toBe('custom error message');
  });

  it('return null if rule value equals false', () => {
    const fieldsValues = { testRequired: undefined };
    rule.required.value = false;
    const result = validateRequired(key, fieldsValues, rule);

    expect(result).toBeNull();
  });

  it('return null if rule doesnt exist', () => {
    const fieldsValues = { testRequired: undefined };
    rule.required = undefined;
    const result = validateRequired(key, fieldsValues, rule);

    expect(result).toBeNull();
  });
});
