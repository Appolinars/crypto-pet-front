import { TypeRegisterData } from 'src/shared/types/authTypes';
import { IAvatar } from 'src/shared/types/avatar';

export interface IRegistration extends TypeRegisterData {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  avatar: IAvatar | null;
}
