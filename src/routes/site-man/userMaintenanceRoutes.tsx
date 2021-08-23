import Agents from "../../views/site-man/user-maintenance/Agents"
import InviteAgents from "../../views/site-man/user-maintenance/InviteAgents"
import AgentDetails from "../../views/site-man/user-maintenance/AgentDetails"
// import AccessTeams from "../../views/site-man/security/AccessTeams"
import PortalClients from "../../views/site-man/user-maintenance/PortalClients"

// User Maintenance Routes
export const userMaintenanceRoutes = [    
    { path: "/a/default/site-manager/user-maintenance/agents", component: Agents, exact: true, activeMenu: 'agents' },
    { path: "/a/default/site-manager/user-maintenance/agents/invite", component: InviteAgents, exact: true, activeMenu: 'agents' },
    { path: "/a/default/site-manager/user-maintenance/agents/:uuid", component: AgentDetails, exact: true, activeMenu: 'agents' },

    { path: "/a/default/site-manager/user-maintenance/portal-clients", component: PortalClients, exact: true, activeMenu: 'clients' },
]