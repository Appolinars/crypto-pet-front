import { IAvatar } from 'src/shared/types/avatar';

export interface IAvatarUpload {
  avatarUrl?: string;
  onAvatarUpload: (payload: IAvatar) => void;
  public_id: string;
  onAvatarDelete: () => void;
}
