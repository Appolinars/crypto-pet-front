import Link from 'next/link';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';

import NotesTable from '@/components/common/notesTable/NotesTable';
import PageTitle from '@/components/ui/pageTitle/PageTitle';

import { getNotes } from '@/redux/note/noteActions';
import {
  allNotesErrorSelector,
  allNotesListSelector,
  allNotesLoadingSelector,
} from '@/redux/note/noteSelectors';
import { resetAllNotesStates } from '@/redux/note/noteSlice';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useToastError } from '@/hooks/useToastError';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(allNotesLoadingSelector);
  const notesList = useAppSelector(allNotesListSelector);
  const error = useAppSelector(allNotesErrorSelector);

  useToastError(error);

  useEffect(() => {
    if (notesList.length === 0) dispatch(getNotes());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetAllNotesStates());
    };
  }, []);

  return (
    <section className="container h-full">
      <PageTitle className="text-center">
        Explore your notes or{' '}
        <Link href="/create-note">
          <a className="ml-1 underline underline-offset-2 hover:no-underline text-secondaryColor">
            create a new one
          </a>
        </Link>
      </PageTitle>
      {notesList.length > 0 && (
        <div className="card-block p-5">
          <NotesTable notesList={notesList} isLoading={isLoading} />
        </div>
      )}
      {!isLoading && notesList.length === 0 && (
        <div className="text-lg">Looks like you don't have any notes yet...</div>
      )}
    </section>
  );
};

export default Dashboard;
