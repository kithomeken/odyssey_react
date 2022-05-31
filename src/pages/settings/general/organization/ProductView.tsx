import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import swal from 'sweetalert';

import Error500 from "../../../errors/Error500"
import ApiServices from "../../../../api/ApiServices"
import Header from "../../../../components/settings/Header"
import HttpServices from "../../../../services/HttpServices"
import DateFormating from "../../../../lib/hooks/DateFormating"
import { PRODUCT_DECOMMISSION_API_ROUTE, PRODUCT_VIEW_API_ROUTE } from "../../../../api/ApiRoutes"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect"

const Productview = () => {
    const [state, setstate] = useState({
        
    })

    const showButton = false
    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pageTitle = "Product View"

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: "" },
        { linkItem: true, title: "Product Management", url: "" },
        { linkItem: false, title: pageTitle },
    ] 

    const productViewApiCall = usePromiseEffect(async () => {
        const apiDomain = ApiServices.apiDomain()
        const productId = params.uuid
        const apiCall = apiDomain + PRODUCT_VIEW_API_ROUTE + '/' + productId
        const response: any = await HttpServices.httpGet(apiCall)

        if (response.status !== 200) {
            throw new Error("Something went wrong while fecthing products list.");
        }

        console.log(response.data.data);

        return response.data.data
    }, [dispatch])

    const onClickDecommissionProduct = () => {
        swal({
            title: "Are you sure?",
            text: "Once you decommission this product, no more tickets will be raised for this product.",
            dangerMode: true,
            buttons: ["Cancel", "Proceed"],
        })
        .then((willDelete) => {
            if (willDelete) {
                decommissionProductApiCall()
            }
        });
    }

    const decommissionProductApiCall = async () => {
        try {
            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + PRODUCT_DECOMMISSION_API_ROUTE
            const response: any = await HttpServices.httpPost(apiCall, params)

            if (response.data.success) {
                navigate(0)
            } else {

            }
        } catch (error) {
            
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <BreadCrumbs breadCrumbDetails={breadCrumb} />

            <div className="w-10/12 form-group pt-3">
                {/* <SuccessBanner message="Quis hendrerit dolor magna eget est lorem ipsum dolor" />
                <ErrorBanner message="Quis hendrerit dolor magna eget est lorem ipsum dolor" /> */}
            </div>

            <Header title={pageTitle}
                showButton={showButton}
            />

            <div className="w-full form-group">
                <div className="w-10/12">
                    <p className="text-sm mb-5 text-gray-500">Review and update your product details. Please make sure these details are up to date as they'll be used to create tickets</p>
                </div>

                <div className="w-12/12">
                    <div className="mb-5">
                        {
                            productViewApiCall.status === 'rejected' ? (
                                <Error500 />
                            ) : productViewApiCall.status === 'fulfilled' ? (
                                <div>
                                    <div className="pt-2 pb-6">
                                        <div className="flex flex-row align-middle">
                                            <div className="w-1/12">
                                                <p className="form-group text-sm text-gray-600 pt-1">
                                                    Details:
                                                </p>
                                            </div>

                                            <div className="w-full">
                                                <p className="text-2xl">
                                                    {productViewApiCall.value.name}
                                                </p>

                                                <p className="text-sm form-group text-gray-500 w-7/12">
                                                    {productViewApiCall.value.description}
                                                </p>

                                                {
                                                    productViewApiCall.value.deleted_at === null ? (
                                                        <div>
                                                            <p className="form-group text-sm text-gray-500 flex items-center align-middle">
                                                                <i className="fal fa-clock text-gray-700"></i>
                                                                <span className="ml-2">
                                                                    <span className="text-gray-700">Last Updated: </span>
                                                                    <DateFormating dateString={productViewApiCall.value.updated_at} />
                                                                </span>
                                                            </p>

                                                            {/* <div className="w-full form-group">
                                                                <p className="text-sm mb-1">
                                                                    Tickets raised tagged with product id
                                                                </p>
                                                                
                                                                <p className="text-2xl mb-1">
                                                                    0
                                                                </p>
                                                            </div> */}

                                                            <div className="form-group rounded border border-orange-400 bg-amber-100 py-3 px-4 w-7/12">
                                                                <div className="flex items-center align-middle text-orange-500">
                                                                    <i className="fad fa-exclamation-triangle fa-2x text-orange-400"></i>
                                                                    <span className="text-sm pl-3">
                                                                        Product currently has no raised tickets under it's wings...
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="form-group flex pt-4 items-center align-middle">
                                                                <p className="text-sm form-group text-sky-500 pr-5 hover:cursor-pointer">
                                                                    Edit Product Details
                                                                </p>
                                                                
                                                                <p className="text-sm form-group text-gray-500 pr-5">
                                                                    |
                                                                </p>

                                                                <p className="text-sm form-group text-red-500 hover:cursor-pointer" onClick={onClickDecommissionProduct}>
                                                                    Decommission Product
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <p className="form-group text-sm text-red-500 flex items-center align-middle">
                                                                <i className="fal fa-clock"></i>
                                                                <span className="ml-2">
                                                                    <span className="">Decommissioned On: </span>
                                                                    <DateFormating dateString={productViewApiCall.value.deleted_at} />
                                                                </span>
                                                            </p>

                                                            <div className="form-group rounded border border-red-400 bg-rose-100 py-3 px-4 w-7/12">
                                                                <div className="flex items-center align-middle text-red-500">
                                                                    <i className="fad fa-exclamation-circle fa-2x text-red-400"></i>
                                                                    <span className="text-sm pl-3">
                                                                        Product is currently decommissioned...
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="form-group flex pt-4 items-center align-middle">
                                                                <p className="text-sm form-group text-sky-500 hover:cursor-pointer">
                                                                    Reinstate Product
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col align-middle mt-6 h-16">
                                    <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Productview