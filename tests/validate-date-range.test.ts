import { describe, it, expect } from 'vitest';
import { ValidationRules } from '../src/types';
import { validateDateRange } from '../src/validation-rules';

describe('validate-date-range', () => {
  const key = 'testDate';

  it('return null if rule range.value is not exists', () => {
    const fieldValues = { testDate: new Date('2023-01-15') };
    const rule = {} as ValidationRules[string];

    const result = validateDateRange(key, fieldValues, rule);

    expect(result).toBeNull();
  });

  it('return error if length range.value doesnt equal 2', () => {
    const fieldValues = { testDate: new Date('2023-01-15') };
    const rule = {
      range: {
        value: [new Date('2023-01-01')],
      },
    } as ValidationRules[string];

    const result = validateDateRange(key, fieldValues, rule);

    expect(result).not.toBeNull();
    expect(result?.message).toBe(
      'Range value is invalid. It should be an array with 2 values'
    );
  });

  it('return null if range.value contains numbers', () => {
    const fieldValues = { testDate: new Date('2023-01-15') };
    const rule = {
      range: {
        value: [1, 2],
      },
    } as ValidationRules[string];

    const result = validateDateRange(key, fieldValues, rule);

    expect(result).toBeNull();
  });

  it('return error if range.value doesnt exist instances Date', () => {
    const fieldValues = { testDate: new Date('2023-01-15') };
    const rule = {
      range: {
        value: ['2023-01-01', '2023-01-31'],
      },
    } as ValidationRules[string];

    const result = validateDateRange(key, fieldValues, rule);

    expect(result).not.toBeNull();
    expect(result?.message).toBe('Range should be a date');
  });

  it('return error if start date of range > end date range', () => {
    const fieldValues = { testDate: new Date('2023-01-15') };
    const rule = {
      range: {
        value: [new Date('2023-01-31'), new Date('2023-01-01')],
      },
    } as ValidationRules[string];

    const result = validateDateRange(key, fieldValues, rule);

    expect(result).not.toBeNull();
    expect(result?.message).toBe('Range start value is invalid');
  });

  it('return error if value < start date range', () => {
    const fieldValues = { testDate: new Date('2022-12-15') };
    const rule = {
      range: {
        value: [new Date('2023-01-01'), new Date('2023-01-31')],
      },
    } as ValidationRules[string];

    const result = validateDateRange(key, fieldValues, rule);

    expect(result).not.toBeNull();
    expect(result?.message).toBe('Range start value is invalid');
  });

  it('return error if value > end date range', () => {
    const fieldValues = { testDate: new Date('2023-02-15') };
    const rule = {
      range: {
        value: [new Date('2023-01-01'), new Date('2023-01-31')],
      },
    } as ValidationRules[string];

    const result = validateDateRange(key, fieldValues, rule);

    expect(result).not.toBeNull();
    expect(result?.message).toBe('Range end value is invalid');
  });

  it('return custom message if it exits', () => {
    const fieldValues = { testDate: new Date('2023-02-15') };
    const rule = {
      range: {
        value: [new Date('2023-01-01'), new Date('2023-01-31')],
        message: 'Пользовательское сообщение об ошибке',
      },
    } as ValidationRules[string];

    const result = validateDateRange(key, fieldValues, rule);

    expect(result).not.toBeNull();
    expect(result?.message).toBe('Пользовательское сообщение об ошибке');
  });

  it('return null, if value inside range', () => {
    const fieldValues = { testDate: new Date('2023-01-15') };
    const rule = {
      range: {
        value: [new Date('2023-01-01'), new Date('2023-01-31')],
      },
    } as ValidationRules[string];

    const result = validateDateRange(key, fieldValues, rule);

    expect(result).toBeNull();
  });
});
