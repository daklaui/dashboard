import { Navigate } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/appsConfigs';
import ExampleConfig from 'app/main/example/ExampleConfig';
import FuseLoading from '@fuse/core/FuseLoading';
 

const routeConfigs = [...appsConfigs, ExampleConfig];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    element: <Navigate to="dashboards" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="errors/404" />,
  },
];

export default routes;
