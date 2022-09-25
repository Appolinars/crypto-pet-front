import { FC } from 'react';
import { ITopListItem } from 'src/shared/types/cryptoTypes';

import Table from '@/components/ui/table/Table';

import TopListTableItem from './TopListTableItem';

interface ITopListTable {
  coinsData: ITopListItem[];
}

const TopListTable: FC<ITopListTable> = ({ coinsData }) => {
  return (
    <Table>
      <thead>
        <tr className="text-left">
          <th>Rank</th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Total Volume</th>
          <th>% 24H</th>
        </tr>
      </thead>
      <tbody>
        {coinsData.map((coin, i) => (
          <TopListTableItem key={coin.symbol} coin={coin} index={i} />
        ))}
      </tbody>
    </Table>
  );
};

export default TopListTable;
