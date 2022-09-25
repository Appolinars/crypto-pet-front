import { INoteResponse } from '@/types/noteTypes';

export interface INotesTable {
  notesList: INoteResponse[];
  isLoading: boolean;
}

export interface INotesTableItem {
  note: INoteResponse;
  coinPrice: number;
}
