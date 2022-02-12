import AuthorizationTeams from "../../pages/settings/security/AuthorizationTeams";
import CreateAuthorizationTeam from "../../pages/settings/security/CreateAuthorizationTeam";
import EditAuthorizations from "../../pages/settings/security/EditAuthorizations";

export const securityRoutes = [
    { path: "/a/default/settings/security/authorization-groups", element: <AuthorizationTeams />, activeMenu: 'authorization' },
    { path: "/a/default/settings/security/authorization-groups/create", element: <CreateAuthorizationTeam />, activeMenu: 'authorization' },
    { path: "/a/default/settings/security/authorization-groups/:uuid", element: <EditAuthorizations />, activeMenu: 'authorization' },
]