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
import { FC, useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useOnScreen } from 'src/hooks/useOnScreen';

import SkeletonLoader from '@/components/ui/skeletonLoader/SkeletonLoader';

import { useCoinDailyQuery } from '@/services/crypto/cryptoService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinChart: FC<{ coinSymbol: string }> = ({ coinSymbol }) => {
  const [skip, setSkip] = useState<boolean>(true);
  const { data, isLoading, error } = useCoinDailyQuery(coinSymbol, { skip });

  const chartRef = useRef(null);

  const isVisible = useOnScreen(chartRef);

  useEffect(() => {
    if (isVisible) setSkip(false);
  }, [isVisible]);

  return (
    <div className="mt-10" ref={chartRef}>
      {isLoading && (
        <>
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
          <SkeletonLoader height={80} />
        </>
      )}
      {data && !error && (
        <Line
          data={{
            labels: data.map((item) => item.date),
            datasets: [
              {
                label: 'Price',
                data: data.map((item) => item.price),
                backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: '#33434B',
                borderWidth: 2,
              },
            ],
          }}
          height={500}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                ticks: {
                  color: '#789367',
                },
              },
              x: {
                ticks: {
                  color: '#789367',
                },
              },
            },
          }}
        />
      )}
      {error && (
        <div className="text-2xl text-red-500">Something went wrong. Please try again later.</div>
      )}
    </div>
  );
};

export default CoinChart;
