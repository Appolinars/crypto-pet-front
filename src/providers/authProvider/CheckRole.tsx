import { useRouter } from 'next/router';
import { FC } from 'react';

import { localStorageHelper } from 'src/shared/helpers/localStorage';

import { useAuth } from '@/hooks/useAuth';

import { TypeComponentAuthFields } from 'src/shared/types/authTypes';

const CheckRole: FC<TypeComponentAuthFields> = ({ children, Component: { isOnlyUser } }) => {
  const user = useAuth();

  const router = useRouter();
  const token = localStorageHelper.get('token');

  if ((token && isOnlyUser) || (user && isOnlyUser)) return <>{children}</>;
  else {
    router.pathname !== '/login' && router.replace('/login');
    return null;
  }
};

export default CheckRole;
