import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoin, ICoinDailyData, INewsItem, ITopListItem } from 'src/shared/types/cryptoTypes';

import { cryptoImagesDomen } from '@/configs/constants';

import { convertDateToLocal } from '@/utils/index';

import {
  TypeCoinDailyResponse,
  TypeCoinResponse,
  TypeCryptoNewsResponse,
  TypeTopListResponse,
} from './cryptoService.interface';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_CRYPTO_API_URL }),
  endpoints: (builder) => ({
    getToplist: builder.query<ITopListItem[], string>({
      query: () => `/top/totalvolfull?limit=10&tsym=USD`,
      transformResponse: (response: { Data: TypeTopListResponse[] | any }) => {
        const transformedResponse = response.Data.map((item: TypeTopListResponse) => ({
          logoUrl: `${cryptoImagesDomen}${item.CoinInfo.ImageUrl}`,
          name: item.CoinInfo.FullName,
          symbol: item.CoinInfo.Name,
          price: item.DISPLAY.USD.PRICE,
          totalVolume: item.DISPLAY.USD.TOTALVOLUME24HTO,
          marketCap: item.DISPLAY.USD.MKTCAP,
          change24Hours: item.DISPLAY.USD.CHANGEPCT24HOUR,
        }));
        return transformedResponse;
      },
    }),
    getCoin: builder.query<ICoin, string>({
      query: (coin: string) => `/pricemultifull?fsyms=${coin}&tsyms=USD`,
      transformResponse: (response: TypeCoinResponse, meta, arg) => {
        const transformedResponse = {
          logoUrl: `${cryptoImagesDomen}${response.DISPLAY[arg].USD.IMAGEURL}`,
          symbol: response.RAW[arg].USD.FROMSYMBOL,
          price: response.DISPLAY[arg].USD.PRICE,
          lastVolume: response.DISPLAY[arg].USD.LASTVOLUME,
          lastVolumeTo: response.DISPLAY[arg].USD.LASTVOLUMETO,
          open24H: response.DISPLAY[arg].USD.OPEN24HOUR,
          high24H: response.DISPLAY[arg].USD.HIGH24HOUR,
          low24H: response.DISPLAY[arg].USD.LOW24HOUR,
          topTierVolume: response.DISPLAY[arg].USD.TOPTIERVOLUME24HOUR,
          topTierVolumeTo: response.DISPLAY[arg].USD.TOPTIERVOLUME24HOURTO,
          change24H: response.DISPLAY[arg].USD.CHANGE24HOUR,
          change24HPct: response.DISPLAY[arg].USD.CHANGEPCT24HOUR,
          marketCap: response.DISPLAY[arg].USD.MKTCAP,
          totalVolume: response.DISPLAY[arg].USD.TOTALVOLUME24H,
          totalVolumeTo: response.DISPLAY[arg].USD.TOTALVOLUME24HTO,
        };
        return transformedResponse;
      },
    }),
    coinDaily: builder.query<ICoinDailyData[], string>({
      query: (coin: string) => `/v2/histoday?fsym=${coin}&tsym=USD&limit=20`,
      transformResponse: (response: { Data: { Data: TypeCoinDailyResponse[] | any } }) => {
        const transformedResponse = response.Data.Data.map((item: TypeCoinDailyResponse) => ({
          date: convertDateToLocal(item.time * 1000),
          price: item.open,
        }));
        return transformedResponse;
      },
    }),
    cryptoNews: builder.query<INewsItem[], string>({
      query: () => `/v2/news/?lang=EN`,
      transformResponse: (response: { Data: TypeCryptoNewsResponse[] }) => {
        const transformedResponse = response.Data.map((item) => ({
          id: item.id,
          url: item.url,
          date: convertDateToLocal(item.published_on * 1000, {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          }),
          imgUrl: item.imageurl,
          title: item.title,
          body: item.body,
          categories: item.categories,
        }));
        return transformedResponse;
      },
    }),
    coinPrice: builder.query<number, string>({
      query: (coin: string) => `/price?fsym=${coin}&tsyms=USD`,
      transformResponse: (response: { USD: number }) => {
        return response.USD;
      },
    }),
  }),
});

export const {
  useGetToplistQuery,
  useGetCoinQuery,
  useCoinDailyQuery,
  useCryptoNewsQuery,
  useCoinPriceQuery,
} = cryptoApi;
