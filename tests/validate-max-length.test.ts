import { describe, expect, it } from 'vitest';
import { validateMaxLength } from '../src/validation-rules';
import { ValidationRules } from '../src/types';

describe('validateMaxLength', () => {
  it('should return null when maxLength rule is not defined', () => {
    const key = 'username';
    const fieldValues = { username: 'testuser' };
    const rule = {};

    const result = validateMaxLength(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return null when string length is less than maxLength (string value)', () => {
    const key = 'username';
    const fieldValues = { username: 'short' };
    const rule: ValidationRules[string] = {
      maxLength: { value: '10' },
    };

    const result = validateMaxLength(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return error when string length exceeds maxLength (string value)', () => {
    const key = 'username';
    const fieldValues = { username: 'thisusernameistoolong' };
    const rule: ValidationRules[string] = {
      maxLength: { value: '10' },
    };

    const result = validateMaxLength(key, fieldValues, rule);
    expect(result).toEqual({
      value: 'thisusernameistoolong',
      message: 'Value is too long',
    });
  });

  it('should return null when string length is less than maxLength (number value)', () => {
    const key = 'username';
    const fieldValues = { username: 'short' };
    const rule: ValidationRules[string] = {
      maxLength: { value: 10 },
    };

    const result = validateMaxLength(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return error when string length exceeds maxLength (number value)', () => {
    const key = 'username';
    const fieldValues = { username: 'thisusernameistoolong' };
    const rule: ValidationRules[string] = {
      maxLength: { value: 10 },
    };

    const result = validateMaxLength(key, fieldValues, rule);
    expect(result).toEqual({
      value: 'thisusernameistoolong',
      message: 'Value is too long',
    });
  });

  it('should return custom error message when provided', () => {
    const key = 'username';
    const fieldValues = { username: 'thisistoolong' };
    const rule: ValidationRules[string] = {
      maxLength: {
        value: 5,
        message: 'Maximum length exceeded',
      },
    };

    const result = validateMaxLength(key, fieldValues, rule);
    expect(result).toEqual({
      value: 'thisistoolong',
      message: 'Maximum length exceeded',
    });
  });

  it('should return null when string length exactly equals maxLength', () => {
    const key = 'username';
    const fieldValues = { username: 'exact' };
    const rule: ValidationRules[string] = {
      maxLength: { value: 5 },
    };

    const result = validateMaxLength(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return null when value is empty string', () => {
    const key = 'username';
    const fieldValues = { username: '' };
    const rule: ValidationRules[string] = {
      maxLength: { value: 10 },
    };

    const result = validateMaxLength(key, fieldValues, rule);
    expect(result).toBeNull();
  });
});
