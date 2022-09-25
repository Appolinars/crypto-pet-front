import { createAsyncThunk } from '@reduxjs/toolkit';

import { noteService } from '@/services/note/noteService';

import { errorCatch } from '@/utils/index';

import { INote } from '@/types/noteTypes';

export const createNote = createAsyncThunk('note/create', async (noteData: INote, thunkAPI) => {
  try {
    return await noteService.create(noteData);
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const getNotes = createAsyncThunk('note/getAll', async (_, thunkAPI) => {
  try {
    return await noteService.getAll();
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteNote = createAsyncThunk('note/delete', async (id: string, thunkAPI) => {
  try {
    return await noteService.delete(id);
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const getStatistic = createAsyncThunk('note/getStatistic', async (_, thunkAPI) => {
  try {
    return await noteService.getStatistic();
  } catch (error: any) {
    const message = errorCatch(error);
    return thunkAPI.rejectWithValue(message);
  }
});
