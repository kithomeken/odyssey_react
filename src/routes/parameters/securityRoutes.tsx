import AuthTeams from "../../views/parameters/security/AuthTeams";
import CreateAuthTeams from "../../views/parameters/security/CreateAuthTeams";
import PasswordPolicies from "../../views/parameters/security/PasswordPolicies";

export const securityRoutes = [
    { path: "/a/default/site-manager/security/auth-teams", component: AuthTeams, exact: true, activeMenu: 'teams' },
    { path: "/a/default/site-manager/security/auth-teams/create", component: CreateAuthTeams, exact: true, activeMenu: 'teams' },
    
    { path: "/a/default/site-manager/security/password", component: PasswordPolicies, exact: true, activeMenu: 'pwd-policies' },
]