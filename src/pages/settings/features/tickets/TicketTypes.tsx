import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import swal from 'sweetalert';

import { TICKET_TYPES_LIST_API_ROUTE, TICKET_TYPES_REINSTATE_API_ROUTE, TICKET_TYPES_SUSPEND_API_ROUTE } from "../../../../api/ApiRoutes"
import ApiServices from "../../../../api/ApiServices"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HttpServices from "../../../../services/HttpServices"
import { featuresRoutes } from "../../../../routes/settings/featuresRoutes"
import NoDataReactTable from "../../../../lib/hooks/NoDataReactTable"
import ReactTable from "../../../../lib/hooks/ReactTable"
import Error500 from "../../../errors/Error500"
import DateFormating from "../../../../lib/hooks/DateFormating"
import { Transition } from "@headlessui/react";
import HeaderParagraph from "../../../../components/settings/HeaderParagraph";
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry";

const TicketTypes = () => {
    const [state, setstate] = useState({
        uuid: null,
        type: {
            data: null,
        },
        status: 'Pending',
        requestFailed: false,
        requestSucceeded: false,
    })

    const pageTitle = "Ticket Types"

    // Header button
    const showButton = true
    const buttonTitle = "Create Type"
    const buttonIcon = true
    const iconType = "fas fa-plus-circle"
    const buttonLink = featuresRoutes[2].path

    const breadCrumb = [
        { linkItem: true, title: "Ticket Settings", url: "" },
        { linkItem: false, title: pageTitle },
    ]

    function setStatusAsPending() {
        setstate({
            ...state,
            status: 'Pending'
        })
    }

    async function fetchTicketTypeListApiCall() {
        setStatusAsPending()

        try {
            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + TICKET_TYPES_LIST_API_ROUTE
            const response: any = await HttpServices.httpGet(apiCall)
            
            let { type } = state
            let status = state.status

            type = response.data.data
            status = 'fulfilled'

            setstate({
                ...state, type, status,
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
        fetchTicketTypeListApiCall();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Ticket Type',
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
                accessor: (data: { deleted_at: any }) => (
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
                accessor: (data: { uuid: any, deleted_at: any }) => (
                    data.deleted_at === null ? (
                        <button type="button" className="text-red-600 m-auto text-right float-right cursor-pointer hover:text-red-800 text-sm hover:bg-red-100 px-2 rounded" onClick={() => onClickSuspendTicketType(data.uuid)}>
                            Suspend
                        </button>
                    ) : (
                        <button type="button" className="text-green-600 m-auto text-right float-right cursor-pointer hover:text-green-800 text-sm hover:bg-green-100 px-2 rounded" onClick={() => onClickReinstateTicketType(data.uuid)}>
                            Reinstate
                        </button>
                    )
                )
            },
        ],
        []
    )

    const onClickSuspendTicketType = (uuidY: any) => {
        swal({
            title: "Are you sure?",
            text: "Once you suspend this ticket type, no more tickets will be raised with this type.",
            dangerMode: true,
            buttons: ["Cancel", "Proceed"],
        })
            .then((willDelete) => {
                if (willDelete) {
                    suspendTicketTypeApiCall(uuidY)
                }
            });
    }

    const suspendTicketTypeApiCall = async (uuid: any) => {
        let { requestSucceeded }: any = state
        let { requestFailed }: any = state

        try {
            const input = {
                uuid: uuid
            }
            const apiDomain = ApiServices.apiDomain()
            const apiToBeConsumed = apiDomain + TICKET_TYPES_SUSPEND_API_ROUTE
            const response: any = await HttpServices.httpPost(apiToBeConsumed, input)

            if (response.data.success) {
                fetchTicketTypeListApiCall()
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

    const onClickReinstateTicketType = (uuidY: any) => {
        swal({
            title: "Are you sure?",
            text: "This actions will reinstate this product. Do you wish to proceed?",
            dangerMode: true,
            buttons: ["Cancel", "Proceed"],
        })
            .then((willDelete) => {
                if (willDelete) {
                    reinstateTicketTypeApiCall(uuidY)
                }
            });
    }

    const reinstateTicketTypeApiCall = async (uuid: any) => {
        let { requestSucceeded }: any = state
        let { requestFailed }: any = state

        try {
            const input = {
                uuid: uuid
            }
            const apiDomain = ApiServices.apiDomain()
            const apiToBeConsumed = apiDomain + TICKET_TYPES_REINSTATE_API_ROUTE
            const response: any = await HttpServices.httpPost(apiToBeConsumed, input)

            if (response.data.success) {
                fetchTicketTypeListApiCall()
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

                <HeaderParagraph title="Create ticket types to group all the issues raised by your client base. Makes it easier to manage and classify all issues increasing productivity and workflow." />
            </div>

            <div className="w-full px-12 py-3 form-group">
                <div className="w-12/12 mb-5">

                    {
                        state.requestFailed ? (
                            <div className="w-12/12">
                                <Transition
                                    show={true}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="-translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="-translate-x-full"
                                >
                                    <div className="bg-red-100 py-3 rounded-md float-right mb-3">
                                        <span className="left-0 inset-y-0 flex items-center align-middle text-xs px-3 text-red-600">
                                            <span className="">
                                                <i className="fad fa-lg fa-ban mr-1"></i>
                                            </span>

                                            <span className="pl-2 w-full">
                                                Failed to suspend ticket type, please try again later...
                                            </span>
                                        </span>
                                    </div>
                                </Transition>
                            </div>
                        ) : null
                    }

                    <div className="w-full">
                        {
                            state.status === 'rejected' ? (
                                <Error500 />
                            ) : state.status === 'fulfilled' ? (
                                <div>
                                    {
                                        state.type === null ? (
                                            <NoDataReactTable columns={columns} />
                                        ) : (
                                            <ReactTable columns={columns} data={state.type} />
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
            </div>
        </React.Fragment>
    )
}

export default TicketTypes