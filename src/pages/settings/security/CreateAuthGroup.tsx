import { Listbox } from "@headlessui/react"
import React, { FC, useState } from "react"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import { InformationAlert } from "../../../components/lib/InformationAlert"
import { SideBarPanel } from "../../../components/lib/SideBarPanel"
import {ListBoxZero} from "../../../lib/hooks/ListBoxZero"
import { usePromiseEffect } from "../../../lib/hooks/usePromiseEffect"
import HttpServices from "../../../services/HttpServices"
import { AUTH_TEAM_CHECK_NAME_UPDATE_API_ROUTE, AUTH_TEAM_CREATE_UPDATE_API_ROUTE, SUPPORT_FEATURES_LIST_API_ROUTE } from "../../../api/ApiRoutes"
import { securityRoutes } from "../../../routes/settings/securityRoutes"

interface Props {
    show: boolean,
    showOrHideModal: any
}

export const CreateAuthGroup: FC<Props> = ({ show, showOrHideModal }) => {
    const [state, setstate] = useState({
        showModal: false,
        requestFailed: false,
        isPostingForm: false,
        disableSubmitBtn: true,
        informationAlert: null,
        authTeam: {
            checkAuthTeam: false,
            authTeamExists: true,
        },
        input: {
            name: '',
            description: '',
            field_agent: '',
            access_group: 'ALL',
            ticket_access: 'GLB',
        },
        errors: {
            name: '',
            description: '',
            field_agent: '',
            access_group: '',
            ticket_access: '',
        },
        ticketVisibilityArray: [
            { id: 'GLB', name: "Global Ticket Access", allowed: ['ALL'] },
            { id: 'RST', name: "Restricted Ticket Access", allowed: ['ALL', 'LTD'] }
        ],
    })

    const navigate = useNavigate();
    const pageTitle = "Create Auth Team"
    const accountAccessArray = [
        { id: 'ALL', name: "All Time Access" },
        { id: 'LTD', name: "Limited Time Access" }
    ]

    const supportFeaturesUsePromise = usePromiseEffect(async () => {
        const response: any = await HttpServices.httpGet(SUPPORT_FEATURES_LIST_API_ROUTE)

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching support features...");
        }

        // setTicketVisibility()
        return response.data.data
    }, [])

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    const showInformationModal = (item: any) => {
        let { informationAlert } = state

        if (item === 'A') {
            informationAlert = (
                <div className="w-full text-sm">
                    <p className="text-gray-700 mb-1">
                        All Time Access
                    </p>

                    <p className="text-gray-500 mb-3">
                        Users will have lifetime access to the system with periodic password resets.
                    </p>

                    <p className="text-gray-700 mb-1">
                        Limited Time Access
                    </p>

                    <p className="text-gray-500 mb-1">
                        Users will have a 30 day access pass to the system after account activation.
                    </p>

                    <p className="text-gray-500">
                        Once the 30 days access pass elapses, the user accounts will be de-activated. You can however, extend a users access if need be.
                    </p>
                </div>
            )
        } else if (item === 'T') {
            informationAlert = (
                <>
                    <div className="w-full text-sm">
                        <p className="text-gray-700 mb-1">
                            Global Access
                        </p>

                        <p className="text-gray-500 mb-3">
                            Visibility to all tickets raised, and whether they are assigned to them or not.
                        </p>

                        <p className="text-gray-700 mb-1">
                            Restricted Access
                        </p>

                        <p className="text-gray-500 mb-1">
                            Visibility <span className="text-red-500">ONLY</span> to the tickets assigned to them.
                        </p>
                    </div>
                </>
            )
        }

        setstate({
            ...state, informationAlert,
            showModal: true
        })
    }

    const closeInformationModel = () => {
        setstate({
            ...state,
            showModal: false
        })
    }

    const onChangeHandler = (e: any) => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { input } = state
            let { errors } = state
            let isCheckbox = (e.target.type === 'checkbox') ? true : false;

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

    const onInputBlur = (e: any) => {
        const { isPostingForm } = state

        if (!isPostingForm) {
            let { errors }: any = state
            let targetValue = e.target.value
            targetValue = targetValue.trim()

            switch (e.target.name) {
                case 'name':
                    if (targetValue.length < 1) {
                        errors[e.target.name] = 'Auth Team ' + e.target.name + ' cannot be empty'
                    } else if (targetValue.length < 5) {
                        errors[e.target.name] = 'Auth Team ' + e.target.name + ' cannot be less than 5 characters'
                    } else if (targetValue.length > 30) {
                        errors[e.target.name] = 'Auth Team ' + e.target.name + ' cannot be more than 30 characters'
                    } else {
                        errors[e.target.name] = ''
                        checkIfAuthTeamExists()
                    }
                    break;

                case 'description':
                    if (targetValue.length < 1) {
                        errors[e.target.name] = 'Auth Team ' + e.target.name + ' cannot be empty'
                    } else if (targetValue.length < 30) {
                        errors[e.target.name] = 'Auth Team ' + e.target.name + ' cannot be less than 30 characters'
                    } else if (targetValue.length > 200) {
                        errors[e.target.name] = 'Auth Team ' + e.target.name + ' cannot be more than 200 characters'
                    } else {
                        errors[e.target.name] = ''
                    }
                    break;
            }

            setstate({
                ...state, errors,
            })
        }
    }

    const checkIfAuthTeamExists = async (preFormPosting = false) => {
        let { input } = state
        let { errors } = state
        let { authTeam } = state

        authTeam.checkAuthTeam = true
        const requestData = {
            name: input.name,
        }

        const response: any = await HttpServices.httpPost(AUTH_TEAM_CHECK_NAME_UPDATE_API_ROUTE, requestData)
        authTeam.checkAuthTeam = false

        if (response.data.success) {
            authTeam.authTeamExists = false

            if (preFormPosting) {
                createAuthTeamApiPosting()
            }
        } else {
            errors.name = "Auth team name already exists"
            authTeam.authTeamExists = true
        }

        setstate({
            ...state, errors, authTeam
        })
    }

    const onChangeListBoxHandler = (e: any, listItem: any) => {
        let { input } = state
        const { isPostingForm } = state

        if (!isPostingForm) {
            listItem === 'A' ? (
                <>
                    {input.access_group = e}
                    {setTicketVisibility(e)}
                </>
            ) : (
                input.ticket_access = e
            )

            setstate({
                ...state, input
            })
        }
    }

    const setTicketVisibility = (accessGroup: any) => {
        let { input } = state

        if (accessGroup === 'LTD') {
            input.ticket_access = 'RST'
        } else {
            input.ticket_access = 'GLB'
        }

        setstate({
            ...state, input
        })
    }

    const handleFormValidation = () => {
        let { input }: any = state
        let { errors }: any = state
        let { authTeam } = state
        let isFormValid = true

        if (!input['name']) {
            isFormValid = false
            errors.name = 'Please enter a group name'
        } else if (input['name'] < 3) {
            isFormValid = false
            errors.name = 'Group name cannot be less than 3 characters'
        } else if (input['name'] < 15) {
            isFormValid = false
            errors.name = 'Group name cannot be greater than 15 characters'
        } else {
            errors.name = ''
        }

        if (!input['description']) {
            isFormValid = false
            errors.description = 'Please enter a group description'
        } else if (input['description'] < 3) {
            isFormValid = false
            errors.description = 'Group description cannot be less than 3 characters'
        } else if (input['description'] < 25) {
            isFormValid = false
            errors.description = 'Group description cannot be greater than 25 characters'
        } else {
            errors.description = ''
        }

        return isFormValid
    }

    const onFormSubmitHandler = (e: any) => {
        e.preventDefault()
        let isPostingForm = state.isPostingForm

        if (!isPostingForm) {
            if (handleFormValidation()) {
                setstate({
                    ...state,
                    isPostingForm: true
                })

                const preFormPosting = true
                checkIfAuthTeamExists(preFormPosting)
            } else {
                // Show error notification
                let toastText = 'Kindly all clear errors before submiting form data'

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
        }
    }

    const createAuthTeamApiPosting = async () => {
        let { input } = state
        let { requestFailed } = state
        let { isPostingForm } = state

        const requestData = {
            name: input.name,
            description: input.description,
            access_group: input.access_group,
            ticket_access: input.ticket_access,
        }

        try {
            const response: any = await HttpServices.httpPost(AUTH_TEAM_CREATE_UPDATE_API_ROUTE, requestData)

            if (response.data.success) {
                // Navigate to newly created Auth Team and 
                const AUTH_TEAM_VIEW: any = (securityRoutes.find((routeName) => routeName.name === 'AUTH'))?.path
                const redirectToRoute = AUTH_TEAM_VIEW + '/' + response.data.data.uuid

                navigate(redirectToRoute, {
                    replace: true,
                });
            } else {
                requestFailed = true
            }
        } catch (error) {
            requestFailed = true
        }

        isPostingForm = false

        setstate({
            ...state, isPostingForm, requestFailed
        })
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <SideBarPanel
                show={show}
                actionButton={{
                    before: "Create Auth",
                    after: "Creating..."
                }}
                title={pageTitle}
                preLoadsData={true}
                preLoadStatus={supportFeaturesUsePromise.status}
                showOrHidePanel={showOrHideModal}
                isPostingForm={state.isPostingForm}
                onFormSubmitHandler={onFormSubmitHandler}
                description="Create a team with various rights appropriate for a subset of your users and manage the access to resources under one roof."
                formComponents={
                    <div className="w-full mb-5">
                        <div className="w-12/12 rounded-md shadow-none space-y-px mb-5">
                            <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Name:</label>

                            <div className="w-full flex items-center align-middle">
                                <div className="w-full">
                                    <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-500 p-1-5 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Auth Team Name" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />

                                    {
                                        state.errors.name.length > 0 &&
                                        <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                            {state.errors.name}
                                        </span>
                                    }
                                </div>

                                <div className="w-12 pl-2">
                                    {
                                        state.authTeam.checkAuthTeam ? (
                                            <span className="fad text-green-500 fa-spinner-third fa-lg block fa-spin"></span>
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="w-12/12 rounded-md shadow-none space-y-px form-group flex items-center">
                            <div className="w-full">
                                <label htmlFor="description" className="block mb-1 text-sm text-gray-500">Description:</label>

                                <div className="w-full">
                                    <textarea id="description" name="description" rows={3} className="shadow-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md resize-none p-1-5" placeholder="Auth Team Description" required onChange={onChangeHandler} onBlur={onInputBlur} value={state.input.description}></textarea>

                                    {
                                        state.errors.description.length > 0 &&
                                        <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                            {state.errors.description}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex align-middle">
                            <p className="text-emerald-500 mb-0 text-sm">Account Access</p>
                            <button type="button" className="far fa-question-circle text-blue-500 ml-3" onClick={() => showInformationModal('A')}></button>

                        </div>

                        <div className="w-full">
                            <p className="text-sm mb-2 text-gray-600">
                                Control users' account access to the system by setting an Access Type applicable to each team.
                            </p>
                        </div>

                        <div className="w-8/12 rounded-md shadow-none space-y-px mb-5 flex items-center">
                            <div className="w-full">
                                <ListBoxZero
                                    onChangeListBoxHandler={(e) => onChangeListBoxHandler(e, 'A')}
                                    state={state}
                                    label="Account Access:"
                                    listButton={
                                        <>
                                            {accountAccessArray.map((access, index) => (
                                                <span key={index}>
                                                    {
                                                        state.input.access_group === access.id ? (
                                                            <span className="flex items-center">
                                                                <span className="ml-2 text-sm text-gray-700 truncate">{access.name}</span>
                                                            </span>
                                                        ) : null
                                                    }
                                                </span>
                                            ))}

                                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <i className="far fa-chevron-down text-emerald-500"></i>
                                            </span>
                                        </>
                                    }
                                    listOptions={
                                        <>
                                            {accountAccessArray.map((access, index) => (
                                                <Listbox.Option
                                                    key={index}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-gray-100' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={access.id}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span className="flex items-center">
                                                                <span className="ml-2 text-sm text-gray-700 truncate">{access.name}</span>
                                                            </span>

                                                            {selected ? (
                                                                <span className="text-green-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                                    <i className="fad fa-check h-5 w-5"></i>
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </>
                                    }
                                />
                            </div>
                        </div>

                        <div className="w-full flex align-middle">
                            <p className="text-emerald-500 mb-0 text-sm">Tickets' Visibility</p>
                            <button type="button" className="far fa-question-circle text-blue-500 ml-3" onClick={() => showInformationModal('T')}></button>
                        </div>

                        <div className="w-full mb-2">
                            <p className="text-sm text-gray-600">
                                Control users' access and visibility to tickets raised by selecting a visibility mode.
                            </p>
                        </div>

                        <div className="w-8/12 rounded-md shadow-none space-y-px flex items-center">
                            <div className="w-full h-44">
                                <ListBoxZero
                                    onChangeListBoxHandler={(e) => onChangeListBoxHandler(e, 'T')}
                                    state={state}
                                    label="Ticket's Visibility:"
                                    listButton={
                                        <>
                                            {state.ticketVisibilityArray.map((access, index) => (
                                                <span key={index}>
                                                    {
                                                        state.input.ticket_access === access.id ? (
                                                            <span className="flex items-center">
                                                                <span className="ml-2 text-sm text-gray-700 truncate">{access.name}</span>
                                                            </span>
                                                        ) : null
                                                    }
                                                </span>
                                            ))}

                                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <i className="far fa-chevron-down text-emerald-500"></i>
                                            </span>
                                        </>
                                    }
                                    listOptions={
                                        <>
                                            {state.ticketVisibilityArray.map((ticket, index) => (
                                                <span key={index}>
                                                    {
                                                        ticket.allowed.includes(state.input.access_group) ? (
                                                            <Listbox.Option
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        active ? 'text-white bg-gray-100' : 'text-gray-900',
                                                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                    )
                                                                }
                                                                value={ticket.id}
                                                            >
                                                                {({ selected }) => (
                                                                    <>
                                                                        <span className="flex items-center">
                                                                            <span className="ml-2 text-sm text-gray-700 truncate">{ticket.name}</span>
                                                                        </span>

                                                                        {selected ? (
                                                                            <span className="text-green-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                                                <i className="fad fa-check h-5 w-5"></i>
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ) : null
                                                    }
                                                </span>
                                            ))}
                                        </>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                }
            />

            <InformationAlert
                title=""
                details={state.informationAlert}
                showModal={state.showModal}
                closeModal={closeInformationModel}
            />
        </React.Fragment>
    )
}