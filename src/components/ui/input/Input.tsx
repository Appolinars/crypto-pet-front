import { clsx } from 'clsx';
import { FC } from 'react';

import { IInput } from './Input.interface';

import styles from './Input.module.scss';

const Input: FC<IInput> = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  containerClass,
  inputClass,
  maxLength = 50,
  children,
}) => {
  return (
    <div className={clsx(styles.input_container, containerClass)}>
      <input
        className={clsx(
          'rounded-md bg-gray-700 border-none p-3 placeholder:text-primaryLightColor placeholder:opacity-50 w-full  outline-none',
          inputClass
        )}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {children}
    </div>
  );
};

export default Input;
