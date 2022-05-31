import Announcements from "../../pages/settings/general/announcements/Announcements";
import AddProduct from "../../pages/settings/general/organization/AddProduct";
import OrganizationalDetails from "../../pages/settings/general/organization/OrganizationalDetails";
import ProductManagement from "../../pages/settings/general/organization/ProductsManagements";
import Productview from "../../pages/settings/general/organization/ProductView";

export const generalRoutes = [
    { path: "/a/default/settings/general/organizational-details", element: <OrganizationalDetails />, activeMenu: 'organization' },
    { path: "/a/default/settings/general/announcements", element: <Announcements />, activeMenu: 'announcements' },
    { path: "/a/default/settings/general/products", element: <ProductManagement />, activeMenu: 'products' },
    { path: "/a/default/settings/general/products/new", element: <AddProduct />, activeMenu: 'products' },
    { path: "/a/default/settings/general/products/:uuid", element: <Productview />, activeMenu: 'products' },
]