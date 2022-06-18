import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { TICKET_STATUS_LIST_API_ROUTE } from "../../../../api/ApiRoutes"
import ApiServices from "../../../../api/ApiServices"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HeaderParagraph from "../../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry"
import NoDataReactTable from "../../../../lib/hooks/NoDataReactTable"
import ReactTable from "../../../../lib/hooks/ReactTable"
import HttpServices from "../../../../services/HttpServices"
import Error500 from "../../../errors/Error500"
import CreateTicketStatus from "./CreateTicketStatus"

const TicketStatuses = () => {
    const [state, setstate] = useState({
        uuid: null,
        data: null,
        dataLength: 0,
        status: 'pending',
        show: false,
        requestFailed: false,
        requestSucceeded: false,
    })

    // Header button
    const showButton = true
    const actionButton = true
    const buttonIcon = true
    const buttonTitle = "Add Status"
    const pageTitle = "Ticket Statuses"
    const iconType = "fas fa-plus-circle"

    const breadCrumb = [
        { linkItem: true, title: "Ticket Settings", url: "" },
        { linkItem: false, title: pageTitle },
    ]

    const columns = React.useMemo(
        () => [
            {
                Header: 'Status',
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
                Header: 'Category',
                accessor: (data: { category: any, color_code: any }) => (
                    <span className="flex items-center">
                        <span className={`flex-shrink-0 h-5 w-4 rounded ${data.color_code}`}></span>
                        <span className="ml-2 text-sm text-gray-700 truncate">{data.category}</span>
                    </span>
                )
            },
            {
                Header: 'Order',
                accessor: (data: { uuid: any, order: any }) => (
                    <>
                        {
                            data.order === 1 ? (
                                <span className="flex items-center">
                                    <span className="flex-shrink-0 h-5 w-4 mx-1"></span>
                                    <span className="flex-shrink-0 h-5 w-4 rounded text-gray-500 fa-sm mx-1 fas fa-arrow-down"></span>
                                </span>
                            ) : data.order !== state.dataLength ? (
                                <span className="flex items-center">
                                    <span className="flex-shrink-0 h-5 w-4 rounded text-gray-500 fa-sm mx-1 fas fa-arrow-up"></span>
                                    <span className="flex-shrink-0 h-5 w-4 rounded text-gray-500 fa-sm mx-1 fas fa-arrow-down"></span>
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <span className="flex-shrink-0 h-5 w-4 rounded text-gray-500 fa-sm mx-1 fas fa-arrow-up"></span>
                                </span>
                            )
                        }
                    </>
                )
            },
            {
                Header: '-',
                accessor: (data: { uuid: any }) => (
                    <button type="button" className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-800 text-sm hover:bg-blue-100 px-2 rounded">
                        Edit
                    </button>
                )
            },
        ],
        [state.dataLength]
    )

    const showOrHideModal = () => {
        setstate({
            ...state, show: !state.show
        })
    }

    async function fetchTicketStatusListApiCall() {
        try {
            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + TICKET_STATUS_LIST_API_ROUTE
            const response: any = await HttpServices.httpGet(apiCall)

            let { data } = state
            let { dataLength } = state
            let status = state.status

            data = response.data.data
            dataLength = response.data.data.length 
            status = 'fulfilled'

            setstate({
                ...state, data, status, dataLength
            })

           
            
        } catch (e) {
            console.warn(e);
            let status = state.status
            status = 'rejected'

            setstate({
                ...state, status,
            })
        } finally {
            // Do nothing            
        }
    }

    React.useEffect(() => {
        fetchTicketStatusListApiCall();
        
    }, []);

    const refetchTicketStatusListAfterCreatingStatus = async () => {
        try {
            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + TICKET_STATUS_LIST_API_ROUTE
            const response: any = await HttpServices.httpGet(apiCall)

            let { data } = state
            let { dataLength } = state

            data = response.data.data
            dataLength = response.data.data.length

            setstate({
                ...state, data, dataLength, show: false
            })

        } catch (e) {
            console.warn(e);
            let status = state.status
            status = 'rejected'

            setstate({
                ...state, status,
            })
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className={`px-12 py-3 w-full ${HEADER_SECTION_BG} form-group mb-3`}>
                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                    actionButton={actionButton}
                    actionEvent={showOrHideModal}
                    buttonTitle={buttonTitle}
                    buttonIcon={buttonIcon}
                    iconType={iconType}
                />

                <HeaderParagraph title="Create ticket types to group all the issues raised by your client base. Makes it easier to manage and classify all issues increasing productivity and workflow." />

            </div>

            <div className="w-full px-12 py-3 form-group">
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
                            <div className="flex align-middle mt-6 h-16">
                                <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                            </div>
                        )
                    }
                </div>
            </div>

            <CreateTicketStatus
                show={state.show}
                hideModal={showOrHideModal}
                reloadTicketStatusFunc={refetchTicketStatusListAfterCreatingStatus}
            />
        </React.Fragment>
    )
}

export default TicketStatuses