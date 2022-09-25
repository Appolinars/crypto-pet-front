import Image from 'next/image';
import { FC } from 'react';

import { ITopListItem } from 'src/shared/types/cryptoTypes';

interface ITopListTableItem {
  coin: ITopListItem;
  index: number;
}

const TopListTableItem: FC<ITopListTableItem> = ({ coin, index }) => {
  return (
    <tr key={coin.symbol} className="border-t border-t-gray-600 text-left">
      <td>{index + 1}</td>
      <td className="flex items-center">
        <span className="mr-2 leading-none">
          <Image width={30} height={30} objectFit="cover" src={coin.logoUrl} alt={coin.symbol} />
        </span>
        {coin.name}
      </td>
      <td>{coin.symbol}</td>
      <td>{coin.price}</td>
      <td>{coin.marketCap}</td>
      <td>{coin.totalVolume}</td>
      <td className={coin.change24Hours.startsWith('-') ? 'text-red-500' : 'text-green-500'}>
        {coin.change24Hours}
      </td>
    </tr>
  );
};

export default TopListTableItem;
