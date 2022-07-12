import React from "react"
import { Helmet } from "react-helmet"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { COMPANY_GROUP_LIST_API_ROUTE } from "../../../../api/ApiRoutes"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HeaderParagraph from "../../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry"
import DateFormating from "../../../../lib/hooks/DateFormating"
import NoDataReactTable from "../../../../lib/hooks/NoDataReactTable"
import ReactTable from "../../../../lib/hooks/ReactTable"
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect"
import { generalRoutes } from "../../../../routes/settings/generalRoutes"
import HttpServices from "../../../../services/HttpServices"
import Error500 from "../../../errors/Error500"

const CompanyGroups = () => {
    const dispatch = useDispatch()
    const pageTitle = "Company Groups"
    const orgDetailsRoute = generalRoutes[5].path

    // Header button
    const showButton = true
    const buttonTitle = "Create Company"
    const buttonIcon = true
    const iconType = "fas fa-plus-circle"
    const buttonLink = (generalRoutes.find((routeName) => routeName.name === 'CMPNY-CRT'))?.path

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: orgDetailsRoute },
        { linkItem: false, title: pageTitle },
    ]

    const companyGroupsApiCall = usePromiseEffect(async () => {
        const response: any = await HttpServices.httpGet(COMPANY_GROUP_LIST_API_ROUTE)

        if (response.status !== 200) {
            throw new Error("Something went wrong while fecthing products list.");
        }

        return response.data.data
    }, [dispatch])

    const columns = [
        {
            Header: 'Company Name',
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
            accessor: (data: { suspended: any }) => (
                data.suspended === 'Y' ? (
                    <span className="flex items-center">
                        <span className="h-3 w-3 align-middle bg-red-500 rounded-full mr-3"></span>

                        <span className="text-gray-500 text-sm align-middle">
                            Suspended
                        </span>
                    </span>
                ) : (
                    <span className="flex items-center">
                        <span className="h-3 w-3 align-middle bg-green-500 rounded-full mr-3"></span>

                        <span className="text-gray-500 text-sm align-middle">
                            Active
                        </span>
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
            Header: ' ',
            accessor: (data: { uuid: any }) => (
                <Link to={`${data.uuid}`} className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-900 text-sm">
                    Details
                </Link>
            )
        },
    ]

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

                <HeaderParagraph title="Create companies and make it easier to manage support requests from the same. Add contact information for your support team to easily seek assitance on issues raised by each company group." />
            </div>

            <div className="w-full px-12 form-group py-3">
                <div className="w-full">
                    {
                        companyGroupsApiCall.status === 'rejected' ? (
                            <Error500 />
                        ) : companyGroupsApiCall.status === 'fulfilled' ? (
                            <div>
                                {
                                    companyGroupsApiCall.value === null ? (
                                        <NoDataReactTable columns={columns} />
                                    ) : (
                                        <ReactTable columns={columns} data={companyGroupsApiCall.value} />
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

export default CompanyGroups