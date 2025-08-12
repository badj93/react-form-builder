import { type ChangeEvent, cloneElement, type ReactNode } from 'react';
import type {
  FormBuilderField,
  FormBuilderOnChange,
  ValidationErrors,
  ValidationRules,
} from './types';
import { useForm } from './use-form.ts';

interface FormBuilderProps {
  fields: FormBuilderField[];
  submit: (data: any, errors: ValidationErrors | null) => Promise<void>;
  state: any;
  btnSubmit?: ReactNode;
  className?: string;
  onChange?: ({ field, value }: FormBuilderOnChange) => void;
  validationRules?: ValidationRules;
}

export function FormBuilder({
  fields,
  state,
  submit,
  btnSubmit,
  className,
  onChange,
  validationRules,
}: FormBuilderProps) {
  const { formState, formAction } = useForm(submit, state, validationRules);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (onChange) {
      onChange({
        field: e.target.name,
        value: e.target.value,
      });
    }
  };

  const renderFields = () => {
    return fields.map(({ control, ...f }) => {
      if (f.type === 'select') {
        if (control) return cloneElement(control, { key: f.name, ...f });

        return (
          <select
            {...f}
            onChange={onChange ? onChangeHandler : f.onChange}
            key={f.name}
            defaultValue={formState[f.name]}
            name={f.name}
          >
            {f.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      }

      if (f.type === 'checkbox') {
        if (control) return cloneElement(control, { key: f.name, ...f });

        return (
          <label key={f.name} htmlFor={f.name}>
            <input
              id={f.name}
              type={f.type}
              onChange={onChange ? onChangeHandler : f.onChange}
              name={f.name}
              defaultValue={formState[f.name]}
            />
            <span>{f.placeholder}</span>
          </label>
        );
      }

      if (control) return cloneElement(control, { key: f.name, ...f });

      return (
        <input
          onChange={onChange ? onChangeHandler : f.onChange}
          key={f.name}
          defaultValue={formState[f.name]}
          name={f.name}
          type={f.type}
          placeholder={f.placeholder}
          disabled={f.disabled}
          autoComplete="off"
        />
      );
    });
  };

  const renderBtnSubmit = () => {
    if (btnSubmit) return btnSubmit;

    return <button type="submit">Submit</button>;
  };

  return (
    <form className={className} action={formAction}>
      {renderFields()}
      {renderBtnSubmit()}
    </form>
  );
}
