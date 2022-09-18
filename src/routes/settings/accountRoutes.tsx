import { AgentAccounts } from "../../pages/settings/accounts/AgentAccounts";
import { AgentDetails } from "../../pages/settings/accounts/AgentDetails";
import MasterAccounts from "../../pages/settings/accounts/MasterAccounts";

export const accountRoutes = [
    /* 0 */ { path: "/a/default/settings/user-accounts/master-accounts", element: <MasterAccounts />, activeMenu: 'master', name: 'MSTR' },
    /* 1 */ { path: "/a/default/settings/user-accounts/agent-accounts", element: <AgentAccounts />, activeMenu: 'agents', name: 'AGNT' },
    /* 1 */ { path: "/a/default/settings/user-accounts/agent-accounts/:uuid", element: <AgentDetails />, activeMenu: 'agents', name: 'AGNT' },
     
]