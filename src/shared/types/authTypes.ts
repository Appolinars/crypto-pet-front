import { NextPage } from 'next';
import { PropsWithChildren } from 'react';

import { IAvatar } from './avatar';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: IAvatar | null;
  token: string;
}

export type TypeRegisterData = {
  username: string;
  email: string;
  password: string;
  avatar?: any;
};

export type TypeLoginData = {
  email: string;
  password: string;
};

export interface ISettings {
  username?: string;
  email?: string;
  avatar?: IAvatar | null;
}

export type TypeRoles = { isOnlyUser?: boolean };

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles;

export interface TypeComponentAuthFields extends PropsWithChildren {
  Component: TypeRoles;
}
