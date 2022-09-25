import { INoteResponse, IStatistic } from '@/types/noteTypes';

export interface INoteState {
  newNote: {
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
  };
  allNotes: {
    list: INoteResponse[];
    isLoading: boolean;
    error: string | null;
    isDeleting: boolean;
  };
  statistic: {
    info: IStatistic | null;
    isLoading: boolean;
    error: string | null;
  };
}
