import Link from 'next/link';
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IAvatar } from 'src/shared/types/avatar';

import AvatarUpload from '@/components/common/avatarUpload/AvatarUpload';
import Input from '@/components/ui/input/Input';
import Loader from '@/components/ui/loader/Loader';
import PageTitle from '@/components/ui/pageTitle/PageTitle';

import { register } from '@/redux/auth/authActions';
import { resetAuth } from '@/redux/auth/authSlice';

import { handleInputChange } from '@/utils/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useAuthRedirect } from '@/hooks/useAuth';

import { IRegistration } from './Registration.interface';

import EyeIcon from '@/svg/eye.svg';

const Registration: FC = () => {
  useAuthRedirect();

  const [formData, setFormData] = useState<IRegistration>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    avatar: null,
  });
  const [passwordInputType, setPasswordInputType] = useState<'password' | 'text'>('password');

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isError = useAppSelector((state) => state.auth.isError);
  const message = useAppSelector((state) => state.auth.message);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    return () => {
      dispatch(resetAuth());
      setFormData({
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        avatar: null,
      });
    };
  }, [dispatch]);

  const onAvatarUpload = (avatar: IAvatar) => {
    setFormData({
      ...formData,
      avatar,
    });
  };

  const onAvatarDelete = () => {
    setFormData({
      ...formData,
      avatar: null,
    });
  };

  const togglePasswordInputType = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    passwordInputType === 'password'
      ? setPasswordInputType('text')
      : setPasswordInputType('password');
  };

  const validateSubmit = () => {
    const { username, email, password, passwordRepeat } = formData;

    if (!username || !email || !password || !passwordRepeat) {
      toast.error('Please fill in all fields');
      return false;
    }

    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (password.length < 5) {
      toast.error('Min length of password is 5 characters');
      return false;
    }

    if (password !== passwordRepeat) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSubmit()) dispatch(register(formData));
  };

  return (
    <section className="container flex flex-col justify-center content-center h-full">
      <PageTitle className="text-center">Register your account</PageTitle>
      <form className="max-w-md w-full mx-auto mb-8" onSubmit={handleSubmit}>
        <div className="flex justify-center mb-4">
          <AvatarUpload
            avatarUrl={formData.avatar?.url}
            onAvatarDelete={onAvatarDelete}
            onAvatarUpload={onAvatarUpload}
            public_id={formData.avatar?.public_id || ''}
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
        <Input
          name="password"
          value={formData.password}
          onChange={(e) => handleInputChange(e, setFormData)}
          placeholder="Password"
          type={passwordInputType}
          containerClass="relative"
          inputClass="pr-11"
        >
          <button
            type="button"
            className="absolute top-[50%] translate-y-[-50%] right-3 leading-none transition-transform will-change-transform hover:scale-110"
            onClick={togglePasswordInputType}
          >
            <EyeIcon />
          </button>
        </Input>
        <Input
          name="passwordRepeat"
          value={formData.passwordRepeat}
          onChange={(e) => handleInputChange(e, setFormData)}
          placeholder="Repeat password"
          type={passwordInputType}
          containerClass="relative"
          inputClass="pr-11"
        >
          <button
            type="button"
            className="absolute top-[50%] translate-y-[-50%] right-3 leading-none transition-transform will-change-transform hover:scale-110"
            onClick={togglePasswordInputType}
          >
            <EyeIcon />
          </button>
        </Input>

        <button className="btn w-full mt-8 relative">
          Register
          {isLoading && <Loader className="absolute right-2 top-[50%] translate-y-[-50%]" />}
        </button>
      </form>
      <p className="text-center text-sm">
        Already have an account?
        <Link href="/login">
          <a className="ml-1 underline underline-offset-2 hover:no-underline text-secondaryColor">
            Log in
          </a>
        </Link>
      </p>
    </section>
  );
};

export default Registration;
