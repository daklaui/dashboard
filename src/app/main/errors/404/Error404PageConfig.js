import { lazy } from 'react';

const Error404Page = lazy(() => import('./Error404Page'));

const Error404PageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'errors/404',
      element: <Error404Page />, 
    },
  ],
};

export default Error404PageConfig;
