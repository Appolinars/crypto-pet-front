import { localStorageHelper } from 'src/shared/helpers/localStorage';

import { apiAuthInstance, apiBaseInstance } from '@/configs/api';

import { ISettings, IUser, TypeLoginData, TypeRegisterData } from 'src/shared/types/authTypes';

export const authService = {
  async register(userData: TypeRegisterData) {
    const response = await apiBaseInstance.post<IUser>('/user/register', userData);

    if (response.data) {
      localStorageHelper.save('token', response.data.token);
    }

    return response.data;
  },

  async login(userData: TypeLoginData) {
    const response = await apiBaseInstance.post<IUser>('/user/login', userData);

    if (response.data) {
      localStorageHelper.save('token', response.data.token);
    }

    return response.data;
  },

  logout() {
    localStorageHelper.remove('token');
  },

  async getMe() {
    const response = await apiAuthInstance.get<IUser>('/user/me');
    return response.data;
  },

  async update(userData: ISettings) {
    const response = await apiAuthInstance.patch<IUser>('/user/update', userData);
    return response.data;
  },
};
