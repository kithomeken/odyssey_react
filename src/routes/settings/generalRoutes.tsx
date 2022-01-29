import Announcements from "../../pages/settings/general/announcements/Announcements";
import OrganizationalDetails from "../../pages/settings/general/organization/OrganizationalDetails";

export const generalRoutes = [
    { path: "/a/default/settings/general/organizational-details", element: <OrganizationalDetails />, activeMenu: 'organization' },
    { path: "/a/default/settings/general/announcements", element: <Announcements />, activeMenu: 'announcements' },
]