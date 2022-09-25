import { clsx } from 'clsx';
import { FC, PropsWithChildren } from 'react';

interface IPageTitle extends PropsWithChildren {
  className?: string;
}

const PageTitle: FC<IPageTitle> = ({ children, className }) => {
  return <h1 className={clsx('text-2xl xl:text-4xl font-bold mb-5 md:mb-8', className)}>{children}</h1>;
};

export default PageTitle;
