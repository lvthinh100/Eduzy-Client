import React, { Fragment } from 'react';
import UpdateProfileDialog from './UpdateProfileDialog';
import useAuth from '../../hooks/useAuth';
import ChangePasswordDialog from './ChangePasswordDialog';

const AppDialogs = () => {
  const { user } = useAuth();
  return (
    <Fragment>
      {user && (
        <Fragment>
          <UpdateProfileDialog user={user} />
          <ChangePasswordDialog user={user} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default AppDialogs;
