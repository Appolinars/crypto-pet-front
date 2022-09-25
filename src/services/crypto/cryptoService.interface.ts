type TypeTopCoinInfo = {
  ImageUrl: string;
  FullName: string;
  Name: string;
};

type TypeCoinDisplayInfo = {
  PRICE: string;
  TOTALVOLUME24HTO: string;
  MKTCAP: string;
  CHANGEPCT24HOUR: string;
};

export type TypeTopListResponse = {
  CoinInfo: TypeTopCoinInfo;
  DISPLAY: {
    USD: TypeCoinDisplayInfo;
  };
};

export type TypeCoinResponse = {
  RAW: {
    [key: string]: {
      USD: {
        FROMSYMBOL: string;
      };
    };
  };
  DISPLAY: {
    [key: string]: {
      USD: {
        IMAGEURL: string;
        PRICE: string;
        LASTVOLUME: string;
        LASTVOLUMETO: string;
        OPEN24HOUR: string;
        HIGH24HOUR: string;
        LOW24HOUR: string;
        TOPTIERVOLUME24HOUR: string;
        TOPTIERVOLUME24HOURTO: string;
        CHANGE24HOUR: string;
        CHANGEPCT24HOUR: string;
        MKTCAP: string;
        TOTALVOLUME24H: string;
        TOTALVOLUME24HTO: string;
      };
    };
  };
};

export type TypeCoinDailyResponse = {
  time: number;
  open: number;
};

export type TypeCryptoNewsResponse = {
  id: string;
  published_on: number;
  imageurl: string;
  title: string;
  url: string;
  body: string;
  categories: string;
};
