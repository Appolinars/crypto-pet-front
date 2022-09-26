import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';
import { IUser } from 'src/shared/types/authTypes';

const DynamicGeneratedAvatar = dynamic(() => import('./GeneratedAvatar'), { ssr: false });

const Avatar: FC<{ user: IUser; className?: string }> = ({ user, className }) => {
  return (
    <>
      {user.avatar?.url ? (
        <div className={className ? `${className} inline-block` : 'inline-block'}>
          <Image
            className="rounded-full"
            width={64}
            height={64}
            objectFit="cover"
            src={user.avatar.url}
            alt={user.username}
            quality={80}
          />
        </div>
      ) : (
        <DynamicGeneratedAvatar userId={user._id} username={user.username} className={className} />
      )}
    </>
  );
};

export default Avatar;
