import React from "react"
import { useState } from "react";

import { COMPANY_GROUP_PRODUCTS_SUBSCRIBED_API_ROUTE, COMPANY_GROUP_UNSUBSCRIBE_TO_PRODUCT_API_ROUTE } from "../../../../api/ApiRoutes";
import Loading from "../../../../components/layouts/Loading"
import DateFormating from "../../../../lib/hooks/DateFormating";
import HttpServices from "../../../../services/HttpServices";
import EmptyResultsReturnedSFF from "../../../errors/EmptyResultsReturnedSFF";
import AddProduct from "./AddProduct";

const ProductsTab = ({ data, status, companyId, updateTabDataState, updateTabStatus }: { data: any, status: any, companyId: any, updateTabDataState: any, updateTabStatus: any }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        requestSucceeded: false,
        show: false,
    })

    const showOrHideModal = () => {
        setstate({
            ...state, show: !state.show
        })
    }

    const fetchProductsSubscribedToApiCall = async () => {
        try {
            const response: any = await HttpServices.httpGet(COMPANY_GROUP_PRODUCTS_SUBSCRIBED_API_ROUTE + '/' + companyId)

            setstate({
                ...state, show: false
            })

            updateTabDataState('products', response.data.data)
            updateTabStatus('products', 'fulfilled')
        } catch (e) {
            console.warn(e);
            updateTabStatus('products', 'rejected')
        } finally {
            // Do nothing            
        }
    }

    React.useEffect(() => {
        if (data === null || data === undefined) {
            fetchProductsSubscribedToApiCall();
        }
    }, []);

    const unsubscribeFromProductHandler = async (product_uuid: any) => {
        let { requestSucceeded }: any = state
        let { requestFailed }: any = state        

        try {
            let formData = new FormData()
            formData.append("product_uuid", product_uuid)
            formData.append("company_uuid", companyId)
            const response: any = await HttpServices.httpPost(COMPANY_GROUP_UNSUBSCRIBE_TO_PRODUCT_API_ROUTE, formData)            
            
            if (response.data.success) {
                fetchProductsSubscribedToApiCall()
            } else {
                requestFailed = true
            }
        } catch (error) {
            requestFailed = true
        }

        setstate({
            ...state, requestFailed, requestSucceeded
        })
    } 

    return (
        <React.Fragment>
            {
                status === 'rejected' ? (
                    null
                ) : status === 'fulfilled' ? (
                    <>
                        <div className="w-full">
                            <h2 className="text-sm leading-7 text-emerald-600 sm:text-lg">
                                Products Subscribed
                            </h2>

                            <div className="w-12/12">
                                <p className="text-sm text-gray-500">
                                    In order for users to raise tickets, each company needs to be subscribed to (or purchase) a product.
                                </p>

                                <div className="py-2">
                                    <span className="text-blue-500 text-sm cursor-pointer flex-row align-middle" onClick={showOrHideModal}>
                                        <span className="fas fa-plus mr-2"></span>
                                        Add product
                                    </span>
                                </div>
                            </div>

                            {
                                data.length === 0 ? (
                                    <EmptyResultsReturnedSFF />
                                ) : (
                                    <div className="w-full">
                                        <table className="w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">Product Name</th>
                                                    <th className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">Product Status</th>
                                                    <th className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">Subscribe On</th>
                                                    <th className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">-</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {data.map((row: any, index: any) => {
                                                    return (
                                                        <tr key={index} className="border-b text-sm hover:bg-gray-100">
                                                            <td className="px-3 py-2 text-slate-700 whitespace-nowrap">
                                                                <span>
                                                                    <span className="block text-black text-sm">
                                                                        {row.name}
                                                                    </span>

                                                                    <span className="block text-gray-500 mb-0 text-sm">
                                                                        {row.description}
                                                                    </span>
                                                                </span>
                                                            </td>

                                                            <td className="px-3 py-2 text-slate-600 whitespace-nowrap">
                                                                {
                                                                    row.deleted_at === null ? (
                                                                        <span className="bg-green-100 text-green-600 mb-0 text-xs py-1 px-2 rounded">
                                                                            Active
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-red-600 bg-red-100 mb-0 text-xs py-1 px-2 rounded">
                                                                            Suspended
                                                                        </span>
                                                                    )}
                                                            </td>

                                                            <td className="px-3 py-2 text-slate-600 whitespace-nowrap">
                                                                <span className="block text-gray-500 mb-0 text-sm">
                                                                    <DateFormating dateString={row.created_at} />
                                                                </span>
                                                            </td>
                                                            <td className="px-3 py-2 whitespace-nowrap">
                                                                <p className="text-red-500 p-1-5 flex-1 text-xs hover:text-red-700 cursor-pointer mb-0" onClick={() => unsubscribeFromProductHandler(row.uuid)}>
                                                                    Remove
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }

                            {
                                state.show ? (
                                    <AddProduct
                                        show={state.show}
                                        companyId={companyId}
                                        showOrHideModal={showOrHideModal}
                                        reloadProductsTable={fetchProductsSubscribedToApiCall}
                                    />
                                ) : null
                            }
                        </div>
                    </>
                ) : (
                    <Loading />
                )
            }
        </React.Fragment >
    )
}

export default ProductsTab