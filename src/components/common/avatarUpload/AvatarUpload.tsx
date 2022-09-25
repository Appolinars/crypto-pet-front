/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image';
import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Loader from '@/components/ui/loader/Loader';

import { useDeleteFileMutation, useUploadFileMutation } from '@/services/upload/uploadService';

import { useAppSelector } from '@/hooks/redux';

import { IAvatarUpload } from './AvatarUpload.interface';

import defaultAvatar from '@/images/default-avatar.png';

import CloseIcon from '@/svg/close.svg';
import EditIcon from '@/svg/edit.svg';

const AvatarUpload: FC<IAvatarUpload> = ({
  avatarUrl,
  onAvatarUpload,
  public_id,
  onAvatarDelete,
}) => {
  const isAvatarUpdating = useAppSelector((state) => state.auth.isAvatarUpdating);
  const [file, setFile] = useState<File | null>(null);

  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      uploadFile(formData)
        .unwrap()
        .then((uploadedFile) => onAvatarUpload(uploadedFile))
        .catch((error) => toast.error(error.data.message));
    }
  }, [file]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteFile(public_id)
      .unwrap()
      .then((data) => {
        if (data.message === 'success') {
          onAvatarDelete();
        } else if (data.message) {
          toast.info(data.message);
        }
      })
      .catch((error) => toast.error(error.data.message));
  };

  return (
    <div className="inline-block relative">
      <label className="cursor-pointer">
        <Image
          className="rounded-full"
          width={70}
          height={70}
          objectFit="cover"
          src={avatarUrl || defaultAvatar}
          alt="Avatar"
        />
        <input type="file" onChange={handleChange} className="sr-only" multiple={false} />
        <span className="w-[27px] h-[27px] flex justify-center items-center rounded-full bg-slate-500 absolute bottom-0 right-0 hover:bg-slate-600 transition-colors">
          {isUploading || isDeleting || isAvatarUpdating ? <Loader size="17" /> : <EditIcon />}
        </span>
      </label>
      {public_id && (
        <button
          className="absolute -top-4 -right-4 hover:scale-125 transition-transform will-change-transform"
          onClick={handleDelete}
          type="button"
          aria-label="Delete avatar"
          disabled={isUploading || isDeleting || isAvatarUpdating}
        >
          <CloseIcon className="stroke-red-500" />
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;
