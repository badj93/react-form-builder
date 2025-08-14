import { describe, expect, it } from 'vitest';
import { validateCustomRule } from '../src/validation-rules';
import { ValidationRules } from '../src/types';

describe('validateCustomRule', () => {
  it('should return null when customRule is not defined', () => {
    const key = 'username';
    const fieldValues = { username: 'testuser' };
    const rule = {};

    const result = validateCustomRule(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return null when customRule is not a function', () => {
    const key = 'username';
    const fieldValues = { username: 'testuser' };
    const rule = {
      customRule: 'not-a-function',
    } as unknown as ValidationRules[string];

    const result = validateCustomRule(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return error when custom validation fails (returns true)', () => {
    const key = 'username';
    const fieldValues = { username: 'invalid' };
    const rule: ValidationRules[string] = {
      customRule: () => true,
    };

    const result = validateCustomRule(key, fieldValues, rule);
    expect(result).toEqual({
      value: 'invalid',
      message: 'This field is invalid',
    });
  });

  it('should return custom error when validation returns error object', () => {
    const key = 'username';
    const fieldValues = { username: 'invalid' };
    const rule: ValidationRules[string] = {
      customRule: () => ({ message: 'Custom error message' }),
    };

    const result = validateCustomRule(key, fieldValues, rule);
    expect(result).toEqual({
      value: 'invalid',
      message: 'Custom error message',
    });
  });

  it('should return null when custom validation passes (returns false)', () => {
    const key = 'username';
    const fieldValues = { username: 'valid' };
    const rule: ValidationRules[string] = {
      customRule: () => false,
    };

    const result = validateCustomRule(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return null when custom validation passes (returns null)', () => {
    const key = 'username';
    const fieldValues = { username: 'valid' };
    const rule: ValidationRules[string] = {
      customRule: () => null,
    };

    const result = validateCustomRule(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return null when custom validation passes (returns undefined)', () => {
    const key = 'username';
    const fieldValues = { username: 'valid' };
    const rule: ValidationRules[string] = {
      customRule: () => undefined,
    };

    const result = validateCustomRule(key, fieldValues, rule);
    expect(result).toBeNull();
  });
});
