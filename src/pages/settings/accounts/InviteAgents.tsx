import React, { FC, useState } from "react"

import { toast } from "react-toastify"
import HttpServices from "../../../services/HttpServices"
import ErrorBanner from "../../../components/layouts/ErrorBanner"
import { DynamicModal } from "../../../components/lib/DynamicModal"
import { AGENT_INVITATION_API_ROUTE } from "../../../api/v1/api.AccountRoutes"
import team_collaoration_image from '../../../assets/images/team_collaboration.png'

interface Props {
    show: any,
    showOrHideModal: any,
    reloadAgentsDatatable: any,
}

export const InviteAgents: FC<Props> = ({ show, showOrHideModal, reloadAgentsDatatable }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        requestSucceeded: false,
        disableSubmitBtn: true,
        agents: [
            { email: '' },
        ],
        agentErrors: [
            { email: '' },
        ],
    })

    function agentInvitationValidation() {
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { agents } = state
            let { agentErrors } = state

            // Check if current invitations have errors
            let invitations = []
            let hasErrors = false
            let hasDuplicates = false

            Object.keys(agents).forEach(function (key) {
                const agentInvitation = agents[key].email

                if (invitations.includes(agentInvitation)) {
                    hasDuplicates = true
                    agentErrors[key].email = 'Duplicate email in the list of invitations'
                } else {
                    invitations.push(agentInvitation)
                }

                if (agentInvitation.length < 1) {
                    hasErrors = true
                    agentErrors[key].email = 'Please provide an email address'
                } else {
                    let lastAtPos = agentInvitation.lastIndexOf('@')
                    let lastDotPos = agentInvitation.lastIndexOf('.')

                    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && agentInvitation.indexOf('@@') === -1 && lastDotPos > 2 && (agentInvitation.length - lastDotPos) > 2)) {
                        agentErrors[key].email = 'Please provide a valid email address'
                        hasErrors = true
                    }
                }

                setstate({
                    ...state, agentErrors
                })
            })

            return {
                'hasErrors': hasErrors,
                'hasDuplicates': hasDuplicates,
            }
        }
    }

    const addAgentInvitationHandler = () => {
        let { agents } = state
        let { agentErrors } = state
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            const invitationValidation = agentInvitationValidation()

            if (invitationValidation.hasDuplicates) {
                let toastText = 'Clear the duplicate errors before adding another invitation'
                toast.error(toastText, {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                return
            }

            if (invitationValidation.hasErrors) {
                let toastText = 'Clear current errors before adding another invitation'
                toast.error(toastText, {
                    position: "top-right",
                    autoClose: 7000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                return
            }

            if (agents.length < 4) {
                agents = state.agents.concat([{
                    email: '',
                }])

                agentErrors = state.agentErrors.concat([{
                    email: '',
                }])

                setstate({
                    ...state, agents, agentErrors
                })
            }
        }
    }

    const onInviteAgentChangeHandler = (e: any, index: any) => {
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { agentErrors } = state
            let { agents }: any = state

            const newInvitationList = state.agents.map((contact, mapIndex) => {
                if (index !== mapIndex) return contact

                switch (e.target.name) {
                    case 'email':
                        agentErrors[index].email = ''
                        return { ...contact, email: e.target.value }
                }
            })

            agents = newInvitationList
            setstate({
                ...state, agents, agentErrors
            })
        }
    }

    const onInviteAgentBlur = (e: any, index: any) => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { agentErrors } = state

            if (e.target.value.length < 1) {
                agentErrors[index].email = 'Please provide an email address'
            } else {
                let lastAtPos = e.target.value.lastIndexOf('@')
                let lastDotPos = e.target.value.lastIndexOf('.')

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && e.target.value.indexOf('@@') === -1 && lastDotPos > 2 && (e.target.value.length - lastDotPos) > 2)) {
                    agentErrors[index].email = 'Please provide a valid email address'
                } else {
                    agentErrors[index].email = ''
                }
            }

            setstate({
                ...state, agentErrors,
            })
        }
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        const { isPostingForm } = state

        if (!isPostingForm) {
            let {agentErrors} = state
            let invitationHasErrors = false
            const invitationValidation = agentInvitationValidation()

            Object.keys(agentErrors).forEach(function (key) {
                const errorInInvitation = agentErrors[key].email

                if (errorInInvitation.length > 1) {
                    invitationHasErrors = true
                }
            })

            if (invitationHasErrors) {
                return
            }

            if (invitationValidation.hasDuplicates) {
                return
            }

            if (invitationValidation.hasErrors) {
                return
            }

            setstate({
                ...state, isPostingForm: true
            })

            inviteAgentsApiCall()
        }
    }

    const inviteAgentsApiCall = async () => {
        let { agents } = state
        let { agentErrors } = state
        let { requestFailed } = state
        let { isPostingForm } = state
        let { requestSucceeded } = state

        try {
            let formData = new FormData

            Object.keys(agents).forEach(function (key) {
                formData.append("email[]", agents[key].email)
            })

            const response: any = await HttpServices.httpPost(AGENT_INVITATION_API_ROUTE, formData)
            
            if (response.data.success) {
                agents.splice(1, (agents.length))
                agentErrors.splice(1, (agentErrors.length))
                
                agents[0].email = ''
                setstate({
                    ...state, agents
                })

                reloadAgentsDatatable()
                showOrHideModal()
            } else {
                let errorMessages = response.data.message
                let messageKeys = Object.keys(errorMessages)

                messageKeys.map((message, key) => {
                    let keyLength = message.length
                    let keyItem = message.slice(6, keyLength)
                    
                    let errorMessage = errorMessages[message]
                    errorMessage[0] = errorMessage[0].replace(message, 'email')
                    errorMessage[0] = errorMessage[0].replace('The', 'This')

                    let {agentErrors} = state
                    agentErrors[keyItem].email = errorMessage[0]
                    
                    setstate({
                        ...state, agentErrors
                    })
                })
            }   
        } catch (error) {
            requestFailed = true
        }

        isPostingForm = false

        setstate({
            ...state, requestFailed, isPostingForm, requestSucceeded
        })
    }

    return (
        <React.Fragment>
            <DynamicModal
                size={"3xl"}
                show={show}
                actionButton={{
                    before: "Send Invitation",
                    after: "Sending..."
                }}
                title="Team Invitation"
                showOrHideModal={showOrHideModal}
                isPostingForm={state.isPostingForm}
                onFormSubmitHandler={onFormSubmitHandler}
                // description="Invite your team and watch amazing things happen when they come together"
                formComponents={
                    <>
                        <div className="w-full">
                            {
                                state.requestFailed ? (
                                    <div className="mb-3">
                                        <ErrorBanner message="Failed to send agent invitations. Please try again later..." />
                                    </div>
                                ) : null
                            }

                            <div className="flex flex-row align-middle mb-3">
                                <div className="w-7/12 py-5 pr-4">
                                    <img src={team_collaoration_image} alt="team_collaboration" className="block text-center m-auto" />
                                </div>

                                <div className="w-5/12">
                                    <p className="text-sm mb-3 text-gray-500">
                                        Invite your team and watch amazing things happen when they come together
                                    </p>

                                    <div className="w-full p-3">
                                        {
                                            state.agents.map((email: any, index: any) => {
                                                return (
                                                    <div key={index}>
                                                        <div className="m-auto mb-4">
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                id="poc-1-email"
                                                                autoComplete="off"
                                                                value={email.email}
                                                                disabled={state.isPostingForm}
                                                                placeholder="jane.doe@email.com"
                                                                onBlur={(e) => onInviteAgentBlur(e, index)}
                                                                onChange={(e) => onInviteAgentChangeHandler(e, index)}
                                                                autoFocus
                                                                className="focus:ring-1 w-full focus:ring-green-500 p-1-5 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" />

                                                            {
                                                                state.agentErrors[index].email.length > 0 &&
                                                                <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                    {state.agentErrors[index].email}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className="w-6/12">
                                            <div className="mb-3" id="poc_extra"></div>
                                            {
                                                state.agents.length < 4 ? (
                                                    <span className="text-blue-500 text-xs cursor-pointer" onClick={addAgentInvitationHandler}>
                                                        <span className="fas fa-plus-circle mr-2"></span>
                                                        New invitation
                                                    </span>
                                                ) : (
                                                    null
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            />
        </React.Fragment>
    )
}