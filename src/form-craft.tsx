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
  FormCraftHandleSubmitParams,
  FormCraftOnChange,
  ValidationRules,
} from './types';
import { useForm } from './use-form.ts';
import { Checkbox, Input, Radio, Select, TextArea } from './form-elements';

interface FormCraftProps<STATE> {
  fields: FormCraftField[];
  submit: (params: FormCraftHandleSubmitParams) => Promise<STATE> | STATE;
  state?: any;
  btnSubmit?: ReactNode;
  className?: string;
  onChange?: ({ field, value }: FormCraftOnChange) => void;
  validationRules?: ValidationRules;
}

export function FormCraft<STATE>({
  fields,
  state,
  submit,
  btnSubmit,
  className,
  onChange,
  validationRules,
}: FormCraftProps<STATE>) {
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

  const renderFields = (groupFields?: FormCraftField[]): any => {
    return (
      groupFields instanceof Array && groupFields?.length > 0
        ? groupFields
        : fields
    ).map(({ control, ...f }) => {
      if (f.type === 'select') {
        if (control) {
          return renderControl(control, f);
        }

        return (
          <Select
            key={f.name}
            f={f}
            onChange={onChange ? onChangeHandler : f.onChange}
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
            defaultChecked={formState[f.name]}
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

      if (f.type === 'radio') {
        if (control) {
          return renderControl(control, f);
        }

        return (
          <Radio
            key={f.name}
            onChange={onChange ? onChangeHandler : f.onChange}
            f={f}
            defaultValue={formState[f.name]}
          />
        );
      }

      if (
        f.type === 'group' &&
        f.group instanceof Array &&
        f.group.length > 0
      ) {
        return renderFields(f.group);
      }

      if (control) {
        return renderControl(control, f);
      }

      return (
        <Input
          f={f}
          onChange={onChange ? onChangeHandler : f.onChange}
          defaultValue={
            formState && f.name in formState ? formState[f.name] : undefined
          }
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
