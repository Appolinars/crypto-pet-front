import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectRoot = (state: RootState) => state;

export const newNoteLoadingSelector = createSelector(
  selectRoot,
  (state) => state.note.newNote.isLoading
);
export const newNoteSuccessSelector = createSelector(
  selectRoot,
  (state) => state.note.newNote.isSuccess
);
export const newNoteErrorSelector = createSelector(selectRoot, (state) => state.note.newNote.error);

export const allNotesLoadingSelector = createSelector(
  selectRoot,
  (state) => state.note.allNotes.isLoading
);
export const allNotesListSelector = createSelector(selectRoot, (state) => state.note.allNotes.list);
export const allNotesErrorSelector = createSelector(
  selectRoot,
  (state) => state.note.allNotes.error
);
export const isNoteDeletingSelector = createSelector(
  selectRoot,
  (state) => state.note.allNotes.isDeleting
);

export const statisticSelector = createSelector(selectRoot, (state) => state.note.statistic.info);
export const statisticLoadingSelector = createSelector(
  selectRoot,
  (state) => state.note.statistic.isLoading
);
export const statisticErrorSelector = createSelector(
  selectRoot,
  (state) => state.note.statistic.error
);
