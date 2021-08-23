import AccessTeams from "../../views/site-man/security/AccessTeams"
import CreateAccessTeam from "../../views/site-man/security/CreateAccessTeam"

export const securityRoutes = [
    { path: "/a/default/site-manager/security/access-teams", component: AccessTeams, exact: true, activeMenu: 'teams' },
    { path: "/a/default/site-manager/security/access-teams/create", component: CreateAccessTeam, exact: true, activeMenu: 'teams' },
]