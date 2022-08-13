import React, { useState } from "react"
import { Helmet } from "react-helmet"

import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import { HEADER_SECTION_BG } from "../../../global/ConstantsRegistry"
import { usePromiseEffect } from "../../../lib/hooks/usePromiseEffect"
import { securityRoutes } from "../../../routes/settings/securityRoutes"
import HttpServices from "../../../services/HttpServices"
import Error500 from "../../errors/Error500"
import { InformationAlert } from "../../../components/lib/InformationAlert"
import { toast } from "react-toastify"
import HeaderParagraphLarge from "../../../components/settings/HeaderParagraphLarge"
import { Listbox } from "@headlessui/react"
import {ListBoxZero} from "../../../lib/hooks/ListBoxZero"

const CreateAuthorizationTeam = () => {
    const [state, setstate] = useState({
        showModal: false,
        requestFailed: true,
        activeTab: 'administrative',
        isPostingForm: false,
        informationAlert: null,
        authGroup: {
            checkAuthGroup: false,
            authGroupExists: true,
        },
        input: {
            name: '',
            description: '',
            field_agent: '',
            access_group: 'ALL',
            ticket_access: 'GLB',
            delete_comments: '',
            whos_comments: '',
        },
        errors: {
            name: '',
            description: '',
            field_agent: '',
            access_group: '',
            ticket_access: '',
            delete_comments: '',
            whos_comments: '',
        },
        ticketVisibilityArray: [
            { id: 'GLB', name: "Global Ticket Access", allowed: ['ALL'] },
            { id: 'RST', name: "Restricted Ticket Access", allowed: ['ALL', 'LTD'] }
        ],
    })

    const groupOrTeam = 'Team'
    const showButton = false
    const pageTitle = "Create Authorization Group"
    const thisPageRoutes = securityRoutes[1].path

    const breadCrumb = [
        { linkItem: true, title: "Security", url: thisPageRoutes },
        { linkItem: true, title: "Authorization Groups", url: thisPageRoutes },
        { linkItem: false, title: "Create" },
    ]

    const accountAccessArray = [
        { id: 'ALL', name: "All Time Access" },
        { id: 'LTD', name: "Limited Time Access" }
    ]

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const onChangeHandler = (e: any) => {
        let { input }: any = state
        let { errors }: any = state
        let isCheckbox: any = (e.target.type === 'checkbox') ? true : false;
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
            ...state,
            input
        })
    }

    const onInputBlur = () => {

    }

    const onChangeListBoxHandler = (e: any, listItem: any) => {
        let { input } = state

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

    const supportFeaturesPromise = usePromiseEffect(async () => {
        const response: any = await HttpServices.httpGet('portal/a/site-master/features/support/all')

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching support features...");
        }

        // setTicketVisibility()
        return response.data.data
    }, [])

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

    const handleValidation = () => {
        let { input }: any = state
        let { errors }: any = state
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

        if (!input['access_group']) {
            isFormValid = false
            errors.access_group = 'Please select an account access type'
        } else {
            errors.access_group = ''
        }

        if (!input['ticket_access']) {
            isFormValid = false
            errors.ticket_access = 'Please select a ticket visibility method'
        } else {
            errors.ticket_access = ''
        }

        if (input['delete_comments'] === 'Y') {
            if (!input['whos_comments']) {
                isFormValid = false
                errors.whos_comments = 'Please select one of the options above'
            } else {
                errors.whos_comments = ''
            }
        } else {
            errors.whos_comments = ''
        }

        return isFormValid
    }

    const handlePostingFormData = async () => {
        try {
            let input = state.input
            const response: any = await HttpServices.httpPost('portal/a/site-master/security/auth-team/create', input)

            if (response.data.success) {
                toast("Created authorization group...", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast("Something went wrong, could not create authorization group...", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            toast("Something went wrong, could not create authorization group...", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    const onSubmitFormData = (e: any) => {
        e.preventDefault()

        if (handleValidation()) {
            setstate({
                ...state,
                isPostingForm: true
            })

            handlePostingFormData()
        } else {
            toast.error("Kindly clear validation errors before posting form data...", {
                position: toast.POSITION.TOP_RIGHT,
            });

            setstate({
                ...state,
                isPostingForm: false
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

                <HeaderParagraphLarge title={`When creating an Authorization ${groupOrTeam}, you're free to set limited or lifetime access for your agents, restrict the resources at their disposal and issue the various rights appropriate for each. Once created, you will be able to add agents into the various Auth Groups.`} />
            </div>

            <div className="w-full px-12 mb-2">
                {
                    supportFeaturesPromise.status === 'rejected' ? (
                        <div className="w-full form-group">
                            <Error500 />
                        </div>
                    ) : supportFeaturesPromise.status === 'fulfilled' ? (
                        <>
                            <div className="w-10/12 h-screen">
                                <form className="w-full form-group" /* onSubmit={onFormSubmitHandler} */>
                                    <div className="w-full flex">
                                        {/* Left Half */}
                                        <div className="w-5/12 px-4 border-r">
                                            <div className="w-full">
                                                <p className="text-sm text-emerald-500 mb-1">
                                                    Authorization Details
                                                </p>
                                            </div>

                                            <div className="w-12/12 rounded-md shadow-none space-y-px mb-5">
                                                <label htmlFor="name" className="block mb-1 text-sm text-gray-500">Name:</label>

                                                <div className="w-full flex items-center align-middle">
                                                    <div className="w-full">
                                                        <input type="text" name="name" id="name" autoComplete="off" className="focus:ring-1 w-full focus:ring-green-500 text-gray-500 p-1-5 capitalize flex-1 block text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Auth Group Name" onChange={onChangeHandler} value={state.input.name} onBlur={onInputBlur} required />

                                                        {
                                                            state.errors.name.length > 0 &&
                                                            <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                {state.errors.name}
                                                            </span>
                                                        }
                                                    </div>

                                                    <div className="w-12 pl-2">
                                                        {
                                                            state.authGroup.checkAuthGroup ? (
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
                                                        <textarea id="description" name="description" rows={3} className="shadow-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 text-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md resize-none p-1-5" placeholder="Auth Group Description" required onChange={onChangeHandler} onBlur={onInputBlur} value={state.input.description}></textarea>

                                                        {
                                                            state.errors.description.length > 0 &&
                                                            <span className='invalid-feedback text-xs text-red-600 pl-0'>
                                                                {state.errors.description}
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                supportFeaturesPromise.value.field_agent === 'Y' ? (
                                                    <div className="mb-4">
                                                        <div className="flex items-start align-middle">
                                                            <input
                                                                id="field_agent"
                                                                name="field_agent"
                                                                type="checkbox"
                                                                className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                            />

                                                            <label htmlFor="field_agent" className="ml-2 block text-sm text-gray-500">
                                                                Authorization group contains field agents
                                                            </label>
                                                        </div>
                                                    </div>
                                                ) : null
                                            }
                                        </div>

                                        {/* Right Half */}
                                        <div className="w-7/12 px-4">
                                            <div className="w-full flex align-middle">
                                                <p className="text-emerald-500 mb-0 text-sm">Account Access</p>
                                                <button type="button" className="far fa-question-circle text-blue-500 ml-3" onClick={() => showInformationModal('A')}></button>

                                            </div>

                                            <div className="w-full">
                                                <p className="text-sm mb-2 text-gray-600">
                                                    Control users' account access to the system by setting an Access Type applicable to each team.
                                                </p>
                                            </div>

                                            <div className="w-6/12 rounded-md shadow-none space-y-px mb-5 flex items-center">
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

                                            <div className="w-6/12 rounded-md shadow-none space-y-px form-group flex items-center">
                                                <div className="w-full">
                                                    {console.log("Ticket Visibility", state.ticketVisibilityArray)}

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
                                                                            ): null
                                                                        }
                                                                    </span>



                                                                    // <Listbox.Option
                                                                    //     key={index}
                                                                    //     className={({ active }) =>
                                                                    //         classNames(
                                                                    //             active ? 'text-white bg-gray-100' : 'text-gray-900',
                                                                    //             'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                    //         )
                                                                    //     }
                                                                    //     value={ticket.id}
                                                                    // >
                                                                    //     {({ selected }) => (
                                                                    //         <>
                                                                    //             <span className="flex items-center">
                                                                    //                 <span className="ml-2 text-sm text-gray-700 truncate">{ticket.name}</span>
                                                                    //             </span>

                                                                    //             {selected ? (
                                                                    //                 <span className="text-green-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                                    //                     <i className="fad fa-check h-5 w-5"></i>
                                                                    //                 </span>
                                                                    //             ) : null}
                                                                    //         </>
                                                                    //     )}
                                                                    // </Listbox.Option>
                                                                ))}
                                                            </>
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="w-5/12 mb-5 pl-4">
                                        {
                                            state.isPostingForm ? (
                                                <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-500`} disabled={true}>
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
                                                <button type="submit" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}>
                                                    <span className="text-sm">
                                                        Create Authorization Group
                                                    </span>
                                                </button>
                                            )
                                        }
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col align-middle mt-24 w-full h-16">
                            <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                        </div>
                    )
                }
            </div>

            <InformationAlert
                title=""
                details={state.informationAlert}
                showModal={state.showModal}
                closeModal={closeInformationModel}
            />
        </React.Fragment>
    )
}

export default CreateAuthorizationTeam