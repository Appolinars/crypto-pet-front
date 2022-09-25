import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { getMe, logout } from '@/redux/auth/authActions';

import { localStorageHelper } from 'src/shared/helpers/localStorage';

import { useAppDispatch } from '@/hooks/redux';
import { useAuth } from '@/hooks/useAuth';

import { TypeComponentAuthFields } from 'src/shared/types/authTypes';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false });

const AuthProvider: FC<TypeComponentAuthFields> = ({ children, Component: { isOnlyUser } }) => {
  const user = useAuth();
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorageHelper.get('token');
    if (token && !user) dispatch(getMe());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const token = localStorageHelper.get('token');
    if (user && !token) {
      dispatch(logout());
    }
  }, [pathname, user, dispatch]);

  return !isOnlyUser ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
  );
};

export default AuthProvider;
