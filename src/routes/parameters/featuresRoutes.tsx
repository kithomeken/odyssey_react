import SupportFeature from "../../views/parameters/features/SupportFeatures"
import TicketFeatures from "../../views/parameters/features/TicketFeatures"

export const featuresRoutes = [
    { path: "/a/default/site-manager/features/support", component: SupportFeature, exact: true, activeMenu: 'support' },
    { path: "/a/default/site-manager/features/tickets", component: TicketFeatures, exact: true, activeMenu: 'tickets' },
]