import { Menu } from "@headlessui/react"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"

import { AGENT_DETAILS_API_ROUTE } from "../../../api/ApiRoutes"
import Loading from "../../../components/layouts/Loading"
import { DropDown } from "../../../components/lib/DropDown"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import HeaderParagraph from "../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG, APPLICATION_NAME } from "../../../global/ConstantsRegistry"
import DateFormating from "../../../lib/hooks/DateFormating"
import HttpServices from "../../../services/HttpServices"
import Error500 from "../../errors/Error500"
import { ChangeInvitationEmail } from "./ChangeInvitationEmail"
import emptySearchBox from '../../../assets/images/empty_results_returned.png'
import TableContentFormatting from "../../../lib/hooks/TableContentFormating"

export const AgentDetails = () => {
    const [state, setstate] = useState({
        data: null,
        show: false,
        status: 'pending',
        requestFailed: '',
        allowInvitationChange: null,
        modals: {
            showChangeEmail: false,

        }
    })

    // Header button
    const params = useParams();
    const pageTitle = "Agent Details"
    const showButton = false

    const breadCrumb = [
        { linkItem: true, title: "Account Settings", url: "" },
        { linkItem: true, title: "Agent Accounts", url: "" },
        { linkItem: false, title: pageTitle },
    ]

    async function fetchAgentAccountDetailsApiCall(hideModal = 'Y') {
        try {
            let { data } = state
            let status = state.status
            const agentId = params.uuid
            const response: any = await HttpServices.httpGet(AGENT_DETAILS_API_ROUTE + '/' + agentId)

            data = response.data.data
            status = 'fulfilled'

            setstate({
                ...state, status, data
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
        fetchAgentAccountDetailsApiCall();
    }, []);

    const getFirstLetterFromName = () => {
        let firstName = state.data.agent.first_name
        return firstName.charAt(0)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const onClickDropDownHandler = () => {
        setstate({
            ...state, show: !state.show
        })
    }

    const showOrHideChangeInvitationEmailModal = () => {
        let { modals } = state
        modals.showChangeEmail = !state.modals.showChangeEmail

        setstate({
            ...state, modals
        })
    }

    const updateAgentEmail = (emailAddr: any) => {
        let { data }: any = state
        data.agent.email = emailAddr

        setstate({
            ...state, data
        })
    }

    const updateAllowChangeInvitation = (isAllowed: any) => {
        setstate({
            ...state, allowInvitationChange: isAllowed
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
                />
            </div>

            <div className="w-full px-12 form-group">
                <div className="w-12/12">
                    <div className="mb-5">
                        {
                            state.status === 'rejected' ? (
                                <Error500 />
                            ) : state.status === 'fulfilled' ? (
                                <div>
                                    <div className="w-8/12 pt-2 pb-4 h-screen">
                                        <div className="w-full flex flex-row align-middle mb-3">
                                            {
                                                state.data.agent.email_verified_at === null || state.data.agent.email_verified_at === undefined ? (
                                                    <div className="w-full">
                                                        <div className="w-full flex flex-row align-middle mb-3">
                                                            <div className="flex flex-row align-middle flex-auto">
                                                                <div className="w-10 h-10 flex align-middle bg-emerald-600 mr-3 rounded-full">
                                                                    <p className="m-auto text-2xl text-white">
                                                                        {getFirstLetterFromName()}
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <p className="text-2xl text-slate-600">
                                                                        {state.data.agent.email}
                                                                    </p>

                                                                    <span className="block text-slate-500 text-sm">
                                                                        User invited on <DateFormating dateString={state.data.agent.created_at} />
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="relative inline-block text-left w-4/12">
                                                                <div className="flex flex-row-reverse align-middle">
                                                                    <button type="button" className="w-full inline-flex justify-center text-sm rounded border border-gray-400 shadow-sm px-2 py-1-5 bg-0-600 text-gray-500 sm:w-auto sm:text-sm">
                                                                        <span>
                                                                            <span className="left-0 inset-y-0 flex items-center">
                                                                                <span className="w-5 h-5">
                                                                                    <i className="fad fa-paper-plane"></i>
                                                                                </span>

                                                                                <span className="ml-1">
                                                                                    Resend Invitation
                                                                                </span>
                                                                            </span>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="mb-5 rounded py-3 px-4 bg-sky-50">
                                                            <div className="flex items-center align-middle text-sky-600 p-1">
                                                                <i className="fad fa-exclamation-circle fa-lg"></i>
                                                                <span className="text-sm pl-3 text-sky-600">
                                                                    This agent account has not been verified.
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <hr />
                                                    </div>
                                                ) : (
                                                    <div className="w-full">
                                                        <div className="w-full flex flex-row align-middle mb-3">
                                                            <div className="flex flex-row align-middle flex-auto">
                                                                <div className="w-10 h-10 flex align-middle bg-emerald-600 mr-3 rounded-full">
                                                                    <p className="m-auto text-2xl text-white">
                                                                        {getFirstLetterFromName()}
                                                                    </p>
                                                                </div>

                                                                <div>
                                                                    <p className="text-2xl text-slate-600">
                                                                        {state.data.agent.first_name} {state.data.agent.last_name}
                                                                    </p>

                                                                    <span className="block text-slate-500 text-sm">
                                                                        {state.data.agent.email}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="relative inline-block text-left w-4/12">
                                                                <div className="flex flex-row-reverse align-middle">
                                                                    <button type="button" className="w-full inline-flex justify-center text-sm rounded border border-gray-400 shadow-sm px-2 py-1-5 bg-0-600 text-gray-500 sm:w-auto sm:text-sm">
                                                                        <span>
                                                                            <span className="left-0 inset-y-0 flex items-center">
                                                                                <span className="w-5 h-5">
                                                                                    <i className="fad fa-pen"></i>
                                                                                </span>

                                                                                <span className="ml-1">
                                                                                    Edit Account
                                                                                </span>
                                                                            </span>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <hr />
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <div className="w-full mb-5 mt-3">
                                            <div className="flex flex-row align-middle">
                                                <div className="flex-auto">
                                                    <p className="text-xl text-slate-600">
                                                        Authorization Team
                                                    </p>
                                                </div>

                                                <button type="button" className="items-center flex-none px-3 py-1 border-2 bg-emerald-500 border-emerald-500 rounded shadow-sm text-sm text-white hover:border-emerald-600 hover:bg-emerald-600 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-emerald-400">
                                                    <span>
                                                        <span className="left-0 inset-y-0 flex items-center">
                                                            <span className="w-5 h-5">
                                                                <i className="fas fa-exchange"></i>
                                                            </span>

                                                            <span className="ml-1">
                                                                Change Team
                                                            </span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>

                                            <p className="text-sm text-slate-600">
                                                Team that manages the user's privileges, permissions, restrictions and ticket access.
                                            </p>

                                            <div className="w-full py-5">
                                                <div className="flex flex-row border-b pb-2 align-middle">
                                                    <div className="flex-auto">
                                                        <span className="py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">
                                                            Team
                                                        </span>
                                                    </div>

                                                    <div className="w-32">
                                                        <span className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">
                                                            -
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row border-y divide-gray-200 align-middle">
                                                    <div className="flex-auto">
                                                        <td className="py-2 whitespace-wrap">
                                                            <span className="block text-emerald-600 mb-1">
                                                                {state.data.auth_team.name}
                                                            </span>

                                                            <span className="block text-slate-500 mb-1 text-sm">
                                                                <TableContentFormatting
                                                                    content={state.data.auth_team.description}
                                                                />
                                                            </span>
                                                        </td>
                                                    </div>

                                                    <div className="w-32 flex align-middle flex-row">
                                                        <button className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-900 text-sm">
                                                            Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="w-full mb-5 mt-3">
                                            <div className="flex flex-row align-middle">
                                                <div className="flex-auto">
                                                    <p className="text-xl text-slate-600">
                                                        Projects
                                                    </p>
                                                </div>

                                                <button type="button" className="items-center flex-none px-3 py-1 border-2 bg-emerald-500 border-emerald-500 rounded shadow-sm text-sm text-white hover:border-emerald-600 hover:bg-emerald-600 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-emerald-400">
                                                    <span>
                                                        <span className="left-0 inset-y-0 flex items-center">
                                                            <span className="w-5 h-5">
                                                                <i className="fas fa-plus"></i>
                                                            </span>

                                                            <span className="ml-1">
                                                                Add To Project
                                                            </span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>

                                            <p className="text-sm text-slate-600">
                                                Agent's participation in the organization's projects
                                            </p>

                                            <div className="w-full">
                                                <div className="w-6/12 py-5 m-auto">
                                                    <img src={emptySearchBox} alt="broken_robot" width="100px" className="block text-center m-auto" />

                                                    <p className="text-sm text-center mb-2 text-slate-600">
                                                        No projects found
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <ChangeInvitationEmail
                                        uuid={params.uuid}
                                        email={state.data.agent.email}
                                        updateAgentEmail={updateAgentEmail}
                                        show={state.modals.showChangeEmail}
                                        showOrHide={showOrHideChangeInvitationEmailModal}
                                    />
                                </div>
                            ) : (
                                <Loading />
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}