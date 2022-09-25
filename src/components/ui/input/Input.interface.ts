import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  containerClass?: string;
  inputClass?: string;
}
