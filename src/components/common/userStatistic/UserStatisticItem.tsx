import { FC } from 'react';

import { ITotalCoinsItem } from '@/types/noteTypes';

const UserStatisticItem: FC<{ coin: ITotalCoinsItem }> = ({ coin }) => {
  return (
    <li className="mt-3 pt-3 md:mt-6 md:pt-6 border-t border-t-gray-600">
      <p>
        Coin: <span className="underline underline-offset-2">{coin.coin}</span>
      </p>
      <p>
        Total amount:{' '}
        <span className="underline underline-offset-2">{coin.statistic.coinAmount}</span>
      </p>
      <p>
        Total expances:{' '}
        <span className="underline underline-offset-2">{coin.statistic.coinExpances}$</span>
      </p>
    </li>
  );
};

export default UserStatisticItem;
