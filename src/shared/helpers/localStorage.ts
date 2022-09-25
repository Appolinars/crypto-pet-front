import { IS_CLIENT } from '@/configs/constants';

export const localStorageHelper = {
  get(key: string) {
    if (IS_CLIENT) {
      const stored = localStorage.getItem(key);
      return !stored ? null : JSON.parse(stored);
    }
  },
  save(key: string, value: string) {
    IS_CLIENT ? localStorage.setItem(key, JSON.stringify(value)) : null;
  },
  remove(key: string) {
    IS_CLIENT ? localStorage.removeItem(key) : null;
  },
};
