import { FC, PropsWithChildren } from 'react';

import styles from './Table.module.scss';

interface ITable extends PropsWithChildren {}

const Table: FC<ITable> = ({ children }) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>{children}</table>
    </div>
  );
};

export default Table;
