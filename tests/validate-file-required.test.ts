import { describe, it, expect } from 'vitest';
import { ValidationRules } from '../src/types';
import { validateFileRequired } from '../src/validation-rules';

describe('validate-file-required', () => {
  const createFileMock = (size: number): File => {
    const fileMock = {
      size,
      name: 'test.txt',
      type: 'text/plain',
      lastModified: Date.now(),
    };

    Object.setPrototypeOf(fileMock, File.prototype);

    return fileMock as File;
  };

  it('should return an error if the field is required and the file is empty', () => {
    const key = 'document';
    const fieldValues = { document: createFileMock(0) };
    const rule: ValidationRules[string] = {
      required: { value: true, message: 'File is required' },
    };

    const result = validateFileRequired(key, fieldValues, rule);

    expect(result).toEqual({
      value: fieldValues[key],
      message: 'File is required',
    });
  });

  it('should use the default message if no custom message is provided', () => {
    const key = 'document';
    const fieldValues = { document: createFileMock(0) };
    const rule: ValidationRules[string] = {
      required: { value: true },
    };

    const result = validateFileRequired(key, fieldValues, rule);

    expect(result).toEqual({
      value: fieldValues[key],
      message: 'File is required',
    });
  });

  it('should return null if the file is not empty', () => {
    const key = 'document';
    const fieldValues = { document: createFileMock(1024) };
    const rule: ValidationRules[string] = {
      required: { value: true, message: 'File is required' },
    };

    const result = validateFileRequired(key, fieldValues, rule);

    expect(result).toBeNull();
  });

  it('should return null if the field is not required', () => {
    const key = 'document';
    const fieldValues = { document: createFileMock(0) };
    const rule: ValidationRules[string] = {
      required: { value: false, message: 'File is required' },
    };

    const result = validateFileRequired(key, fieldValues, rule);

    expect(result).toBeNull();
  });

  it('should return null if the value is not a File object', () => {
    const key = 'document';
    const fieldValues = { document: 'not a file' };
    const rule: ValidationRules[string] = {
      required: { value: true, message: 'File is required' },
    };

    const result = validateFileRequired(key, fieldValues, rule);

    expect(result).toBeNull();
  });

  it('should return null if the required rule is not present', () => {
    const key = 'document';
    const fieldValues = { document: createFileMock(0) };
    const rule: ValidationRules[string] = {};

    const result = validateFileRequired(key, fieldValues, rule);

    expect(result).toBeNull();
  });
});
