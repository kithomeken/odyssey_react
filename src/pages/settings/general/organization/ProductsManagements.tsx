import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import NoDataReactTable from "../../../../lib/hooks/NoDataReactTable"
import ReactTable from "../../../../lib/hooks/ReactTable"
import { generalRoutes } from "../../../../routes/settings/generalRoutes"
import HttpServices from "../../../../services/HttpServices"
import Error500 from "../../../errors/Error500"
import DateFormating from "../../../../lib/hooks/DateFormating";
import HeaderParagraph from "../../../../components/settings/HeaderParagraph";
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry";
import AddProduct from "./AddProduct";
import { PRODUCT_LIST_API_ROUTE } from "../../../../api/v1/api.GeneralRoutes"

const ProductManagement = () => {
    const [state, setstate] = useState({
        data: null,
        show: false,
        status: 'pending',
        requestFailed: '',
    })

    const pageTitle = "Product Management"
    const orgDetailsRoute = generalRoutes[2].path

    // Header button
    const showButton = true
    const actionButton = true
    const buttonTitle = "Create Product"
    const buttonIcon = false

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: orgDetailsRoute },
        { linkItem: false, title: pageTitle },
    ]

    function fetchProductListWithSetState() {
        setstate({
            ...state,
            status: 'pending'
        })

        fetchProductListApiCall()
    }

    async function fetchProductListApiCall(hideModal = 'Y') {
        try {
            const response: any = await HttpServices.httpGet(PRODUCT_LIST_API_ROUTE)

            let { data } = state
            let status = state.status
            let show = state.show

            data = response.data.payload.products
            status = 'fulfilled'

            hideModal === 'Y' ? (
                setstate({
                    ...state, data, status, show: false
                })
            ) : (
                setstate({
                    ...state, data, status
                })
            )
        } catch (e) {
            console.warn(e);
            let status = state.status
            let show = state.show
            
            status = 'rejected'
            show = false

            setstate({
                ...state, status, show
            })
        } finally {
            // Do nothing            
        }
    }

    React.useEffect(() => {
        fetchProductListWithSetState();
    }, []);

    const showOrHideModal = () => {
        setstate({
            ...state, show: !state.show
        })
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Product Name',
                accessor: (data: { name: any }) => (
                    <span>
                        <span className="block text-black text-sm">
                            {data.name}
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

            <div className={`px-12 pt-3 pb-1 w-full form-group mb-3`}>
                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                    actionButton={actionButton}
                    actionEvent={showOrHideModal}
                    buttonTitle={buttonTitle}
                    buttonIcon={buttonIcon}
                />

                <HeaderParagraph title="Configure the various products your team(s) support within your business workflow to Odyssey's workstreams and track the tickets raised on each." />

            </div>

            <div className="w-full form-group px-12 mb-14">

                <div className="w-full">
                    {
                        state.status === 'rejected' ? (
                            <Error500 />
                        ) : state.status === 'fulfilled' ? (
                            <div>
                                {
                                    state.data === null ? (
                                        <NoDataReactTable columns={columns} />
                                    ) : (
                                        <ReactTable columns={columns} data={state.data} />
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

            <AddProduct
                show={state.show}
                showOrHideModal={showOrHideModal}
                reloadReactTable={fetchProductListApiCall}
            />

        </React.Fragment>
    )
}

export default ProductManagement