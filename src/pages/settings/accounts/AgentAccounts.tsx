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

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    async function fetchAllAgentsApiCall() {
        try {
            let { data } = state
            let status = state.status
            const response: any = await HttpServices.httpGet(AGENT_LIST_API_ROUTE)

            data = response.data.data
            status = 'fulfilled'

            setstate({
                ...state, status, data, show: false
            })
        } catch (e) {
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

    const getFirstLetterFromName = (accountName: any) => {
        return accountName.charAt(0)
    }

    const accountProfileColorCode = (accountName: any) => {
        const letterHead = getFirstLetterFromName(accountName)
        let colorCode = 'green'

        if (letterHead.match(new RegExp('[A-C]'))) {
            colorCode = 'red'
        } else if (letterHead.match(new RegExp('[D-F]'))) {
            colorCode = 'orange'
        } else if (letterHead.match(new RegExp('[G-J]'))) {
            colorCode = 'yellow'
        } else if (letterHead.match(new RegExp('[K-M]'))) {
            colorCode = 'green'
        } else if (letterHead.match(new RegExp('[N-Q]'))) {
            colorCode = 'cyan'
        } else if (letterHead.match(new RegExp('[R-T]'))) {
            colorCode = 'blue'
        } else if (letterHead.match(new RegExp('[U-W]'))) {
            colorCode = 'purple'
        } else if (letterHead.match(new RegExp('[X-Z]'))) {
            colorCode = 'rose'
        }

        return colorCode
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: (data: { first_name: any, last_name: any, email_verified_at: any }) => (
                    <span className="flex flex-row align-middle items-center">
                        <div className={
                            classNames(
                                accountProfileColorCode(data.first_name) === 'red' ? 'bg-red-500' : null,
                                accountProfileColorCode(data.first_name) === 'orange' ? 'bg-orange-500' : null,
                                accountProfileColorCode(data.first_name) === 'yellow' ? 'bg-yellow-500' : null,
                                accountProfileColorCode(data.first_name) === 'green' ? 'bg-green-500' : null,
                                accountProfileColorCode(data.first_name) === 'emerald' ? 'bg-emerald-500' : null,
                                accountProfileColorCode(data.first_name) === 'teal' ? 'bg-teal-500' : null,
                                accountProfileColorCode(data.first_name) === 'cyan' ? 'bg-cyan-500' : null,
                                accountProfileColorCode(data.first_name) === 'blue' ? 'bg-blue-500' : null,
                                accountProfileColorCode(data.first_name) === 'indigo' ? 'bg-indigo-500' : null,
                                accountProfileColorCode(data.first_name) === 'purple' ? 'bg-purple-500' : null,
                                accountProfileColorCode(data.first_name) === 'fuchsia' ? 'bg-fuchsia-500' : null,
                                accountProfileColorCode(data.first_name) === 'rose' ? 'bg-rose-500' : null,
                                "w-7 h-7 rounded-full mr-3 flex flex-row align-middle"
                            )
                        }>
                            <p className="m-auto text-sm text-white">
                                {getFirstLetterFromName(data.first_name)}
                            </p>
                        </div>

                        <span className="block text-black text-sm py-1">
                            {
                                data.email_verified_at === null || data.email_verified_at === undefined ? (
                                    <span>
                                        {data.first_name}
                                    </span>
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
                accessor: (data: { email: any }) => (
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
                    data.is_active !== 'Y' ? (
                        <span className="text-red-600 bg-red-100 mb-0 text-xs py-1 px-2 rounded">
                            Suspended
                        </span>
                    ) : (
                        data.email_verified_at === null || data.email_verified_at === undefined ? (
                            <span className="bg-fuchsia-100 text-fuchsia-700 mb-0 text-xs py-1 px-2 rounded">
                                Invited
                            </span>
                        ) : (
                            <span className="bg-emerald-100 text-emerald-600 mb-0 text-xs py-1 px-2 rounded">
                                Active
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
                                <span className="fad text-emerald-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                            </div>
                        )
                    }
                </div>
            </div>

            <InviteAgents
                show={state.show}
                showOrHideModal={showOrHideModal}
                reloadAgentsDatatable={fetchAllAgentsApiCall}
            />
        </React.Fragment>
    )
}