import { apiAuthInstance } from '@/configs/api';

import { INote, INoteResponse, IStatistic } from '@/types/noteTypes';

export const noteService = {
  async create(noteData: INote) {
    const response = await apiAuthInstance.post<INoteResponse>('/note/create', noteData);

    return response.data;
  },

  async getAll() {
    const response = await apiAuthInstance.get<INoteResponse[]>('/note/getall');

    return response.data;
  },

  async delete(id: string) {
    const response = await apiAuthInstance.delete<{ id: string }>(`/note/delete/${id}`);

    return response.data;
  },

  async getStatistic() {
    const response = await apiAuthInstance.get<IStatistic>('/note/statistic');

    return response.data;
  },
};
