import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import Moment from 'moment';

import { PRODUCT_LIST_API_ROUTE } from "../../../../api/ApiRoutes"
import ApiServices from "../../../../api/ApiServices"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import NoDataReactTable from "../../../../lib/hooks/NoDataReactTable"
import ReactTable from "../../../../lib/hooks/ReactTable"
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect"
import { generalRoutes } from "../../../../routes/settings/generalRoutes"
import HttpServices from "../../../../services/HttpServices"
import Error500 from "../../../errors/Error500"
import DateFormating from "../../../../lib/hooks/DateFormating";
import HeaderParagraph from "../../../../components/settings/HeaderParagraph";
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry";

const ProductManagement = () => {
    const [state, setstate] = useState({
        requestFailed: '',
        isLoading: true,
    })

    const dispatch = useDispatch()
    const pageTitle = "Product Management"
    const orgDetailsRoute = generalRoutes[2].path

    // Header button
    const showButton = true
    const buttonTitle = "Create Product"
    const buttonIcon = true
    const iconType = "fas fa-plus-circle"
    const buttonLink = generalRoutes[3].path

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: orgDetailsRoute },
        { linkItem: false, title: pageTitle },
    ]

    const productsListApiCall = usePromiseEffect(async () => {
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + PRODUCT_LIST_API_ROUTE
        const response: any = await HttpServices.httpGet(apiCall)

        if (response.status !== 200) {
            throw new Error("Something went wrong while fecthing products list.");
        }

        return response.data.data
    }, [dispatch])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Product Name',
                accessor: (data: { name: any, description: any }) => (
                    <span>
                        <span className="block text-black text-sm">
                            {data.name}
                        </span>

                        <span className="block text-gray-500 mb-0 text-sm">
                            {data.description}
                        </span>
                    </span>
                ),
            },
            {
                Header: 'Status',
                accessor: (data: { deleted_at: any, name: any }) => (
                    data.deleted_at === null ? (
                        <span className="bg-green-100 text-green-600 mb-0 text-xs py-1 px-2 rounded">
                            Active
                        </span>
                    ) : (
                        <span className="text-red-600 bg-red-100 mb-0 text-xs py-1 px-2 rounded">
                            Suspended
                        </span>
                    )
                )
            },
            {
                Header: 'Created At',
                accessor: (data: { created_at: any }) => (
                    <span className="block text-gray-500 mb-0 text-sm">
                        <DateFormating dateString={data.created_at} />
                    </span>
                )
            },
            {
                Header: '-',
                accessor: (data: { uuid: any }) => (
                    <Link to={`${data.uuid}`} className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-900 text-sm">
                        Details
                    </Link>
                )
            },
        ],
        []
    )

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className={`px-12 py-3 w-full ${HEADER_SECTION_BG} form-group mb-3`}>
                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                    buttonTitle={buttonTitle}
                    buttonIcon={buttonIcon}
                    iconType={iconType}
                    buttonLink={buttonLink}
                />

                <HeaderParagraph title="Configure the various products your team(s) support within your business workflow to Odyssey's workstreams and track the tickets raised on each." />

            </div>

            <div className="w-full form-group px-12 mb-14">

                <div className="w-full">
                    {
                        productsListApiCall.status === 'rejected' ? (
                            <Error500 />
                        ) : productsListApiCall.status === 'fulfilled' ? (
                            <div>
                                {
                                    productsListApiCall.value === null ? (
                                        <NoDataReactTable columns={columns} />
                                    ) : (
                                        <ReactTable columns={columns} data={productsListApiCall.value} />
                                    )
                                }
                            </div>
                        ) : (
                            <div className="flex flex-col align-middle mt-6 h-16">
                                <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                            </div>
                        )
                    }
                </div>
            </div>

        </React.Fragment>
    )
}

export default ProductManagement