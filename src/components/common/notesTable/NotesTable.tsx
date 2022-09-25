import { FC } from 'react';

import SkeletonLoader from '@/components/ui/skeletonLoader/SkeletonLoader';
import Table from '@/components/ui/table/Table';

import { useCoinPriceQuery } from '@/services/crypto/cryptoService';

import { INotesTable } from './NotesTable.intergace';
import NotesTableItem from './NotesTableItem';

const NotesTable: FC<INotesTable> = ({ notesList, isLoading }) => {
  const { data: btcPrice, isLoading: btcLoading } = useCoinPriceQuery('BTC');
  const { data: ethPrice, isLoading: ethLoading } = useCoinPriceQuery('ETH');

  return (
    <>
      {(isLoading || btcLoading || ethLoading) && <SkeletonLoader count={5} height={53} />}
      {btcPrice && ethPrice && (
        <Table>
          <thead>
            <tr className="text-left">
              <th>Date</th>
              <th>Coin</th>
              <th>Purchase price</th>
              <th>Current price</th>
              <th>Amount</th>
              <th>Profit/Loss</th>
            </tr>
          </thead>
          <tbody>
            {notesList.map((note) => (
              <NotesTableItem
                key={note._id}
                note={note}
                coinPrice={note.coin === 'BTC' ? btcPrice : ethPrice}
              />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default NotesTable;
