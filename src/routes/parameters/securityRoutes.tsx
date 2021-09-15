import AuthTeams from "../../views/parameters/security/AuthTeams";
import CreateAuthTeams from "../../views/parameters/security/CreateAuthTeams";

export const securityRoutes = [
    { path: "/a/default/site-managr/security/auth-teams", component: AuthTeams, exact: true, activeMenu: 'teams' },
    { path: "/a/default/site-managr/security/auth-teams/create", component: CreateAuthTeams, exact: true, activeMenu: 'teams' },
]