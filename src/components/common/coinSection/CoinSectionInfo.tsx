import { FC } from 'react';

import { ICoin } from 'src/shared/types/cryptoTypes';

import styles from './CoinSection.module.scss';

const CoinSectionInfo: FC<{ data: ICoin }> = ({ data }) => {
  return (
    <>
      <div>
        <p className="text-lg">Price ({data.symbol})</p>
        <p className="text-4xl md:text-5xl font-bold mb-2">{data.price}</p>
        <p className="text-lg mb-4">
          Change 24H:
          <span className={data.change24H[2] === '-' ? 'text-red-500 mx-2' : 'text-green-500 mx-2'}>
            {data.change24H}
          </span>
          <span
            className={`p-1 rounded ${
              data.change24HPct.startsWith('-')
                ? 'bg-red-500 text-primaryLightColor'
                : 'bg-green-500 text-primaryDarkColor'
            }`}
          >
            {data.change24HPct}%
          </span>
        </p>
      </div>
      <ul className={styles.info_list}>
        <li>
          <p className={styles.info_list_title}>Mkt. cap:</p>
          <p>{data.marketCap}</p>
        </li>
        <li>
          <p className={styles.info_list_title}>Total Volume:</p>
          <p>{data.totalVolume}</p>
        </li>
        <li>
          <p className={styles.info_list_title}>Total Volume To:</p>
          <p>{data.totalVolumeTo}</p>
        </li>
        <li>
          <p className={styles.info_list_title}>Open 24H:</p>
          <p>{data.open24H}</p>
        </li>
        <li>
          <p className={styles.info_list_title}>Low/High 24h:</p>
          <p>
            {data.low24H} - {data.high24H}
          </p>
        </li>
        <li>
          <p className={styles.info_list_title}>Last Volume:</p>
          <p>{data.lastVolume}</p>
        </li>
        <li>
          <p className={styles.info_list_title}>Last Volume To:</p>
          <p>{data.lastVolumeTo}</p>
        </li>
        <li>
          <p className={styles.info_list_title}>Top Tier Volume:</p>
          <p>{data.topTierVolume}</p>
        </li>
        <li>
          <p className={styles.info_list_title}>Top Tier Volume To:</p>
          <p>{data.topTierVolumeTo}</p>
        </li>
      </ul>
    </>
  );
};

export default CoinSectionInfo;
