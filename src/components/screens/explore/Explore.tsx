import Image from 'next/image';
import { FC, useState } from 'react';

import PageTitle from '@/components/ui/pageTitle/PageTitle';
import SkeletonLoader from '@/components/ui/skeletonLoader/SkeletonLoader';

import { useCryptoNewsQuery } from '@/services/crypto/cryptoService';

const Explore: FC = () => {
  const [listLength, setListLength] = useState<number>(9);
  const { data, isLoading, error } = useCryptoNewsQuery('');

  return (
    <section className="container">
      <PageTitle>Latest crypto news</PageTitle>
      {isLoading && (
        <div className="grid gap-11 grid-cols-3">
          <SkeletonLoader height={580} />
          <SkeletonLoader height={580} />
          <SkeletonLoader height={580} />
          <SkeletonLoader height={580} />
          <SkeletonLoader height={580} />
          <SkeletonLoader height={580} />
          <SkeletonLoader height={580} />
          <SkeletonLoader height={580} />
          <SkeletonLoader height={580} />
        </div>
      )}
      {data && !error && (
        <>
          <ul className="grid gap-11 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.slice(0, listLength).map((item) => (
              <li key={item.id}>
                <a
                  className="p-4 card-block block h-full transition-transform hover:-translate-y-2 will-change-transform"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex justify-center mb-4">
                    <Image
                      width={300}
                      height={300}
                      objectFit="cover"
                      src={item.imgUrl}
                      alt={item.title}
                    />
                  </div>
                  <p className="text-sm mb-2 opacity-80">{item.date}</p>
                  <p className="text-sm mb-4 opacity-80">{item.categories}</p>
                  <p className="text-2xl font-bold mb-4">{item.title}</p>
                  <p>{item.body.length > 160 ? `${item.body.slice(0, 160)}...` : item.body}</p>
                </a>
              </li>
            ))}
          </ul>
          {data.length > listLength && (
            <div className="flex justify-center mt-8 text-lg">
              <button
                className="btn min-w-[300px] p-5"
                onClick={() => setListLength((prevValue) => prevValue + 6)}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
      {error && (
        <div className="text-2xl text-red-500">Something went wrong. Please try again later.</div>
      )}
    </section>
  );
};

export default Explore;
