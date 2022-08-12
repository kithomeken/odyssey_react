import React, { FC, useState } from "react"
import { AGENT_CHANGE_EMAIL_CHECK_API_ROUTE, AGENT_CHANGE_EMAIL_INV_API_ROUTE } from "../../../api/ApiRoutes"
import { DynamicModal } from "../../../components/lib/DynamicModal"
import { usePromiseEffect } from "../../../lib/hooks/usePromiseEffect"
import HttpServices from "../../../services/HttpServices"

interface Props {
    uuid: any,
    show: any,
    email: any,
    showOrHide: any,
    updateAgentEmail: any,
}

export const ChangeInvitationEmail: FC<Props> = ({ show, email, showOrHide, uuid, updateAgentEmail }) => {
    const [state, setstate] = useState({
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        requestSucceeded: false,
        disallowInvitationChange: true,
        status: 'pending',
        input: {
            email: email
        },
        errors: {
            email: ''
        }
    })
    
    async function checkChangeValidityApiCall() {
        try {
            let formData = new FormData
            formData.append('uuid', uuid)
            const response: any = await HttpServices.httpPost(AGENT_CHANGE_EMAIL_CHECK_API_ROUTE, formData)            

            if (response.data.success) {
                setstate({
                    ...state, 
                    status: 'fulfilled',
                    disallowInvitationChange: false,
                })
            } else {
                setstate({
                    ...state, 
                    status: 'rejected',
                    disallowInvitationChange: true
                })
            }
        } catch (error) {              
            setstate({
                ...state, 
                status: 'rejected'
            })
        }
    }

    React.useEffect(() => {        
        if (show) {
            checkChangeValidityApiCall()
        }
    }, [show]);

    const onChangeInvitationEmailHandler = (e: any) => {
        const isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            let { errors } = state
            let { input } = state

            input[e.target.name] = e.target.value
            errors[e.target.name] = ''

            setstate({
                ...state, input, errors
            })
        }
    }

    const onBlurInvitationEmailHandler = (e: any) => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { errors } = state

            if (e.target.value.length < 1) {
                errors[e.target.name] = 'Please provide an email address'
            } else {
                let lastAtPos = e.target.value.lastIndexOf('@')
                let lastDotPos = e.target.value.lastIndexOf('.')

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && e.target.value.indexOf('@@') === -1 && lastDotPos > 2 && (e.target.value.length - lastDotPos) > 2)) {
                    errors[e.target.name].email = 'Please provide a valid email address'
                }
            }

            setstate({
                ...state, errors,
            })
        }
    }

    const changeInvitationValidation = () => {
        let hasErrors = false
        let { errors } = state

        /* Validate email address provided */
        if (state.input.email.length < 1) {
            errors.email = 'Please provide an email address'
            hasErrors = true
        } else {
            let lastAtPos = state.input.email.lastIndexOf('@')
            let lastDotPos = state.input.email.lastIndexOf('.')

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && state.input.email.indexOf('@@') === -1 && lastDotPos > 2 && (state.input.email.length - lastDotPos) > 2)) {
                errors.email = 'Please provide a valid email address'
                hasErrors = true
            } else {
                if (state.input.email === email) {
                    errors.email = 'Please provide a different email address'
                    hasErrors = true
                }
            }
        }

        setstate({
            ...state, errors
        })

        return hasErrors
    }

    const onFormSubmitHandler = (e: any) => {
        const { isPostingForm } = state
        e.preventDefault()

        if (!isPostingForm) {
            let { errors } = state

            if (changeInvitationValidation()) {
                return
            }

            if (errors.email.length > 1) {
                return
            }

            setstate({
                ...state, isPostingForm: true
            })

            postInvitationEmailApiCall()
        }
    }

    const postInvitationEmailApiCall = async () => {
        let {input} = state
        let { isPostingForm } = state
        
        try {
            let formData = new FormData
            formData.append('email', input.email)
            formData.append('uuid', uuid)

            const response: any = await HttpServices.httpPost(AGENT_CHANGE_EMAIL_INV_API_ROUTE, formData)            
            
            if (response.data.success) {
                updateAgentEmail(input.email)
                showOrHide()
            } else {
                let {errors} = state
                let errorMessages = response.data.message
                let messageKeys = Object.keys(errorMessages)

                messageKeys.map((message) => {                    
                    let errorMessage = errorMessages[message]
                    errorMessage[0] = errorMessage[0].replace('The', 'This')
                    errors.email = errorMessage[0]
                    
                    setstate({
                        ...state, errors
                    })
                })
            }
        } catch (error) {
            let {errors} = state
            errors.email = "Could not change invitation email"
                    
            setstate({
                ...state, errors
            })
        }

        isPostingForm = false

        setstate({
            ...state, isPostingForm
        })
    }

    return (
        <React.Fragment>
            <DynamicModal
                size={"md"}
                show={show}
                preLoadsData={true}
                dispErrorMessage={state.disallowInvitationChange}
                preLoadStatus={state.status}
                showOrHideModal={showOrHide}
                title="Change Invitation Email"
                isPostingForm={state.isPostingForm}
                onFormSubmitHandler={onFormSubmitHandler}
                errorTitle="Action Denied"
                errorMessage="A change in the invitation email was already performed"
                description="Capture the correct e-mail address for the agent account and send out a new invitation. By doing this, the previous sent out invitation will be discarded."
                actionButton={{
                    before: "Change",
                    after: "Changing"
                }}
                formComponents={
                    <>
                        <div className="w-7/12 m-auto mb-4">
                            <input
                                type="text"
                                name="email"
                                id="ag-n1-email"
                                autoComplete="off"
                                value={state.input.email}
                                disabled={state.isPostingForm}
                                placeholder="jane.doe@email.com"
                                onBlur={onBlurInvitationEmailHandler}
                                onChange={onChangeInvitationEmailHandler}
                                autoFocus
                                className="focus:ring-1 w-full focus:ring-green-500 p-1-5 lowercase flex-1 block text-sm rounded-md sm:text-sm border border-gray-300 disabled:opacity-50" />

                            {
                                state.errors.email.length > 0 &&
                                <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                    {state.errors.email}
                                </span>
                            }
                        </div>
                    </>
                }
            />
        </React.Fragment>
    )
}