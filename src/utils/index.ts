import { ChangeEvent } from 'react';

export const errorCatch = (error: any): string =>
  (error.response && error.response.data && typeof error.response.data.message === 'object'
    ? error.response.data.message[0]
    : error.response.data.message) ||
  error.message ||
  error.toString();

export const onlyText = (_string: string, limit: null | number = null): string => {
  let result = _string
    .replace(/<[^>]+>/g, '')
    .replace(/&[^;]+./g, ' ')
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    );

  if (limit) result = result.slice(0, limit) + '...';

  return result;
};

export const validateInputCharacters = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.name === 'username') {
    const isNameValid = /^$|^[a-zA-Z\-'_\s]+$/.test(e.target.value);
    return isNameValid;
  }

  if (
    e.target.name === 'email' ||
    e.target.name === 'password' ||
    e.target.name === 'passwordRepeat'
  ) {
    const isEmailValid = /^$|^[~`!@#$%^&*()_+=[\]\\{}|;':",./<>?a-zA-Z0-9-]+$/.test(e.target.value);
    return isEmailValid;
  }

  return true;
};

export const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setData: any) => {
  if (validateInputCharacters(e)) {
    setData((prevState: Object) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
};

export const convertDateToLocal = (
  date: string | number,
  options: Object = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }
) => {
  return new Date(date).toLocaleString('en-US', options);
};
