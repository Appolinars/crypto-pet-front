import { FC, useRef, useState } from 'react';

import { useCloseOnDomClick } from '@/hooks/useCloseonDomClick';

import styles from './CoinPicker.module.scss';

const coinsList = ['BTC', 'ETH'];

const CoinPicker: FC<{ onChange: (coin: string) => void; value: string }> = ({
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useCloseOnDomClick(pickerRef, isOpen, setIsOpen);

  const handlePickClick = (coin: string) => {
    onChange(coin);
    setIsOpen(false);
  };

  return (
    <div className={styles.picker} ref={pickerRef}>
      <button
        className={styles.picker__picked}
        onClick={() => setIsOpen((prevValue) => !prevValue)}
        type="button"
      >
        {value ? value : 'symbol'}
      </button>
      {isOpen && (
        <div className={styles.picker__list}>
          {coinsList.map((coin) => (
            <button
              className={styles.picker__list_item}
              key={coin}
              onClick={() => handlePickClick(coin)}
              type="button"
            >
              {coin}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoinPicker;
