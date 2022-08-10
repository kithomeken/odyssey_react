import { Menu } from "@headlessui/react"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import { AGENT_DETAILS_API_ROUTE } from "../../../api/ApiRoutes"
import Loading from "../../../components/layouts/Loading"
import {DropDown} from "../../../components/lib/DropDown"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import HeaderParagraph from "../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG, APPLICATION_NAME } from "../../../global/ConstantsRegistry"
import HttpServices from "../../../services/HttpServices"
import Error500 from "../../errors/Error500"
import { ChangeInvitationEmail } from "./ChangeInvitationEmail"

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
        let {modals} = state
        modals.showChangeEmail = !state.modals.showChangeEmail

        setstate({
            ...state, modals
        })
    }

    const updateAgentEmail = (emailAddr: any) => {
        let {data}: any = state
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
                                                    <div className="w-8/12">
                                                        <p className="text-2xl form-group text-gray-700 w-7/12">
                                                            {state.data.agent.email}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-row align-middle w-8/12">
                                                        <div className="w-14 h-14 flex align-middle bg-emerald-600 mr-4 rounded-full">
                                                            <p className="m-auto text-2xl text-white">
                                                                {getFirstLetterFromName()}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-2xl mb-1">
                                                                {state.data.agent.first_name} {state.data.agent.last_name}
                                                            </p>

                                                            <p className="text-sm form-group text-gray-500 w-7/12">
                                                                {state.data.agent.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            <div className="relative inline-block text-left w-4/12">
                                                {
                                                    state.data.agent.email_verified_at === null || state.data.agent.email_verified_at === undefined ? (
                                                        <DropDown
                                                            iconProperty="fas fa-paper-plane"
                                                            buttonTitle="Resend Invitation"
                                                            onMainActionButton={onClickDropDownHandler}
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
                                                                                Change Auth Team
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
                                                    ) : (
                                                        <DropDown
                                                            iconProperty="fad fa-pen"
                                                            buttonTitle="Edit"
                                                            onMainActionButton={onClickDropDownHandler}
                                                            menuItems={
                                                                <>
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <a
                                                                                href="#"
                                                                                className={classNames(
                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                    'block px-4 py-2 text-sm'
                                                                                )}
                                                                            >
                                                                                Change Auth Team
                                                                            </a>
                                                                        )}
                                                                    </Menu.Item>

                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <a
                                                                                href="#"
                                                                                className={classNames(
                                                                                    active ? 'bg-red-100 text-red-900' : 'text-red-700',
                                                                                    'block px-4 py-2 text-sm'
                                                                                )}
                                                                            >
                                                                                Decommission Account
                                                                            </a>
                                                                        )}
                                                                    </Menu.Item>
                                                                </>
                                                            }
                                                        />
                                                    )
                                                }
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