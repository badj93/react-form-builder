import { describe, it, expect } from 'vitest';
import { ValidationRules } from '../src/types';
import { validateMinLength } from '../src/validation-rules';

describe('validateMinLength function', () => {
  it('should return null when minLength rule is not provided', () => {
    const key = 'username';
    const fieldValues = { username: 'john' };
    const rule: ValidationRules[string] = {};

    const result = validateMinLength(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return error when value length is less than minLength (string rule)', () => {
    const key = 'username';
    const fieldValues = { username: 'john' };
    const rule: ValidationRules[string] = {
      minLength: {
        value: '5',
        message: 'Username must be at least 5 characters',
      },
    };

    const result = validateMinLength(key, fieldValues, rule);
    expect(result).toEqual({
      value: 'john',
      message: 'Username must be at least 5 characters',
    });
  });

  it('should return null when value length meets minLength requirement (string rule)', () => {
    const key = 'username';
    const fieldValues = { username: 'johndoe' };
    const rule: ValidationRules[string] = {
      minLength: {
        value: '5',
        message: 'Username must be at least 5 characters',
      },
    };

    const result = validateMinLength(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return error when value length is less than minLength (number rule)', () => {
    const key = 'password';
    const fieldValues = { password: 'pass' };
    const rule: ValidationRules[string] = {
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
    };

    const result = validateMinLength(key, fieldValues, rule);
    expect(result).toEqual({
      value: 'pass',
      message: 'Password must be at least 8 characters',
    });
  });

  it('should return null when value length meets minLength requirement (number rule)', () => {
    const key = 'password';
    const fieldValues = { password: 'password123' };
    const rule: ValidationRules[string] = {
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
    };

    const result = validateMinLength(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should use default error message when custom message is not provided', () => {
    const key = 'bio';
    const fieldValues = { bio: 'Hi' };
    const rule: ValidationRules[string] = {
      minLength: {
        value: 10,
      },
    };

    const result = validateMinLength(key, fieldValues, rule);
    expect(result).toEqual({
      value: 'Hi',
      message: 'Value is too short',
    });
  });

  it('should return error for empty string when minLength is greater than 0', () => {
    const key = 'comment';
    const fieldValues = { comment: '' };
    const rule: ValidationRules[string] = {
      minLength: {
        value: 1,
        message: 'Comment cannot be empty',
      },
    };

    const result = validateMinLength(key, fieldValues, rule);
    expect(result).toEqual({
      value: '',
      message: 'Comment cannot be empty',
    });
  });
});
