import { FC } from 'react';

const Error: FC = () => {
  return (
    <section className="container flex flex-col justify-center content-center h-full">
      <div className="text-4xl font-bold text-center">
        <p>404</p>
        <h1>Page not found</h1>
      </div>
    </section>
  );
};

export default Error;
