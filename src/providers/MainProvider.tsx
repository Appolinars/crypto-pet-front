import { FC } from 'react';
import { Provider } from 'react-redux';

import Layout from '@/components/layout/Layout';

import { store } from '@/redux/store';

import { TypeComponentAuthFields } from 'src/shared/types/authTypes';

import AuthProvider from './authProvider/AuthProvider';
import HeadProvider from './headProvider/HeadProvider';

const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
  return (
    <Provider store={store}>
      <HeadProvider>
        <AuthProvider Component={Component}>
          <Layout>{children}</Layout>
        </AuthProvider>
      </HeadProvider>
    </Provider>
  );
};
export default MainProvider;
