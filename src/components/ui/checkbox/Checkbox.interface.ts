import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  containerClass?: string;
}
