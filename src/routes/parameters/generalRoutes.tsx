import Products from "../../views/parameters/general/Products";
import CreateProduct from "../../views/parameters/general/AddProduct";

export const generalRoutes = [
    // Products
    { path: "/a/default/site-manager/general/products", component: Products, exact: true, activeMenu: 'products' },
    { path: "/a/default/site-manager/general/products/create", component: CreateProduct, exact: true, activeMenu: 'products' },


]