import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { FC, useEffect } from 'react';
import { Bubble } from 'react-chartjs-2';

import SkeletonLoader from '@/components/ui/skeletonLoader/SkeletonLoader';

import { getNotes } from '@/redux/note/noteActions';
import {
  allNotesErrorSelector,
  allNotesListSelector,
  allNotesLoadingSelector,
} from '@/redux/note/noteSelectors';

import { convertDateToLocal } from '@/utils/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useToastError } from '@/hooks/useToastError';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NotesChart: FC = () => {
  const isLoading = useAppSelector(allNotesLoadingSelector);
  const notesList = useAppSelector(allNotesListSelector);
  const error = useAppSelector(allNotesErrorSelector);

  const dispatch = useAppDispatch();

  useToastError(error);

  useEffect(() => {
    if (notesList.length === 0) dispatch(getNotes());
  }, []);

  return (
    <>
      {isLoading && (
        <div className="card-block p-2 md:p-5">
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
        </div>
      )}
      {!isLoading && notesList?.length > 0 && (
        <div className="card-block p-2 md:p-5">
          <Bubble
            data={{
              datasets: [
                {
                  label: 'Your purchases',
                  data: notesList.map((note) => ({
                    x: new Date(note.createdAt),
                    y: note.amount,
                    coin: note.coin,
                    amount: note.amount,
                    price: note.price,
                  })),
                  radius(context: any) {
                    let bubbleValue =
                      context.dataset.data[context.dataIndex].amount *
                      context.dataset.data[context.dataIndex].price;
                    if (bubbleValue >= 0 && bubbleValue < 1000) return 5;
                    if (bubbleValue >= 1000 && bubbleValue < 2000) return 7;
                    if (bubbleValue >= 2000 && bubbleValue < 5000) return 10;
                    if (bubbleValue >= 5000) return 13;
                  },
                  backgroundColor: [
                    'rgba(75,192,192,1)',
                    '#ecf0f1',
                    '#50AF95',
                    '#f3ba2f',
                    '#2a71d0',
                    '#d6439f',
                    '#b118cb',
                  ],
                },
              ],
            }}
            height={600}
            width={600}
            options={{
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  displayColors: false,
                  callbacks: {
                    label: function (context: any) {
                      return [
                        `${context.dataset.data[context.dataIndex].coin}`,
                        `Price: $${context.dataset.data[context.dataIndex].price}`,
                        `Amount: ${context.dataset.data[context.dataIndex].amount}`,
                      ];
                    },
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    color: '#789367',
                  },
                },
                x: {
                  ticks: {
                    callback: function (value) {
                      return convertDateToLocal(value);
                    },
                    color: '#789367',
                  },
                },
              },
            }}
          />
        </div>
      )}
    </>
  );
};

export default NotesChart;
