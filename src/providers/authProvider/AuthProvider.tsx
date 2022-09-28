import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { localStorageHelper } from 'src/shared/helpers/localStorage';
import { TypeComponentAuthFields } from 'src/shared/types/authTypes';

import { getMe, logout } from '@/redux/auth/authActions';
import { logoutReset } from '@/redux/note/noteSlice';

import { useAppDispatch } from '@/hooks/redux';
import { useAuth } from '@/hooks/useAuth';

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
      dispatch(logoutReset());
    }
  }, [pathname, user, dispatch]);

  return !isOnlyUser ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
  );
};

export default AuthProvider;
