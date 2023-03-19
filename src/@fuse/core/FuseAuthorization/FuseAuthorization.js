import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import React, {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import settingsConfig from 'app/fuse-configs/settingsConfig';
 
function FuseAuthorization(props) {
  const { routes } = React.useContext(AppContext);
  const [accessGranted, setAccessGranted] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = useSelector(state => state.auth.user.role);
  const { pathname } = location;

  useEffect(() => {
    if (!accessGranted) {
      redirectRoute();
    }
  }, [accessGranted]);

  useEffect(() => {
    const matchedRoutes = matchRoutes(routes, pathname);
    const matched = matchedRoutes ? matchedRoutes[0] : false;
    const newAccessGranted = matched ? FuseUtils.hasPermission(matched.route.auth, userRole) : true;
    setAccessGranted(newAccessGranted);
  }, [pathname, routes, userRole]);

  const defaultLoginRedirectUrl = settingsConfig.loginRedirectUrl || '/';

  const redirectRoute = () => {
    const loginRedirectUrl = settingsConfig.loginRedirectUrl
      ? settingsConfig.loginRedirectUrl
      : defaultLoginRedirectUrl;

    if (!userRole || userRole.length === 0) {
      navigate({
        pathname: '/login',
      });
      settingsConfig.loginRedirectUrl = pathname;
    } else {
      navigate({
        pathname: loginRedirectUrl,
      });
      settingsConfig.loginRedirectUrl = defaultLoginRedirectUrl;
    }
  };

  console.info('Fuse Authorization rendered', accessGranted);
  return accessGranted ? <>{props.children}</> : null;
}

export default withRouter(FuseAuthorization);
