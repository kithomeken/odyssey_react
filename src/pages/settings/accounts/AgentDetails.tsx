import { Menu } from "@headlessui/react"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"

import { AGENT_DETAILS_API_ROUTE, AGENT_RESEND_EMAIL_INV_API_ROUTE } from "../../../api/ApiRoutes"
import Loading from "../../../components/layouts/Loading"
import { DropDown } from "../../../components/lib/DropDown"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import { HEADER_SECTION_BG } from "../../../global/ConstantsRegistry"
import DateFormating from "../../../lib/hooks/DateFormating"
import HttpServices from "../../../services/HttpServices"
import Error500 from "../../errors/Error500"
import { ChangeInvitationEmail } from "./ChangeInvitationEmail"
import emptySearchBox from '../../../assets/images/empty_results_returned.png'
import { toast } from "react-toastify"

export const AgentDetails = () => {
    const [state, setstate] = useState({
        data: null,
        show: false,
        status: 'pending',
        requestFailed: '',
        resendingInvitation: false,
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

    const resendEmailInvitationApiCall = async () => {
        let { data } = state

        if (data.agent.is_active === 'Y') {
            setstate({
                ...state, resendingInvitation: true
            })

            /* 
            * TODO: Add functionality for checking on the number of 
            * invitations sent in a 12 hour period.
            * Should also check if the job failed and report to master
            */

            try {
                let formData = new FormData
                formData.append('uuid', params.uuid)

                const response: any = await HttpServices.httpPost(AGENT_RESEND_EMAIL_INV_API_ROUTE, formData)
                const dataResponse = response.data

                if (response.data.success) {
                    let toastText = 'Email invitation sent to agent'

                    toast.success(toastText, {
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    let toastText = dataResponse.message

                    toast.error(toastText, {
                        position: "top-right",
                        autoClose: 7000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } catch (error) {
                let toastText = 'Something went wrong. Could not complete action'

                toast.error(toastText, {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            setstate({
                ...state, resendingInvitation: false
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
                />
            </div>

            <div className="w-full px-12 form-group">
                <div className="w-12/12">
                    <div className="mb-5">
                        {
                            state.status === 'rejected' ? (
                                <Error500 />
                            ) : state.status === 'fulfilled' ? (
                                <div className="flex flex-row">
                                    <div className="w-3/12 rounded pr-4 pt-2 pb-4">
                                        <div className="w-full flex flex-row">
                                            <div className="h-16 w-16 flex flex-row align-middle bg-emerald-600 mb-4 rounded-full">
                                                <p className="m-auto text-2xl text-white">
                                                    {getFirstLetterFromName()}
                                                </p>
                                            </div>

                                            <div className="flex-auto h-10">
                                                <DropDown
                                                    menuItems={
                                                        <>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <>
                                                                        {
                                                                            state.resendingInvitation ? (
                                                                                <button
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                        'block px-4 py-2 text-sm text-left w-full'
                                                                                    )}
                                                                                >
                                                                                    <span className="left-0 inset-y-0 flex items-center">
                                                                                        <span className="pr-2">
                                                                                            Resending...
                                                                                        </span>

                                                                                        <span className="w-5 h-5 text-emerald-600">
                                                                                            <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                                                        </span>
                                                                                    </span>
                                                                                </button>
                                                                            ) : (
                                                                                <button
                                                                                    onClick={resendEmailInvitationApiCall}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                        'block px-4 py-2 text-sm text-left w-full'
                                                                                    )}
                                                                                >
                                                                                    Resend Invitation
                                                                                </button>
                                                                            )
                                                                        }
                                                                    </>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={showOrHideChangeInvitationEmailModal}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm text-left w-full'
                                                                        )}
                                                                    >
                                                                        Change Invitation Email
                                                                    </button>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm text-left w-full'
                                                                        )}
                                                                    >
                                                                        Suggest Account Changes
                                                                    </button>
                                                                )}
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        className={classNames(
                                                                            active ? 'bg-red-100 text-red-900' : 'text-red-700',
                                                                            'block px-4 py-2 text-sm text-left w-full'
                                                                        )}
                                                                    >
                                                                        Decommission Account
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </>
                                                    }
                                                />
                                            </div>
                                        </div>


                                        <div className="mb-4">
                                            <p className="text-sm text-slate-500 mb-0">
                                                Account Name
                                            </p>

                                            {
                                                state.data.agent.email_verified_at === null || state.data.agent.email_verified_at === undefined ? (
                                                    <div className="flex items-center align-middle text-amber-700 px-0 py-3">
                                                        <i className="fad fa-exclamation-circle fa-lg"></i>
                                                        <span className="text-xs pl-3 text-amber-700">
                                                            Account has not been verified.
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-slate-700 mb-0 flex fle-row align-middle">
                                                        {state.data.agent.first_name} {state.data.agent.last_name}
                                                    </p>
                                                )
                                            }
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm text-slate-500 mb-0">
                                                E-mail Address
                                            </p>

                                            <p className="text-sm text-slate-700">
                                                {state.data.agent.email}
                                            </p>
                                        </div>

                                        <hr />

                                        <span className="block text-slate-500 text-xs my-4">
                                            {
                                                state.data.agent.email_verified_at === null || state.data.agent.email_verified_at === undefined ? (
                                                    <>
                                                        User invited on
                                                        <span className="text-slate-700 ml-1">
                                                            <DateFormating dateString={state.data.agent.created_at} />
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        Last active on
                                                        <span className="text-slate-700 ml-1">
                                                            <DateFormating dateString={state.data.agent.created_at} />
                                                        </span>
                                                    </>
                                                )
                                            }
                                        </span>

                                        {
                                            state.data.agent.account_type === 'M' ? (
                                                <span className="bg-fuchsia-700 text-white mb-0 text-xs py-1 px-2 rounded">
                                                    Master Account
                                                </span>
                                            ) : null
                                        }
                                    </div>



                                    <div className="w-8/12 pl-4 pt-2 pb-4 h-screen">
                                        {/* <div className="w-full h-10">
                                            <DropDown
                                                iconProperty="fad fa-paper-plane"
                                                buttonTitle="Resend Invitation"
                                                onMainActionButton={undefined}
                                                menuItems={
                                                    <>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={showOrHideChangeInvitationEmailModal}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm text-left w-full'
                                                                    )}
                                                                >
                                                                    Change Invitation Email
                                                                </button>
                                                            )}
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm text-left w-full'
                                                                    )}
                                                                >
                                                                    Suggest Account Changes
                                                                </button>
                                                            )}
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={classNames(
                                                                        active ? 'bg-red-100 text-red-900' : 'text-red-700',
                                                                        'block px-4 py-2 text-sm text-left w-full'
                                                                    )}
                                                                >
                                                                    Decommission Account
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </>
                                                }
                                            />
                                        </div> */}

                                        <div className="w-full mb-5 mt-3">
                                            <div className="flex flex-row align-middle mb-3">
                                                <div className="flex-auto">
                                                    <p className="text-xl text-emerald-600">
                                                        Authorization Team
                                                    </p>
                                                </div>

                                                <button type="button" className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-800 text-sm">
                                                    <span>
                                                        <span className="left-0 inset-y-0 flex items-center">
                                                            <span className="w-5 h-5">
                                                                <i className="fas fa-exchange"></i>
                                                            </span>

                                                            <span className="ml-2">
                                                                Change Team
                                                            </span>
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>

                                            <p className="text-sm text-slate-600">
                                                Team that manages the user's permissions, restrictions and ticket access.
                                            </p>

                                            <div className="w-full pt-5">
                                                <div className="flex flex-row border-b pb-2 align-middle">
                                                    <div className="flex-auto">
                                                        <span className="py-3 text-left text-xs text-slate-600 uppercase font-normal tracking-wider">
                                                            Team
                                                        </span>
                                                    </div>

                                                    <div className="w-32">
                                                        <span className="px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider">
                                                            -
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row border-t border-b-2 divide-gray-200 align-middle">
                                                    <div className="flex-auto">
                                                        <td className="py-2 whitespace-wrap">
                                                            <span className="block text-blue-600 mb-1 text-sm">
                                                                {state.data.auth_team.name}
                                                            </span>

                                                            <span className="block text-slate-500 mb-1 text-xs">
                                                                {state.data.auth_team.description}
                                                            </span>
                                                        </td>
                                                    </div>

                                                    <div className="w-32 flex align-middle flex-row">
                                                        <button className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-800 text-sm">
                                                            Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="w-full mb-5 mt-3">
                                            <div className="flex flex-row align-middle mb-3">
                                                <div className="flex-auto">
                                                    <p className="text-xl text-emerald-600">
                                                        Projects
                                                    </p>
                                                </div>

                                                <button type="button" className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-800 text-sm">
                                                    <span>
                                                        <span className="left-0 inset-y-0 flex flex-row align-middle">
                                                            <span className="w-5 h-5">
                                                                <i className="fas fa-plus"></i>
                                                            </span>

                                                            <span className="ml-2">
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