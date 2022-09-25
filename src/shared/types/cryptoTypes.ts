export interface ITopListItem {
  logoUrl: string;
  name: string;
  symbol: string;
  price: string;
  totalVolume: string;
  marketCap: string;
  change24Hours: string;
}

export interface ICoin {
  logoUrl: string;
  symbol: string;
  price: string;
  lastVolume: string;
  lastVolumeTo: string;
  open24H: string;
  high24H: string;
  low24H: string;
  topTierVolume: string;
  topTierVolumeTo: string;
  change24H: string;
  change24HPct: string;
  marketCap: string;
  totalVolume: string;
  totalVolumeTo: string;
}

export interface ICoinDailyData {
  date: number;
  price: number;
}

export interface INewsItem {
  id: string;
  url: string;
  date: string;
  imgUrl: string;
  title: string;
  body: string;
  categories: string;
}
