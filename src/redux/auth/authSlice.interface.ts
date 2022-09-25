import { Action } from '@reduxjs/toolkit';

import { IUser } from 'src/shared/types/authTypes';

export interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isUpdating: boolean;
  isUpdated: boolean;
  isAvatarUpdating: boolean;
  message: string;
}

export interface IRejectedAction extends Action {
  payload: string;
}
