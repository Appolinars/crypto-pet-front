import { NextPageAuth } from 'src/shared/types/authTypes';

import Note from '@/components/screens/note/Note';

import { Meta } from '@/providers/meta/Meta';

const NotePage: NextPageAuth = () => {
  return (
    <Meta title="Note" description="Create a new note about your purchase">
      <Note />
    </Meta>
  );
};

NotePage.isOnlyUser = true;

export default NotePage;
