import AuthorizationTeams from "../../pages/settings/security/AuthorizationTeams";
import EditAuthorizations from "../../pages/settings/security/EditAuthorizations";

export const securityRoutes = [
    { path: "/a/default/settings/security/auth-teams", element: <AuthorizationTeams />, activeMenu: 'authorization', name: 'AUTH' },
    { path: "/a/default/settings/security/auth-teams/:uuid", element: <EditAuthorizations />, activeMenu: 'authorization', name: 'AUTH_VW' },
]