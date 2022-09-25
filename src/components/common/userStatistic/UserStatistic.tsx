import Link from 'next/link';
import { FC, useEffect } from 'react';

import SkeletonLoader from '@/components/ui/skeletonLoader/SkeletonLoader';

import { getStatistic } from '@/redux/note/noteActions';
import {
  statisticErrorSelector,
  statisticLoadingSelector,
  statisticSelector,
} from '@/redux/note/noteSelectors';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useToastError } from '@/hooks/useToastError';

import NotesChart from '../notesChart/NotesChart';

import UserStatisticItem from './UserStatisticItem';

const UserStatistic: FC = () => {
  const statistic = useAppSelector(statisticSelector);
  const isLoading = useAppSelector(statisticLoadingSelector);
  const error = useAppSelector(statisticErrorSelector);

  const dispatch = useAppDispatch();

  useToastError(error);

  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);

  return (
    <>
      <div className="card-block p-3 md:p-5 mb-8">
        {isLoading && (
          <>
            <SkeletonLoader height={50} />
            <SkeletonLoader height={50} />
          </>
        )}
        {statistic && statistic.totalExpances !== 0 && (
          <>
            <p className="text-xl md:text-2xl">
              Total expances:{' '}
              <span className="underline underline-offset-4">{statistic.totalExpances}$</span>
            </p>
            {statistic.totalCoins && statistic.totalCoins.length > 0 && (
              <ul>
                {statistic.totalCoins.map((coin) => (
                  <UserStatisticItem coin={coin} key={coin.coin} />
                ))}
              </ul>
            )}
          </>
        )}
        {!isLoading && !error && statistic?.totalExpances === 0 && (
          <div className="text-center">
            <p>Looks like you do not have any notes and transactions yet...</p>
            <p>
              <Link href="/create-note">
                <a className="mr-1 underline underline-offset-2 hover:no-underline text-secondaryColor">
                  Create new notes
                </a>
              </Link>
              and update your statistic.
            </p>
          </div>
        )}
      </div>
      <NotesChart />
    </>
  );
};

export default UserStatistic;
