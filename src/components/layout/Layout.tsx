import Navbar from './navbar/Navbar';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[220px_auto] min-h-screen pt-[60px] xl:pt-0">
      <Navbar />
      <main className="py-10 overflow-x-hidden w-full">{children}</main>
    </div>
  );
};
export default Layout;
