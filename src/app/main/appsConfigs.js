import Error404PageConfig from './errors/404/Error404PageConfig';
import Error500PageConfig from './errors/500/Error500PageConfig';
import AnalyticsDashboardAppConfig from './dashboard/AnalyticsDashboardAppConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import AccountsConfig from 'app/main/accounts/AccountsConfig';
const appsConfigs = [
  AnalyticsDashboardAppConfig,
  LoginConfig,
  ...AccountsConfig,
  Error500PageConfig,
  Error404PageConfig
];

export default appsConfigs;
