import { AgentAccounts } from "../../pages/settings/accounts/AgentAccounts";
import MasterAccounts from "../../pages/settings/accounts/MasterAccounts";

export const accountRoutes = [
    /* 0 */ { path: "/a/default/settings/accounts/master-accounts", element: <MasterAccounts />, activeMenu: 'master', name: 'MSTR' },
    /* 1 */ { path: "/a/default/settings/accounts/agent-accounts", element: <AgentAccounts />, activeMenu: 'master', name: 'AGNT' },
     
]