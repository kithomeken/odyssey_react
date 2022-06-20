import { Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { TICKET_TYPES_CHECK_API_ROUTE, TICKET_TYPES_CREATE_API_ROUTE } from "../../../../api/ApiRoutes"
import ApiServices from "../../../../api/ApiServices"
import ErrorBanner from "../../../../components/layouts/ErrorBanner"
import SuccessBanner from "../../../../components/layouts/SuccessBanner"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HeaderParagraph from "../../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry"
import { featuresRoutes } from "../../../../routes/settings/featuresRoutes"
import HttpServices from "../../../../services/HttpServices"

const CreateTicketType = () => {
    const [state, setstate] = useState({
        data: null,
        requestFailed: false,
        requestSucceeded: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        input: {
            name: '',
            description: '',
            another: 'N',
        },
        errors: {
            name: '',
            description: '',
        },
        ticket: {
            checkTicket: false,
            ticketExists: true
        },
        banner: {
            name: ''
        }
    })

    const showButton = false
    let navigate = useNavigate();
    const pageTitle = "Create Ticket Type"

    const breadCrumb = [
        { linkItem: true, title: "Ticket Features", url: "" },
        { linkItem: true, title: "Ticket Types", url: "" },
        { linkItem: false, title: pageTitle },
    ]

    const onInputBlur = (e: { target: { name: string; value: string } }) => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state

            let targetValue = e.target.value
            targetValue = targetValue.trim()

            if (targetValue.length < 1) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Ticket type ' + e.target.name + ' cannot be empty'
            } else if (targetValue.length < 5) {
                input[e.target.name] = targetValue
                errors[e.target.name] = 'Ticket type ' + e.target.name + ' cannot be less than 5 characters'
            } else if (targetValue.length > 5) {
                switch (e.target.name) {
                    case 'name':
                        if (targetValue.length > 30) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Ticket type ' + e.target.name + ' cannot be more than 30 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''
                            checkIfTicketTypeExists()
                        }
                        break;

                    case 'description':
                        if (targetValue.length > 100) {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = 'Ticket type ' + e.target.name + ' cannot be more than 100 characters'
                        } else {
                            input[e.target.name] = targetValue
                            errors[e.target.name] = ''
                        }
                        break;
                }
            }

            setstate({
                ...state, input, errors,
            })
        }
    }

    const checkIfTicketTypeExists = async () => {
        let { input }: any = state
        let { errors }: any = state
        let { ticket }: any = state

        try {
            ticket.checkTicket = true
            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + TICKET_TYPES_CHECK_API_ROUTE
            const response: any = await HttpServices.httpPost(apiCall, input)
            ticket.checkTicket = false

            if (response.data.success) {
                ticket.ticketExists = false
            } else {
                errors.name = "Ticket name already exists"
                ticket.ticketExists = true
            }

            setstate({
                ...state, errors, ticket
            })
        } catch (error) {
            errors.name = "Failed to check for ticket type availability..."
            ticket.ticketExists = true
            ticket.checkTicket = false

            setstate({
                ...state, errors, ticket
            })
        }
    }

    const onChangeHandler = (e: any) => {
        const { isPostingForm } = state
        let isCheckbox: any = (e.target.type === 'checkbox') ? true : false;

        if (!isPostingForm) {
            let { input }: any = state
            let { errors }: any = state

            input[e.target.name] = e.target.value
            errors[e.target.name] = ''

            if (isCheckbox) {
                if (e.target.checked) {
                    input[e.target.name] = "Y"
                } else {
                    input[e.target.name] = "N"
                }
            }

            setstate({
                ...state, input, errors
            })
        }
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let { ticket }: any = state
        let { errors }: any = state

        if (!ticket.ticketExists) {
            if (errors.name.length > 0 || errors.description.length > 0) {
                // Do nothing
            } else {
                // Post form data
                let { isPostingForm } = state
                isPostingForm = true

                setstate({
                    ...state, isPostingForm
                })

                return createTicketTypeApiCall()
            }
        }
    }

    const createTicketTypeApiCall = async () => {
        let { requestSucceeded }: any = state
        let { requestFailed }: any = state
        let { isPostingForm } = state
        let { input }: any = state
        let { banner }: any = state

        try {
            const apiDomain = ApiServices.apiDomain()
            const apiToBeConsumed = apiDomain + TICKET_TYPES_CREATE_API_ROUTE
            const response: any = await HttpServices.httpPost(apiToBeConsumed, input)

            if (response.data.success) {
                if (state.input.another === 'Y') {
                    banner.name = input.name
                    input.name = ''
                    input.description = ''
                    input.another = 'N'
                    requestSucceeded = true
                } else {
                    const ticketTypeRoute = featuresRoutes[1].path
                    navigate(ticketTypeRoute, { replace: true });
                }
            } else {
                requestFailed = true
            }
        } catch (error) {
            requestFailed = true
        }

        isPostingForm = false

        setstate({
            ...state, input, requestFailed, isPostingForm, requestSucceeded, banner
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

                <HeaderParagraph 
                    title="Kindly ensure you've captured the correct ticket type data as you'll not be able to make any ammendements later on. You can however, decommission a ticket type to prevent any further usage." />
            </div>

            <div className="w-full px-12 form-group">
                <div className="w-9/12">
                    <div className="w-full">
                        <p className="text-gray-600 text-sm form-group">
                            
                        </p>
                    </div>

                    <form className="w-7/12 rounded-md shadow-none space-y-px form-group" onSubmit={onFormSubmitHandler}>
                        <div className="w-12/12 rounded-md shadow-none space-y-px mb-5">
                            <label htmlFor="name" className="block mb-1 text-sm text-gray-700">Ticket Type:</label>

                            <div className="w-full flex items-center align-middle">
                                <div className="w-full">
                                    <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-700 p-2 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-400" placeholder="Ticket Type" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />

                                    {
                                        state.errors.name.length > 0 &&
                                        <span className='invalid-feedback font-small text-red-600 pl-0'>
                                            {state.errors.name}
                                        </span>
                                    }
                                </div>

                                <div className="w-12 pl-2">
                                    {
                                        state.ticket.checkTicket ? (
                                            <span className="fad text-green-500 fa-spinner-third fa-lg block fa-spin"></span>
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center pb-4">
                            <div className="w-full">
                                <label htmlFor="description" className="block mb-1 text-sm text-gray-700">Description:</label>

                                <div className="w-full">
                                    <textarea id="description" name="description" rows={3} className="shadow-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-700 mt-1 block w-full sm:text-sm border border-gray-400 rounded-md resize-none p-2" placeholder="Description" required onChange={onChangeHandler} onBlur={onInputBlur} value={state.input.description}></textarea>

                                    {
                                        state.errors.description.length > 0 &&
                                        <span className='invalid-feedback font-small text-red-600 pl-0'>
                                            {state.errors.description}
                                        </span>
                                    }
                                </div>
                            </div>

                            <div className="w-12"></div>
                        </div>

                        <div className="w-full rounded-md shadow-none space-y-px form-group flex items-center">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                    <input id="add-another" name="another" type="checkbox" onChange={onChangeHandler}
                                        checked={
                                            state.input.another === 'Y' ? true : false
                                        }
                                        className="h-5 w-5 text-green-600 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 form-tick appearance-none border border-gray-300 rounded-md checked:border-transparent focus:outline-none" />
                                    <label htmlFor="add-another" className="ml-2 block text-sm text-gray-500">Add another ticket type</label>
                                </div>
                            </div>
                        </div>

                        {
                            state.requestFailed ? (
                                <div className="w-11/12">
                                    <ErrorBanner message={`Failed to add ticket type, please try again later...`} />
                                </div>
                            ) : null
                        }

                        {
                            state.requestSucceeded ? (
                                <div className="w-11/12">
                                    <SuccessBanner message={`Ticket type ${state.banner.name} created...`} />
                                </div>
                            ) : null
                        }

                        <div className="flex flex-row w-11/12 pt-6">
                            {
                                state.isPostingForm ? (
                                    <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-300 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
                                        <span>
                                            <span className="left-0 inset-y-0 flex items-center pl-3">
                                                <span className="pr-2">
                                                    Creating...
                                                </span>

                                                <span className="w-5 h-5">
                                                    <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                </span>
                                            </span>
                                        </span>
                                    </button>
                                ) : (
                                    <button type="submit" disabled={state.ticket.ticketExists} className={`inline-flex items-center px-4 py-1-5 border border-blue-500 rounded shadow-sm text-sm text-white bg-blue-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50`}>
                                        <span className="text-sm">
                                            Create Ticket Type
                                        </span>
                                    </button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CreateTicketType