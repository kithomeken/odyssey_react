import Announcements from "../../pages/settings/general/announcements/Announcements";
import OrganizationalDetails from "../../pages/settings/general/organization/OrganizationalDetails";
import ProductManagement from "../../pages/settings/general/organization/ProductsManagements";
import Productview from "../../pages/settings/general/organization/ProductView";
import CompanyGroups from "../../pages/settings/general/company/CompanyGroups";
import CreateCompanyGroup from "../../pages/settings/general/company/CreateCompanyGroup";
import CompanyView from "../../pages/settings/general/company/CompanyView";

export const generalRoutes = [
   /* 0 */ { path: "/a/default/settings/general/organizational-details", element: <OrganizationalDetails />, activeMenu: 'organization', name: 'ORGNZ' },
   /* 1 */ { path: "/a/default/settings/general/announcements", element: <Announcements />, activeMenu: 'announcements', name: 'ANNC' },
   
   /* 2 */ { path: "/a/default/settings/general/products", element: <ProductManagement />, activeMenu: 'products', name: 'PROD' },
   /* 4 */ { path: "/a/default/settings/general/products/:uuid", element: <Productview />, activeMenu: 'products', name: 'PROD-VW' },
   
   /* 5 */ { path: "/a/default/settings/general/company-groups", element: <CompanyGroups />, activeMenu: 'company', name: 'CMPNY' },
   /* 6 */ { path: "/a/default/settings/general/company-groups/create", element: <CreateCompanyGroup />, activeMenu: 'company', name: 'CMPNY-CRT' },
   /* 7 */ { path: "/a/default/settings/general/company-groups/:uuid", element: <CompanyView />, activeMenu: 'company', name: 'CMPNY-VW' },
    
]