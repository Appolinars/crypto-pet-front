import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IAvatar } from 'src/shared/types/avatar';

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<IAvatar, FormData>({
      query: (fileData) => ({
        url: `/file/upload`,
        method: 'POST',
        body: fileData,
      }),
    }),
    deleteFile: builder.mutation<{ message: string }, string>({
      query: (public_id: string) => ({
        url: `/file/delete`,
        method: 'DELETE',
        body: {
          public_id,
        },
      }),
    }),
  }),
});

export const { useUploadFileMutation, useDeleteFileMutation } = uploadApi;
