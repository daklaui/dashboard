import { authRoles } from 'app/auth';
import { lazy } from 'react';

const Accounts = lazy(() => import('./account'));

const accountAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.admin,
  routes: [
    {
      path: 'auth/accounts/:accountId/*',
      element: <Accounts />,
    }
  ],
};

export default accountAppConfig;
