import { describe, it, expect } from 'vitest';
import { ValidationRules } from '../src/types';
import { validateRange } from '../src/validation-rules';

describe('validateRange function', () => {
  it('should return null if validation passes', () => {
    const key = 'age';
    const fieldValues = { age: 25 };
    const rule: ValidationRules[string] = {
      range: {
        value: [18, 65],
      },
    };

    const result = validateRange(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return error if range value is not an array with 2 values', () => {
    const key = 'age';
    const fieldValues = { age: 25 };
    const rule: ValidationRules[string] = {
      range: {
        value: [18],
      },
    };

    const result = validateRange(key, fieldValues, rule);
    expect(result).toEqual({
      value: [18],
      message: 'Range value is invalid. It should be an array with 2 values',
    });
  });

  it('should return null if range values are Date objects', () => {
    const key = 'birthdate';
    const fieldValues = { birthdate: new Date('2000-01-01') };
    const rule: ValidationRules[string] = {
      range: {
        value: [new Date('1990-01-01'), new Date('2020-01-01')],
      },
    };

    const result = validateRange(key, fieldValues, rule);
    expect(result).toBeNull();
  });

  it('should return error if range values are not numbers', () => {
    const key = 'age';
    const fieldValues = { age: 25 };
    const rule: ValidationRules[string] = {
      range: {
        value: ['18', '65'],
      },
    };

    const result = validateRange(key, fieldValues, rule);
    expect(result).toEqual({
      value: ['18', '65'],
      message: 'Range value is invalid. It should be an array with 2 numbers',
    });
  });

  it('should return error if field value is not a number', () => {
    const key = 'age';
    const fieldValues = { age: 'twenty five' };
    const rule: ValidationRules[string] = {
      range: {
        value: [18, 65],
      },
    };

    const result = validateRange(key, fieldValues, rule);
    expect(result).toEqual({
      value: NaN,
      message: 'Value is not a number',
    });
  });

  it('should return error if value is less than minimum range', () => {
    const key = 'age';
    const fieldValues = { age: 15 };
    const rule: ValidationRules[string] = {
      range: {
        value: [18, 65],
      },
    };

    const result = validateRange(key, fieldValues, rule);
    expect(result).toEqual({
      value: 15,
      message: 'Value is out of range',
    });
  });

  it('should return error if value is greater than maximum range', () => {
    const key = 'age';
    const fieldValues = { age: 70 };
    const rule: ValidationRules[string] = {
      range: {
        value: [18, 65],
      },
    };

    const result = validateRange(key, fieldValues, rule);
    expect(result).toEqual({
      value: 70,
      message: 'Value is out of range',
    });
  });

  it('should return custom error message if provided', () => {
    const key = 'age';
    const fieldValues = { age: 70 };
    const rule: ValidationRules[string] = {
      range: {
        value: [18, 65],
        message: 'Age must be between 18 and 65',
      },
    };

    const result = validateRange(key, fieldValues, rule);
    expect(result).toEqual({
      value: 70,
      message: 'Age must be between 18 and 65',
    });
  });

  it('should return null if range property is not provided', () => {
    const key = 'age';
    const fieldValues = { age: 25 };
    const rule: ValidationRules[string] = {};

    const result = validateRange(key, fieldValues, rule);
    expect(result).toBeNull();
  });
});
