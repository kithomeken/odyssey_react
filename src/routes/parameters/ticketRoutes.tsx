import TicketTypes from "../../views/parameters/tickets/TicketTypes";
import CreateTicketTypes from "../../views/parameters/tickets/CreateTicketTypes";

export const ticketRoutes = [
    // Ticket Types
    { path: "/a/default/site-manager/tickets/types", component: TicketTypes, exact: true, activeMenu: 'types' },
    { path: "/a/default/site-manager/tickets/types/create", component: CreateTicketTypes, exact: true, activeMenu: 'types' },
]