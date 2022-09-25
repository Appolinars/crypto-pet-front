import { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
  return (
    <Skeleton
      {...rest}
      baseColor="#47536a"
      highlightColor="#69718d"
      className={className ? 'rounded-xl ${className}' : 'rounded-xl'}
    />
  );
};

export default SkeletonLoader;
