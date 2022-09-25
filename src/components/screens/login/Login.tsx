import Link from 'next/link';
import { FC, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Input from '@/components/ui/input/Input';
import Loader from '@/components/ui/loader/Loader';
import PageTitle from '@/components/ui/pageTitle/PageTitle';

import { login } from '@/redux/auth/authActions';
import { resetAuth } from '@/redux/auth/authSlice';

import { handleInputChange } from '@/utils/index';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useAuthRedirect } from '@/hooks/useAuth';

import EyeIcon from '@/svg/eye.svg';

const Login: FC = () => {
  useAuthRedirect();

  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
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
        email: '',
        password: '',
      });
    };
  }, [dispatch]);

  const togglePasswordInputType = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    passwordInputType === 'password'
      ? setPasswordInputType('text')
      : setPasswordInputType('password');
  };

  const validateSubmit = () => {
    if (!formData.email || !formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      toast.error('Please enter a password');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateSubmit()) dispatch(login(formData));
  };

  return (
    <section className="container flex flex-col justify-center content-center h-full">
      <PageTitle className="text-center">Login to your account</PageTitle>
      <form className="max-w-md w-full mx-auto mb-8" onSubmit={handleSubmit}>
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
        <button className="btn w-full mt-8 relative">
          Log in
          {isLoading && <Loader className="absolute right-2 top-[50%] translate-y-[-50%]" />}
        </button>
      </form>
      <p className="text-center text-sm">
        Do not have an account?
        <Link href="/registration">
          <a className="ml-1 underline underline-offset-2 hover:no-underline text-secondaryColor">
            Register
          </a>
        </Link>
      </p>
    </section>
  );
};

export default Login;
