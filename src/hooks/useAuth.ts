import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAppSelector } from './redux';

export const useAuth = () => useAppSelector((state) => state.auth.user);

export const useAuthRedirect = () => {
  const user = useAuth();

  const { query, push } = useRouter();

  const redirect = query.redirect ? String(query.redirect) : '/';

  useEffect(() => {
    if (user) push(redirect);
  }, [user, redirect, push]);
};
