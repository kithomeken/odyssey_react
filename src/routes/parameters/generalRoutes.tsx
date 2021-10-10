import Products from "../../views/parameters/general/products/Products";
import CreateProduct from "../../views/parameters/general/products/AddProduct";
import ProductDetails from "../../views/parameters/general/products/ProductDetails";
import CompanyGroups from "../../views/parameters/general/companies/CompanyGroups";
import CreateCompany from "../../views/parameters/general/companies/CreateCompany";
import CompanyDetails from "../../views/parameters/general/companies/CompanyDetails";

export const generalRoutes = [
    // Products
    { path: "/a/default/site-manager/general/products", component: Products, exact: true, activeMenu: 'products' },
    { path: "/a/default/site-manager/general/products/create", component: CreateProduct, exact: true, activeMenu: 'products' },
    { path: "/a/default/site-manager/general/products/:uuid", component: ProductDetails, exact: true, activeMenu: 'products' },

    // Company Groups
    { path: "/a/default/site-manager/general/company-groups", component: CompanyGroups, exact: true, activeMenu: 'company' },
    { path: "/a/default/site-manager/general/company-groups/create", component: CreateCompany, exact: true, activeMenu: 'company' },
    { path: "/a/default/site-manager/general/company-groups/:uuid", component: CompanyDetails, exact: true, activeMenu: 'company' },

]