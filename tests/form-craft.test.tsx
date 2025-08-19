import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { FormCraftField } from '../src/types';
import { FormCraft } from '../src/lib';

describe('Form Craft component', () => {
  const mockSubmit = vi.fn().mockResolvedValue({});
  const mockOnChange = vi.fn();

  let fields: FormCraftField[];
  let initialState: Record<string, any>;

  beforeEach(() => {
    fields = [
      {
        name: 'fio',
        type: 'text',
        placeholder: 'Enter fio...',
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Enter email...',
      },
      {
        name: 'agree',
        type: 'checkbox',
        placeholder: 'Agree?',
      },
    ];

    initialState = {
      fio: '',
      agree: false,
    };
  });

  it('should view all fields', () => {
    render(
      // @ts-ignore
      <FormCraft fields={fields} submit={mockSubmit} state={initialState} />
    );

    expect(screen.getByPlaceholderText('Enter fio...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email...')).toBeInTheDocument();
    expect(screen.getByText('Agree?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('should view custom submit button', () => {
    render(
      // @ts-ignore
      <FormCraft
        fields={fields}
        submit={mockSubmit}
        state={initialState}
        // @ts-ignore
        btnSubmit={<button type="submit">Custom submit</button>}
      />
    );

    expect(
      screen.getByRole('button', { name: 'Custom submit' })
    ).toBeInTheDocument();
  });

  it('should call onChange handler', () => {
    render(
      // @ts-ignore
      <FormCraft
        fields={fields}
        submit={mockSubmit}
        state={initialState}
        onChange={mockOnChange}
      />
    );

    const fioInput = screen.getByPlaceholderText('Enter fio...');
    fireEvent.change(fioInput, { target: { value: 'test_user' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      field: 'fio',
      value: 'test_user',
    });
  });

  it('should submit form', async () => {
    render(
      // @ts-ignore
      <FormCraft fields={fields} submit={mockSubmit} state={initialState} />
    );

    const fioInput = screen.getByPlaceholderText('Enter fio...');
    const emailInput = screen.getByPlaceholderText('Enter email...');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await act(async () => {
      fireEvent.change(fioInput, { target: { value: 'test_user' } });
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);
    });

    expect(mockSubmit).toHaveBeenCalled();
  });

  it('should view error message', async () => {
    const validationRules = {
      fio: {
        required: {
          value: true,
          message: 'Field is required',
        },
      },
    };

    const mockSubmitWithErrors = vi.fn().mockResolvedValue({
      ...initialState,
      errors: {
        username: {
          message: 'Field is required',
        },
      },
    });

    render(
      // @ts-ignore
      <FormCraft
        fields={[
          {
            name: 'fio',
            type: 'text',
            placeholder: 'Enter fio...',
            control: (props) => (
              // @ts-ignore
              <span>
                {props.error}
                {/*// @ts-ignore*/}
                <input {...props} />
              </span>
            ),
          },
        ]}
        submit={mockSubmitWithErrors}
        state={initialState}
        validationRules={validationRules}
      />
    );

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    await screen.findByText('Field is required');
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });
});
