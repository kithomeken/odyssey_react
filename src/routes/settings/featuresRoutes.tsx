import SupportFeatures from "../../pages/settings/features/support/SupportFeatures";
import CreateTicketType from "../../pages/settings/features/tickets/CreateTicketType";
import TicketFeatures from "../../pages/settings/features/tickets/TicketFeatures";
import TicketStatuses from "../../pages/settings/features/tickets/TicketStatuses";
import TicketTypes from "../../pages/settings/features/tickets/TicketTypes";

export const featuresRoutes = [
   /* 0 */ { path: "/a/default/settings/features/support", element: <SupportFeatures />, activeMenu: 'support' },

   /* 1 */ { path: "/a/default/settings/features/tickets/types", element: <TicketTypes />, activeMenu: 'support' },
   /* 2 */ { path: "/a/default/settings/features/tickets/types/create", element: <CreateTicketType />, activeMenu: 'support' },

   /* 3 */ { path: "/a/default/settings/features/tickets", element: <TicketFeatures />, activeMenu: 'support' },

   /* 4 */ { path: "/a/default/settings/features/tickets/status", element: <TicketStatuses />, activeMenu: 'support', name: 'STAT' },
]