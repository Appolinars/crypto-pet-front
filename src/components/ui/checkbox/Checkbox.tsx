import { clsx } from 'clsx';
import { FC } from 'react';

import { ICheckbox } from './Checkbox.interface';

import styles from './Checkbox.module.scss';

const Checkbox: FC<ICheckbox> = ({ text, checked, onChange, containerClass }) => {
  return (
    <label className={clsx(styles.label, containerClass)}>
      <input className={styles.input} type="checkbox" checked={checked} onChange={onChange} />
      <span />
      {text}
    </label>
  );
};

export default Checkbox;
