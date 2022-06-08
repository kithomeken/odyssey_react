import SupportFeatures from "../../pages/settings/features/support/SupportFeatures";
import CreateTicketType from "../../pages/settings/features/tickets/CreateTicketType";
import TicketTypes from "../../pages/settings/features/tickets/TicketTypes";

export const featuresRoutes = [
   /* 0 */ { path: "/a/default/settings/features/support", element: <SupportFeatures />, activeMenu: 'support' },

   /* 1 */ { path: "/a/default/settings/features/ticket/types", element: <TicketTypes />, activeMenu: 'support' },
   /* 2 */ { path: "/a/default/settings/features/ticket/types/create", element: <CreateTicketType />, activeMenu: 'support' },
]