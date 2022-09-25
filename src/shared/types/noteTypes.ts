export interface INote {
  coin: string;
  price: string | number;
  amount: string | number;
}

export interface INoteResponse extends INote {
  _id: string;
  createdAt: string;
}

export interface ITotalCoinsItem {
  coin: string;
  statistic: {
    coinAmount: number;
    coinExpances: number;
  };
}

export interface IStatistic {
  totalExpances: number;
  totalCoins: ITotalCoinsItem[];
}
