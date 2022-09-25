import Settings from '@/components/screens/settings/Settings';

import { Meta } from '@/providers/meta/Meta';

import { NextPageAuth } from 'src/shared/types/authTypes';

const SettingsPage: NextPageAuth = () => {
  return (
    <Meta title="Settings" description="Your settings">
      <Settings />
    </Meta>
  );
};

SettingsPage.isOnlyUser = true;

export default SettingsPage;
