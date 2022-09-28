import { createNote, deleteNote, getNotes, getStatistic } from './noteActions';
import { createSlice } from '@reduxjs/toolkit';



import { INoteState } from './noteSlice.interface';


const initialState: INoteState = {
  newNote: {
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  allNotes: {
    list: [],
    isLoading: false,
    error: null,
    isDeleting: false,
  },
  statistic: {
    info: null,
    isLoading: false,
    error: null,
  },
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    resetNewNote: (state) => {
      state.newNote = {
        isLoading: false,
        isSuccess: false,
        error: null,
      };
    },
    resetAllNotesStates: (state) => {
      state.allNotes = {
        list: state.allNotes.list,
        isLoading: false,
        error: null,
        isDeleting: false,
      };
    },
    logoutReset: (state) => {
      state.allNotes.list = [];
      state.statistic.info = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.newNote.isLoading = true;
        state.newNote.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.newNote.isLoading = false;
        state.newNote.isSuccess = true;
        state.allNotes.list.unshift(action.payload);
      })
      .addCase(createNote.rejected, (state, action: any) => {
        state.newNote.isLoading = false;
        state.newNote.error = action.payload;
      })
      .addCase(getNotes.pending, (state) => {
        state.allNotes.isLoading = true;
        state.allNotes.error = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.allNotes.isLoading = false;
        state.allNotes.list = action.payload;
      })
      .addCase(getNotes.rejected, (state, action: any) => {
        state.allNotes.isLoading = false;
        state.allNotes.error = action.payload;
      })
      .addCase(deleteNote.pending, (state) => {
        state.allNotes.isDeleting = true;
        state.allNotes.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.allNotes.isDeleting = false;
        state.allNotes.list = state.allNotes.list.filter((note) => note._id !== action.payload.id);
      })
      .addCase(deleteNote.rejected, (state, action: any) => {
        state.allNotes.isDeleting = false;
        state.allNotes.error = action.payload;
      })
      .addCase(getStatistic.pending, (state) => {
        state.statistic.isLoading = true;
        state.statistic.error = null;
      })
      .addCase(getStatistic.fulfilled, (state, action) => {
        state.statistic.isLoading = false;
        state.statistic.info = action.payload;
      })
      .addCase(getStatistic.rejected, (state, action: any) => {
        state.statistic.isLoading = false;
        state.statistic.error = action.payload;
      });
  },
});

export const { resetNewNote, resetAllNotesStates, logoutReset } = noteSlice.actions;

export default noteSlice.reducer;