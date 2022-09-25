import { FC, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ISettings } from 'src/shared/types/authTypes';
import { IAvatar } from 'src/shared/types/avatar';

import AvatarUpload from '@/components/common/avatarUpload/AvatarUpload';
import Input from '@/components/ui/input/Input';
import Loader from '@/components/ui/loader/Loader';
import PageTitle from '@/components/ui/pageTitle/PageTitle';
import SkeletonLoader from '@/components/ui/skeletonLoader/SkeletonLoader';

import { updateAvatar, updateUser } from '@/redux/auth/authActions';
import { resetAuth } from '@/redux/auth/authSlice';

import { handleInputChange } from '@/utils/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useAuth } from '@/hooks/useAuth';
import { useToastError } from '@/hooks/useToastError';

const Settings: FC = () => {
  const user = useAuth();
  const isUserLoading = useAppSelector((state) => state.auth.isLoading);
  const isUpdating = useAppSelector((state) => state.auth.isUpdating);
  const isUpdated = useAppSelector((state) => state.auth.isUpdated);
  const error = useAppSelector((state) => state.auth.message);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ISettings>({
    avatar: null,
    username: '',
    email: '',
  });

  useToastError(error);

  useEffect(() => {
    if (user) {
      setFormData({
        avatar: user.avatar,
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(resetAuth());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isUpdated) toast.success('Settings have been updated');
  }, [isUpdated]);

  const onAvatarUpload = (avatar: IAvatar) => {
    dispatch(updateAvatar(avatar));
  };

  const onAvatarDelete = () => {
    dispatch(updateAvatar(null));
  };

  const validateSubmit = () => {
    const { username, email } = formData;

    if (!username || !email) {
      toast.error('Please fill in all fields');
      return false;
    }

    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSubmit()) dispatch(updateUser(formData));
  };

  return (
    <div className="container flex flex-col justify-center content-center h-full">
      <PageTitle className="text-center">Edit your account details</PageTitle>
      {isUserLoading && (
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center">
            <SkeletonLoader circle width={70} height={70} />
          </div>
          <SkeletonLoader height={48} />
          <SkeletonLoader height={48} />
          <SkeletonLoader height={48} />
        </div>
      )}
      {user && (
        <form className="max-w-md w-full mx-auto" onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            <AvatarUpload
              avatarUrl={formData.avatar?.url}
              onAvatarUpload={onAvatarUpload}
              public_id={formData.avatar?.public_id || ''}
              onAvatarDelete={onAvatarDelete}
            />
          </div>
          <Input
            name="username"
            value={formData.username}
            onChange={(e) => handleInputChange(e, setFormData)}
            placeholder="Username"
          />
          <Input
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, setFormData)}
            placeholder="Email"
          />
          <button className="btn w-full mt-8 relative">
            Save
            {isUpdating && <Loader className="absolute right-2 top-[50%] translate-y-[-50%]" />}
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;
