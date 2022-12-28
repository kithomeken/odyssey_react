import { Helmet } from "react-helmet"
import { toast } from "react-toastify"
import React, { useState } from "react"
import { Menu } from "@headlessui/react"
import { useParams } from "react-router-dom"

import Error500 from "../../errors/Error500"
import Crypto from "../../../encryption/Crypto"
import { ChangeAuthTeam } from "./ChangeAuthTeam"
import { useAppSelector } from "../../../store/hooks"
import HttpServices from "../../../services/HttpServices"
import Loading from "../../../components/layouts/Loading"
import DateFormating from "../../../lib/hooks/DateFormating"
import { ChangeInvitationEmail } from "./ChangeInvitationEmail"
import { ActionModal } from "../../../components/lib/ActionModal"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import { accountRoutes } from "../../../routes/settings/accountRoutes"
import emptySearchBox from '../../../assets/images/empty_results_returned.png'
import { DropDownWithButton } from "../../../components/lib/DropDownWithButton"
import { AGENT_LIST_API_ROUTE, AGENT_RESEND_EMAIL_INV_API_ROUTE, AGENT_RESTORE_ACCOUNT_API_ROUTE, AGENT_SUSPEND_ACCOUNT_API_ROUTE } from "../../../api/v1/api.AccountRoutes"
import { APPLICATION_NAME } from "../../../global/ConstantsRegistry"

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
            showChangeAuthTeam: false,
            showSuspendAccount: false,
        },
        postingForm: {
            suspendingAcc: false,
            restoringAcc: false,
        }
    })

    const authenticationState = useAppSelector(state => state.auth)
    const userAccountUuid = Crypto.decryptDataUsingAES256(authenticationState.uaid)

    // Header button
    const params = useParams();
    const pageTitle = "Agent Details"
    const AGNT_ACCOUNT_RT: any = (accountRoutes.find((routeName) => routeName.name === 'AGNT'))?.path

    const breadCrumb = [
        { linkItem: true, title: "Account Settings", url: AGNT_ACCOUNT_RT },
        { linkItem: true, title: "Agent Accounts", url: AGNT_ACCOUNT_RT },
        { linkItem: false, title: pageTitle },
    ]

    async function fetchAgentAccountDetailsApiCall() {
        try {
            let { data } = state
            let status = state.status
            const agentId = params.uuid
            const response: any = await HttpServices.httpGet(AGENT_LIST_API_ROUTE + '/' + agentId)

            data = response.data.payload
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

    const accountProfileColorCode = () => {
        let firstName = state.data.agent.first_name
        const letterHead = firstName.charAt(0)
        let colorCode = 'green'

        if (letterHead.match(new RegExp('[A-C]'))) {
            colorCode = 'red'
        } else if (letterHead.match(new RegExp('[D-F]'))) {
            colorCode = 'orange'
        } else if (letterHead.match(new RegExp('[G-J]'))) {
            colorCode = 'yellow'
        } else if (letterHead.match(new RegExp('[K-M]'))) {
            const profileColorRange = Array('green', 'emerald')
            colorCode = profileColorRange[Math.floor(Math.random() * profileColorRange.length)]
        } else if (letterHead.match(new RegExp('[N-Q]'))) {
            const profileColorRange = Array('teal', 'cyan')
            colorCode = profileColorRange[Math.floor(Math.random() * profileColorRange.length)]
        } else if (letterHead.match(new RegExp('[R-T]'))) {
            const profileColorRange = Array('blue', 'indigo')
            colorCode = profileColorRange[Math.floor(Math.random() * profileColorRange.length)]
        } else if (letterHead.match(new RegExp('[U-W]'))) {
            const profileColorRange = Array('purple', 'fuchsia')
            colorCode = profileColorRange[Math.floor(Math.random() * profileColorRange.length)]
        } else if (letterHead.match(new RegExp('[X-Z]'))) {
            colorCode = 'rose'
        }

        return colorCode
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
                    let toastText = dataResponse.error.message

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

    const showOrHideChangeAuthTeamModal = () => {
        let { modals } = state

        if (state.data.agent.is_active === 'Y') {
            modals.showChangeAuthTeam = !state.modals.showChangeAuthTeam

            setstate({
                ...state, modals
            })
        }
    }

    const updateAuthorizationTeamState = (authTeam: any) => {
        let { data }: any = state
        data.auth_team = authTeam

        setstate({
            ...state, data
        })
    }

    const showOrHideSuspendAccountModal = () => {
        let { modals } = state
        modals.showSuspendAccount = !state.modals.showSuspendAccount

        setstate({
            ...state, modals
        })
    }

    const suspendAgentAccountApiCall = async () => {
        let { data } = state
        let { postingForm } = state

        if (data.agent.is_active === 'Y' && !postingForm.suspendingAcc) {
            try {
                let formData = new FormData
                formData.append('uuid', params.uuid)

                postingForm.suspendingAcc = true
                setstate({
                    ...state, postingForm
                })

                const response: any = await HttpServices.httpPost(AGENT_SUSPEND_ACCOUNT_API_ROUTE, formData)
                const dataResponse = response.data

                if (response.data.success) {
                    let { data } = state
                    data.agent = response.data.payload.agent

                    setstate({
                        ...state, data
                    })
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

                showOrHideSuspendAccountModal()
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

            postingForm.suspendingAcc = false
            setstate({
                ...state, postingForm
            })
        }
    }

    const restoreAccountAccessApiCall = async () => {
        let { data } = state
        let { postingForm } = state

        if (data.agent.is_active === 'N' && !postingForm.restoringAcc) {
            try {
                let formData = new FormData
                formData.append('uuid', params.uuid)

                postingForm.restoringAcc = true
                setstate({
                    ...state, postingForm
                })

                const response: any = await HttpServices.httpPost(AGENT_RESTORE_ACCOUNT_API_ROUTE, formData)
                const dataResponse = response.data

                if (response.data.success) {
                    let { data } = state
                    data.agent = response.data.payload.agent

                    setstate({
                        ...state, data
                    })
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

            postingForm.restoringAcc = false
            setstate({
                ...state, postingForm
            })
        }
    }

    function renderDropDownModal() {
        let { data } = state

        if (data.agent.email_verified_at === null || data.agent.email_verified_at === undefined) {
            return (
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
                </>
            )
        } else {
            return (
                <>
                    {
                        userAccountUuid !== params.uuid ? (
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
                        ) : null
                    }
                </>
            )
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className={`px-12 py-3 w-full`}>
                <BreadCrumbs breadCrumbDetails={breadCrumb} />
            </div>

            <div className="w-full px-12 form-group">
                <div className="w-12/12">
                    <div className="mb-5">
                        {
                            state.status === 'rejected' ? (
                                <Error500 />
                            ) : state.status === 'fulfilled' ? (
                                <>
                                    <div className="w-full flex flow-row mb-3">
                                        <div className="w-6/12">
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-2xl leading-7 text-green-600 sm: mb-0">
                                                    {pageTitle}
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="w-6/12 flex flex-row-reverse">
                                            {
                                                state.data.agent.is_active === 'Y' ? (
                                                    <>
                                                        <DropDownWithButton
                                                            danger={true}
                                                            buttonTitle="Suspend"
                                                            iconProperty="fas fa-clipboard-user fa-lg"
                                                            onMainActionButton={showOrHideSuspendAccountModal}
                                                            menuItems={
                                                                <>
                                                                    {
                                                                        state.data.agent.is_active === 'Y' ? (
                                                                            renderDropDownModal()
                                                                        ) : null
                                                                    }

                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                className={classNames(
                                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                    'block px-4 py-2 text-sm text-left w-full'
                                                                                )}
                                                                            >
                                                                                Account Audit Trail
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>

                                                                    {
                                                                        state.data.agent.is_active === 'Y' ? null : (
                                                                            userAccountUuid !== params.uuid ? (
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            onClick={restoreAccountAccessApiCall}
                                                                                            className={classNames(
                                                                                                active ? 'bg-amber-100 text-amber-800' : 'text-amber-700',
                                                                                                'block px-4 py-2 text-sm text-left w-full'
                                                                                            )}
                                                                                        >
                                                                                            Restore Access
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            ) : null
                                                                        )
                                                                    }
                                                                </>
                                                            }
                                                        />

                                                        {
                                                            state.data.agent.email_verified_at === null || state.data.agent.email_verified_at === undefined ? (
                                                                <>
                                                                    {
                                                                        state.resendingInvitation ? (
                                                                            <button
                                                                                type="button"
                                                                                disabled
                                                                                className="inline-flex items-center px-3 py-1 mr-2 rounded border bg-white border-green-500 shadow-sm text-sm text-green-600 hover:border-green-700 hover:text-green-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-emerald-300 disabled:cursor-not-allowed">
                                                                                <span className="text-sm">
                                                                                    Sending...
                                                                                </span>

                                                                                <span className="ml-2 fad fa-spinner-third fa-lg fa-spin"></span>
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                type="button"
                                                                                onClick={resendEmailInvitationApiCall}
                                                                                className="inline-flex items-center px-3 py-1 mr-2 rounded border bg-white border-green-500 shadow-sm text-sm text-green-600 hover:border-green-700 hover:text-green-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-emerald-300">
                                                                                <span className="mr-2 fas fa-paper-plane"></span>

                                                                                <span className="text-sm">
                                                                                    Invitation
                                                                                </span>
                                                                            </button>
                                                                        )
                                                                    }
                                                                </>
                                                            ) : null
                                                        }
                                                    </>
                                                ) : null
                                            }
                                        </div>
                                    </div>

                                    <div className="flex flex-row">
                                        <div className="w-3/12 rounded pr-4 pt-2 pb-4">
                                            <div className="w-full flex flex-row">
                                                <div className={
                                                    classNames(
                                                        accountProfileColorCode() === 'orange' ? 'bg-orange-500' : null,
                                                        accountProfileColorCode() === 'red' ? 'bg-red-500' : null,
                                                        accountProfileColorCode() === 'yellow' ? 'bg-yellow-500' : null,
                                                        accountProfileColorCode() === 'green' ? 'bg-green-500' : null,
                                                        accountProfileColorCode() === 'emerald' ? 'bg-emerald-500' : null,
                                                        accountProfileColorCode() === 'teal' ? 'bg-teal-500' : null,
                                                        accountProfileColorCode() === 'cyan' ? 'bg-cyan-500' : null,
                                                        accountProfileColorCode() === 'blue' ? 'bg-blue-500' : null,
                                                        accountProfileColorCode() === 'indigo' ? 'bg-indigo-500' : null,
                                                        accountProfileColorCode() === 'purple' ? 'bg-purple-500' : null,
                                                        accountProfileColorCode() === 'fuchsia' ? 'bg-fuchsia-500' : null,
                                                        accountProfileColorCode() === 'rose' ? 'bg-rose-500' : null,
                                                        "h-20 w-20 flex flex-row align-middle items-center mb-4 rounded-full"
                                                    )
                                                }>
                                                    <p className="m-auto text-2xl text-white">
                                                        {getFirstLetterFromName()}
                                                    </p>
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

                                        <div className="w-9/12 pl-4 pt-2 pb-4 h-screen">
                                            {
                                                state.data.agent.is_active === 'N' ? (
                                                    <div className="form-group rounded border-0 bg-orange-100 py-4 px-4">
                                                        <div className="flex flex-row align-middle text-orange-600">
                                                            <i className="fas fa-exclamation-circle fa-lg mt-1 text-orange-600 flex-none"></i>

                                                            <div className="flex-auto ml-1">
                                                                <span className="text-sm pl-3 text-orange-600 block">
                                                                    This account has been suspended. User will not be able to collaborate with your team on {APPLICATION_NAME}.
                                                                </span>

                                                                <div className="flex flex-row align-middle items-center">
                                                                    {
                                                                        state.postingForm.restoringAcc ? (
                                                                            <button className="text-sm pl-3 text-blue-600 hover:underline cursor-not-allowed" disabled>
                                                                                Restoring Access
                                                                            </button>
                                                                        ) : (
                                                                            <button className="text-sm pl-3 text-blue-600 hover:underline" onClick={restoreAccountAccessApiCall}>
                                                                                Restore Access
                                                                            </button>
                                                                        )
                                                                    }

                                                                    <div className="mx-3 text-blue-800">|</div>

                                                                    <button className="text-sm text-blue-600 hover:underline" onClick={restoreAccountAccessApiCall}>
                                                                        Audit Trail
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null
                                            }

                                            <div className="w-full mb-5 mt-3">
                                                <div className="flex flex-row align-middle mb-3">
                                                    <div className="flex-auto">
                                                        <p className="text-xl text-emerald-600">
                                                            Authorization Team
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-slate-600">
                                                    Team that manages the user's permissions, restrictions and ticket access.
                                                </p>

                                                <div className="w-full pt-5 pb-3">
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
                                                            <div className="py-3 whitespace-wrap">
                                                                <span className="block text-gray-600 mb-1 text-sm">
                                                                    {state.data.auth_team.name}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="w-32 flex align-middle flex-row">
                                                            <button
                                                                type="button"
                                                                disabled={
                                                                    state.data.agent.is_active !== 'Y' ? true : false
                                                                }
                                                                onClick={showOrHideChangeAuthTeamModal}
                                                                className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-800 text-sm disabled:cursor-not-allowed disabled:opacity-70">
                                                                <span>
                                                                    <span className="left-0 inset-y-0 flex items-center">
                                                                        <span className="w-5 h-5">
                                                                            <i className="fas fa-exchange"></i>
                                                                        </span>

                                                                        <span className="ml-2">
                                                                            Change
                                                                        </span>
                                                                    </span>
                                                                </span>
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

                                        <ChangeAuthTeam
                                            uuid={params.uuid}
                                            team_name={state.data.auth_team.name}
                                            team_uuid={state.data.auth_team.uuid}
                                            show={state.modals.showChangeAuthTeam}
                                            showOrHide={showOrHideChangeAuthTeamModal}
                                            updateAuthorizationTeamState={updateAuthorizationTeamState}
                                            account_name={
                                                state.data.agent.email_verified_at === null || state.data.agent.email_verified_at === null ?
                                                    state.data.agent.email
                                                    :
                                                    state.data.agent.account_name
                                            }
                                        />

                                        <ActionModal
                                            iconClass="fad fa-trash-alt fa-lg"
                                            title="Suspend Account"
                                            show={state.modals.showSuspendAccount}
                                            details="User will not be able to access tickets or collaborate with your team. The user's past contributions will however remain"
                                            showOrHide={showOrHideSuspendAccountModal}
                                            actionEvent={suspendAgentAccountApiCall}
                                            isPostingForm={state.postingForm.suspendingAcc}
                                            actionButton={{
                                                before: "Suspend",
                                                after: "Suspending"
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="pt-10">
                                    <Loading />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}