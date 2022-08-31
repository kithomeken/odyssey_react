import React, { FC } from "react";
import { AUTH_TEAM_PRODUCT_AND_COMPANY_RIGHTS_API_ROUTE } from "../../../api/ApiRoutes";
import Loading from "../../../components/layouts/Loading";

import HttpServices from "../../../services/HttpServices";
import Error500 from "../../errors/Error500";

interface Props {
    state: any,
    teamId: any,
    status: any,
    support: any,
    updateTabStatus: any,
    disableCheckbox: boolean,
    updateRightsTabState: any,
    productCheckboxHandler: any,
    companyCheckboxHandler: any,
}

export const ProductAndCompaniesRights: FC<Props> = ({ state, status, support, productCheckboxHandler, disableCheckbox, teamId, updateRightsTabState, updateTabStatus }) => {
    const productsAndCompaniesRightsApiCall = async () => {
        try {
            const response = await HttpServices.httpGet(AUTH_TEAM_PRODUCT_AND_COMPANY_RIGHTS_API_ROUTE + '/' + teamId)
            const payload = response.data.payload

            updateRightsTabState('products', payload.products)
            updateRightsTabState('companies', payload.companies)
            updateTabStatus('products', 'fulfilled')
        } catch (error) {
            updateTabStatus('products', 'rejected')
        }
    }

    React.useEffect(() => {
        if (state.products.length < 1 /* || state.companies === undefined */) {
            productsAndCompaniesRightsApiCall();
        }
    }, []);

    return (
        <React.Fragment>
            <div className="w-full py-1">
                <h2 className="text-lg leading-7 text-emerald-600 sm:text-lg">
                    Products & Companies Rights
                </h2>

                <p className="text-sm leading-7 text-slate-600 sm:text-lg sm: pb-3">
                    Products and companies management functionalities that users can perform.
                </p>

                {
                    status === 'rejected' ? (
                        <Error500 />
                    ) : status === 'fulfilled' ? (
                        <>
                            <div className="rounded-md mb-4 w-9/12 border-0 border-orange-400 bg-orange-100 py-4 px-4">
                                <div className="flex flex-row text-orange-700">
                                    <i className="fas fa-info-circle fa-lg mt-1 text-orange-600 flex-none"></i>

                                    <div className="flex-auto">
                                        <span className="text-sm pl-3 block mb-2">
                                            Company management rights are dependent if the Support features has been activated.
                                        </span>

                                        <div className="flex flex-row text-xs text-slate-600">
                                            <button className="text-xs text-orange-600 pl-3 hover:text-orange-800 block hover:underline">
                                                Activate feature
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mb-3">
                                <div className="w-full mb-2">
                                    <span className="text-sm text-emerald-600 block">
                                        Products Management
                                    </span>
                                </div>

                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="create_product"
                                                onChange={productCheckboxHandler}
                                                disabled={disableCheckbox}
                                                checked={state.products.create_product === 'Y' ? true : false}
                                                name="create_product"
                                                type="checkbox"
                                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="create_product" className="ml-4 block text-sm text-gray-800">
                                                Add new products

                                                <span className="block text-xs text-gray-500">
                                                    Can configure new products into the system
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="edit_product"
                                                onChange={productCheckboxHandler}
                                                disabled={disableCheckbox}
                                                checked={state.products.edit_product === 'Y' ? true : false}
                                                name="edit_product"
                                                type="checkbox"
                                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="edit_product" className="ml-4 block text-sm text-gray-800">
                                                Edit product details

                                                <span className="block text-xs text-gray-500">
                                                    Can make edits to the existing products in the system.
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="suspend_product"
                                                onChange={productCheckboxHandler}
                                                disabled={disableCheckbox}
                                                checked={state.products.suspend_product === 'Y' ? true : false}
                                                name="suspend_product"
                                                type="checkbox"
                                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="suspend_product" className="ml-4 block text-sm text-gray-800">
                                                Suspend products

                                                <span className="block text-xs text-gray-500">
                                                    Can suspend out-dated products in the system
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full mb-3">
                                <div className="w-full mb-2">
                                    <span className="text-sm text-emerald-600 block">
                                        Company Groups Management
                                    </span>
                                </div>

                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="add_product"
                                                onChange={productCheckboxHandler}
                                                disabled={disableCheckbox}
                                                // checked={state.adminRights.add_product === 'Y' ? true : false}
                                                name="add_product"
                                                type="checkbox"
                                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="add_product" className="ml-4 block text-sm text-gray-800">
                                                Add new products

                                                <span className="block text-xs text-gray-500">
                                                    Can configure new products into the system
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="edit_product"
                                                onChange={productCheckboxHandler}
                                                disabled={disableCheckbox}
                                                // checked={state.adminRights.edit_product === 'Y' ? true : false}
                                                name="edit_product"
                                                type="checkbox"
                                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="edit_product" className="ml-4 block text-sm text-gray-800">
                                                Edit product details

                                                <span className="block text-xs text-gray-500">
                                                    Can make edits to the existing products in the system.
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="suspend_product"
                                                onChange={productCheckboxHandler}
                                                disabled={disableCheckbox}
                                                // checked={state.adminRights.suspend_product === 'Y' ? true : false}
                                                name="suspend_product"
                                                type="checkbox"
                                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="suspend_product" className="ml-4 block text-sm text-gray-800">
                                                Suspend products

                                                <span className="block text-xs text-gray-500">
                                                    Can suspend out-dated products in the system
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="py-5">
                            <Loading />
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    )
}