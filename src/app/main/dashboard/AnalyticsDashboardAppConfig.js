import { authRoles } from 'app/auth';
import { lazy } from 'react';

const AnalyticsDashboardApp = lazy(() => import('./AnalyticsDashboardApp'));

const AnalyticsDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'dashboards',
      element: <AnalyticsDashboardApp />,
    },
  ],
};

export default AnalyticsDashboardAppConfig;
