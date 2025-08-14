import { describe, it, expect } from 'vitest';
import { ValidationRules } from '../src/types';
import { validateEmail } from '../src/validation-rules';

describe('validate-email', () => {
  const key = 'testEmail';

  const rule = {
    email: {
      value: true,
    },
  } as ValidationRules[string];

  it('return null if rule doesnt exist ', () => {
    const fieldsValues = { testEmail: 'test@mail.com' };
    const result = validateEmail(key, fieldsValues, {});

    expect(result).toBeNull();
  });

  it('return error if email without @', () => {
    const fieldsValues = { testEmail: 'testmail.com' };
    const result = validateEmail(key, fieldsValues, rule);

    expect(result?.message).toBe('Email is invalid');
  });

  it('return error if email without .', () => {
    const fieldsValues = { testEmail: 'test@mailcom' };
    const result = validateEmail(key, fieldsValues, rule);

    expect(result?.message).toBe('Email is invalid');
  });

  it('return error with custom message if email is invalid', () => {
    const fieldsValues = { testEmail: 'test@mailcom' };
    rule.email.message = 'custom error message';
    const result = validateEmail(key, fieldsValues, rule);

    expect(result?.message).toBe('custom error message');
  });

  it('return null if email is valid', () => {
    const fieldsValues = { testEmail: 'test@mail.com' };
    const result = validateEmail(key, fieldsValues, rule);

    expect(result).toBeNull();
  });

  it('return null if rule value equals true and email is invalid', () => {
    const fieldsValues = { testEmail: 'testmail.com' };
    rule.email.value = false;
    const result = validateEmail(key, fieldsValues, rule);

    expect(result).toBeNull();
  });
});
