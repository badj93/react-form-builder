import {
  type ChangeEvent,
  cloneElement,
  type ReactNode,
  isValidElement,
  type ReactElement,
  type ComponentType,
} from 'react';
import type {
  FormCraftField,
  FormCraftOnChange,
  ValidationErrors,
  ValidationRules,
} from './types';
import { useForm } from './use-form.ts';
import { Checkbox, Input, Select, TextArea } from './form-elements';

interface FormCraftProps {
  fields: FormCraftField[];
  submit: (data: any, errors: ValidationErrors | null) => Promise<void>;
  state: any;
  btnSubmit?: ReactNode;
  className?: string;
  onChange?: ({ field, value }: FormCraftOnChange) => void;
  validationRules?: ValidationRules;
}

export function FormCraft({
  fields,
  state,
  submit,
  btnSubmit,
  className,
  onChange,
  validationRules,
}: FormCraftProps) {
  const { formState, formAction } = useForm(submit, state, validationRules);

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      onChange({
        field: e.target.name,
        value: e.target.value,
      });
    }
  };

  const renderControl = (
    control: ReactElement | ComponentType<any>,
    f: FormCraftField
  ) => {
    if (isValidElement(control)) {
      return cloneElement(control, { key: f.name, ...f });
    }

    const ControlComponent = control;

    return <ControlComponent key={f.name} {...f} />;
  };

  const renderFields = () => {
    return fields.map(({ control, ...f }) => {
      if (f.type === 'select') {
        if (control) {
          return renderControl(control, f);
        }

        return (
          <Select
            key={f.name}
            f={f}
            onChange={onChange ? onChangeHandler : f.onChange}
            defaultValue={formState[f.name]}
          />
        );
      }

      if (f.type === 'checkbox') {
        if (control) {
          return renderControl(control, f);
        }

        return (
          <Checkbox
            key={f.name}
            f={f}
            onChange={onChange ? onChangeHandler : f.onChange}
            defaultValue={formState[f.name]}
          />
        );
      }

      if (f.type === 'textarea') {
        if (control) {
          return renderControl(control, f);
        }

        return (
          <TextArea
            key={f.name}
            onChange={onChange ? onChangeHandler : f.onChange}
            f={f}
            defaultValue={formState[f.name]}
          />
        );
      }

      if (control) {
        return renderControl(control, f);
      }

      return (
        <Input
          f={f}
          onChange={onChange ? onChangeHandler : f.onChange}
          defaultValue={formState[f.name]}
          key={f.name}
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
