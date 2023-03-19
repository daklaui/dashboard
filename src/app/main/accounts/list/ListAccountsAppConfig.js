import { authRoles } from "app/auth";
import { lazy } from "react";
import { Navigate } from "react-router-dom";

const ListAccounts = lazy(() => import("./ListAccounts"));

const ListAccountsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "auth/accounts/list",
      element: <ListAccounts />,
    },
    {
      path: "auth/accounts",
      element: <Navigate to="list" />,
    },
  ],
};

export default ListAccountsAppConfig;
