import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { AGENT_LIST_API_ROUTE } from "../../../api/ApiRoutes"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import HeaderParagraph from "../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG, APPLICATION_NAME } from "../../../global/ConstantsRegistry"
import DateFormating from "../../../lib/hooks/DateFormating"
import NoDataReactTable from "../../../lib/hooks/NoDataReactTable"
import ReactTable from "../../../lib/hooks/ReactTable"
import HttpServices from "../../../services/HttpServices"
import Error500 from "../../errors/Error500"
import { InviteAgents } from "./InviteAgents"

export const AgentAccounts = () => {
    const [state, setstate] = useState({
        data: null,
        show: false,
        status: 'pending',
        requestFailed: '',
    })

    // Header button
    const pageTitle = "Agent Accounts"
    const showButton = true
    const actionButton = true
    const buttonTitle = "Invite Team"
    const buttonIcon = true
    const iconType = "fas fa-plus-circle"

    const breadCrumb = [
        { linkItem: true, title: "Account Settings", url: "" },
        { linkItem: false, title: pageTitle },
    ]

    const showOrHideModal = () => {
        setstate({
            ...state, show: !state.show
        })
    }

    async function fetchAllAgentsApiCall(hideModal = 'Y') {
        try {
            let { data } = state
            let status = state.status
            const response: any = await HttpServices.httpGet(AGENT_LIST_API_ROUTE)

            data = response.data.data
            status = 'fulfilled'

            setstate({
                ...state, status, data
            })
        } catch (e) {
            console.warn(e);
            let status = state.status            
            status = 'rejected'

            setstate({
                ...state, status
            })
        } finally {
            // Do nothing            
        }
    }

    React.useEffect(() => {
        fetchAllAgentsApiCall();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: (data: { first_name: any, last_name: any, email_verified_at: any }) => (
                    <span>
                        <span className="block text-black text-sm py-1">
                            {
                                data.email_verified_at === null || data.email_verified_at === undefined ? (
                                    <span>-</span>
                                ) : (
                                    <>
                                        {data.first_name} {data.last_name}
                                    </>
                                )
                            }
                        </span>
                    </span>
                ),
            },
            {
                Header: 'Email',
                accessor: (data: { email: any}) => (
                    <span>
                        <span className="block text-gray-500 mb-0 text-sm">
                            {data.email}
                        </span>
                    </span>
                ),
            },
            {
                Header: 'Authorization Team',
                accessor: (data: { name: any }) => (
                    <span className="block text-gray-500 mb-0 text-sm">
                        <span className="block text-gray-500 mb-0 text-sm">
                            {data.name}
                        </span>
                    </span>
                )
            },
            {
                Header: 'Status',
                accessor: (data: { is_active: any, email_verified_at: any }) => (
                    data.email_verified_at === null || data.email_verified_at === undefined ? (
                        <span className="bg-fuchsia-100 text-fuchsia-700 mb-0 text-xs py-1 px-2 rounded">
                            Invited
                        </span>
                    ) : (
                        data.is_active === 'Y' ? (
                            <span className="bg-green-100 text-green-600 mb-0 text-xs py-1 px-2 rounded">
                                Active
                            </span>
                        ) : (
                            <span className="text-red-600 bg-red-100 mb-0 text-xs py-1 px-2 rounded">
                                Suspended
                            </span>
                        )
                    )
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
                    actionButton={actionButton}
                    actionEvent={showOrHideModal}
                    buttonTitle={buttonTitle}
                    buttonIcon={buttonIcon}
                    iconType={iconType}
                />

                <HeaderParagraph title={`Master accounts control the administrative aspects of ${APPLICATION_NAME}, like account management, authorizations, helpdesk features among others, and furthermore help pay the bills at the end of the month (someone's got to do it).`} />
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

            <InviteAgents
                show={state.show}
                showOrHideModal={showOrHideModal}
            />
        </React.Fragment>
    )
}