import React, { FC } from 'react';
// import { useForm } from "react-hook-form";
// import Select from "react-select";

export interface TextInputInterface {
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  label?: string;
  register: any;
  readOnly?: boolean;
  layout?: string;
  options?: any[];
  hidden?: boolean;
  isMulti?: boolean;
  field?: any;
  formatOptionLabel?: any;
  accept?: string;
  ref?: string;
  errors?: any;
  disabled?: boolean;
}

const TextInput: FC<TextInputInterface> = ({
  name,
  type,
  placeholder,
  defaultValue,
  className,
  label,
  readOnly,
  layout,
  options,
  hidden,
  isMulti,
  field,
  formatOptionLabel,
  accept,
  ref,
  disabled,
  register,
  errors,
}): JSX.Element => {
  const error = errors[name];

  return (
    <div className='form-control w-full'>
      <label className='label'>
        {label && <span className='label-text'>{label}</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          {...register}
          className={`textarea textarea-bordered h-24 w-full ${className}`}
          placeholder={placeholder}
        />
      ) : type === 'image' ? (
        ''
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          id={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          {...register}
          className={`input input-bordered w-full ${className} ${
            disabled && 'input-disabled'
          }`}
        />
      )}
      <label className='label '>
        {error && (
          <span className='label-text-alt text-red-500'>{error.message}</span>
        )}
      </label>
    </div>
  );
};
export default TextInput;
