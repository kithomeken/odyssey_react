import React, { useState } from "react"
import { Helmet } from "react-helmet"

import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import { HEADER_SECTION_BG } from "../../../global/ConstantsRegistry"
import { usePromiseEffect } from "../../../lib/hooks/usePromiseEffect"
import { securityRoutes } from "../../../routes/settings/securityRoutes"
import HttpServices from "../../../services/HttpServices"
import Error500 from "../../errors/Error500"
import AdministativeRights from "./authorizations/AdministrativeRights"
import EscalationRights from "./authorizations/EscalationRights"
import TicketRights from "./authorizations/TicketRights"
import { InformationAlert } from "../../../components/lib/InformationAlert"
import { toast } from "react-toastify"
import HeaderParagraphLarge from "../../../components/settings/HeaderParagraphLarge"

const CreateAuthorizationTeam = () => {
    const [state, setstate] = useState({
        showModal: false,
        activeTab: 'administrative',
        isPostingForm: false,
        input: {
            name: '',
            description: '',
            field_agent: '',
            access_group: '',
            ticket_access: '',
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
        }
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

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const activateTab = (tabName: any) => {
        setstate({
            ...state,
            activeTab: tabName
        })
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

        changeRadio(e.target.name)
        setstate({
            ...state,
            input
        })
    }

    const changeRadio = (targetName: string) => {
        let { input }: any = state
        let { checked }: any = state

        switch (targetName) {
            case 'access_group':
                if (state.input.access_group === 'L') {
                    input['ticket_access'] = 'RST'
                    checked['globalTicketAccess'] = true
                } else {
                    input['ticket_access'] = null
                }
        }
    }

    const loadRespectiveTab = (tabName = 'administrative') => {
        switch (tabName) {
            case 'tickets':
                return <TicketRights
                    input={state.input}
                    errors={state.errors}
                    onChangeHandler={onChangeHandler}
                    supportFeatures={supportFeaturesPromise}
                />

            case 'escalations':
                return <EscalationRights
                    input={state.input}
                    errors={state.errors}
                    onChangeHandler={onChangeHandler}
                    supportFeatures={supportFeaturesPromise}
                />

            case 'administrative':
                return <AdministativeRights
                    input={state.input}
                    errors={state.errors}
                    onChangeHandler={onChangeHandler}
                    supportFeatures={supportFeaturesPromise}
                />

            default:
                return null
        }
    }

    const supportFeaturesPromise = usePromiseEffect(async () => {
        const response: any = await HttpServices.httpGet('portal/a/site-master/features/support/all')

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching support features...");
        }

        console.log(response);

        return response.data.data
    }, [])

    const openInformationModel = () => {
        setstate({
            ...state,
            showModal: true
        })
    }

    const closeInformationModel = () => {
        setstate({
            ...state,
            showModal: false
        })
    }

    const onAccessTypeHandler = (e: any) => {
        let { input }: any = state
        let { errors }: any = state
        input[e.target.name] = e.target.value
        errors[e.target.name] = ''

        setstate({
            ...state, input, errors
        })

        if (state.input.access_group === 'L') {
            input['ticket_access'] = 'RST'
        } else {
            input['ticket_access'] = null
        }
    }

    const onTicketVisibilityHandler = (e: any) => {
        let { input }: any = state
        let { errors }: any = state
        input[e.target.name] = e.target.value
        errors[e.target.name] = ''

        setstate({
            ...state, input, errors
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
                        <form className="w-6/12 form-group" onSubmit={onSubmitFormData}>
                            <div className="w-full">
                                <p className="text-green-500 mb-2">Group Details</p>

                                <div className="w-12/12 rounded-md shadow-none space-y-px form-group pl-4">
                                    <label htmlFor="team-name" className="block mb-1 text-sm">Group Name</label>
                                    <input type="text" name="name" id="team-name" autoComplete="off" className="focus:ring-2 focus:ring-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Group Name" onChange={onChangeHandler} />

                                    {state.errors.name.length > 0 &&
                                        <p className='invalid-feedback font-small text-red-600 pl-0'>
                                            {state.errors.name}
                                        </p>
                                    }
                                </div>

                                <div className="w-12/12 rounded-md shadow-none space-y-px form-group pl-4">
                                    <label htmlFor="team-description" className="block mb-1 text-sm">Description</label>
                                    <textarea name="description" id="team-description" rows={2} autoComplete="off" className="focus:border-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Description" onChange={onChangeHandler}></textarea>

                                    {state.errors.description.length > 0 &&
                                        <p className='invalid-feedback font-small text-red-600 pl-0'>
                                            {state.errors.description}
                                        </p>
                                    }
                                </div>

                                {
                                    supportFeaturesPromise.value.field_agent === 'Y' ? (
                                        <div className="w-9/12 mb-4 pl-4">
                                            <div className="flex items-start">
                                                <input
                                                    id="field_agent"
                                                    name="field_agent"
                                                    type="checkbox"
                                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                />

                                                <label htmlFor="field_agent" className="ml-2 block text-sm text-gray-500">
                                                    Group contains field agents
                                                </label>
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </div>

                            <div className="w-full text-justify border-t pt-3">
                                <p className="text-green-500 mb-2">Account Access</p>

                                <div className="w-full form-group">
                                    <p className="text-sm mb-2 text-gray-500">
                                        Control users' account access to the system by setting an Access Type applicable to each team.
                                    </p>
                                </div>

                                <div className="w-100 form-group pl-4">
                                    <div className={classNames(state.input.access_group === 'A' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                        "flex-1 min-w-0 p-4 pl-8 border border-gray-300 rounded-md"
                                    )}>
                                        <div className="w-full flex">
                                            <input
                                                id="all_access"
                                                name="access_group"
                                                type="radio"
                                                value="A"
                                                onChange={onAccessTypeHandler}
                                                className="h-4 w-4 mt-1 text-green-600 focus:ring-2 form-control checked:border-green-500 checked:bg-green-500 focus:ring-green-500 focus:bg-green-500 border-gray-300 rounded"
                                            />

                                            <label htmlFor="all_access" className="ml-2 text-sm text-gray-500">
                                                <span className="custom-radio-button-label text-black">
                                                    All Time Access
                                                </span>

                                                <div className="font-smaller text-secondary">
                                                    <span className="acs-psd">
                                                        Users will have lifetime access to the system with periodic password resets.
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-100 form-group pl-4">
                                    <div className={classNames(state.input.access_group === 'L' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                        "flex-1 min-w-0 p-4 pl-8 border border-gray-300 rounded-md"
                                    )}>
                                        <div className="w-full flex">
                                            <input
                                                id="limited_access"
                                                name="access_group"
                                                type="radio"
                                                value="L"
                                                onChange={onAccessTypeHandler}
                                                className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="limited_access" className="ml-2 text-sm text-gray-500">
                                                <span className="custom-radio-button-label flex items-center">
                                                    <span className="text-black">
                                                        Limited Time Access
                                                    </span>

                                                    <button type="button" className="far fa-question-circle text-blue-500 ml-3 fa-lg" onClick={openInformationModel}></button>
                                                </span>

                                                <div className="font-smaller text-secondary">
                                                    <span className="acs-psd">
                                                        Users will have a 30 day span access to the system after account activation.
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {state.errors.access_group.length > 0 &&
                                    <p className='invalid-feedback font-small text-red-600 pl-4 form-group'>
                                        {state.errors.access_group}
                                    </p>
                                }
                            </div>

                            <div className="w-full border-t pt-3">
                                <p className="text-green-500 mb-2">Tickets' Visibility</p>

                                <div className="w-full form-group">
                                    <p className="text-sm mb-2 text-gray-500">
                                        Control users' access and visibility to tickets raised by selecting a visibility mode.
                                    </p>
                                </div>

                                <div className="w-100 form-group pl-4">
                                    <div className={classNames(state.input.ticket_access === 'GLB' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                        "flex-1 min-w-0 p-4 pl-8 border border-gray-300 rounded-md"
                                    )}>
                                        <div className="w-full flex">
                                            <input
                                                id="global_access"
                                                name="ticket_access"
                                                type="radio"
                                                value="GLB"
                                                disabled={
                                                    state.input.access_group === 'A' ? (
                                                        false
                                                    ) : (
                                                        true
                                                    )
                                                }
                                                onChange={onTicketVisibilityHandler}
                                                className={classNames(
                                                    (state.input.access_group === 'A') ? null : 'cursor-not-allowed',
                                                    "h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                )}
                                            />

                                            <label htmlFor="global_access" className="ml-2 text-sm text-gray-500">
                                                <span className={classNames(
                                                    (state.input.access_group === 'A') ? 'text-black' : 'cursor-not-allowed text-gray-500',
                                                    "custom-radio-button-label"
                                                )}>
                                                    Global Access
                                                </span>

                                                <div className="font-smaller text-secondary">
                                                    <span className="acs-psd">
                                                        Visibility to all tickets raised, and whether they are/were assigned to them.
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-100 form-group pl-4">
                                    <div className={classNames(state.input.ticket_access === 'RST' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                        "flex-1 min-w-0 p-4 pl-8 border border-gray-300 rounded-md"
                                    )}>
                                        <div className="w-full flex">
                                            {
                                                (state.input.access_group === 'A') ? (
                                                    <input
                                                        id="restricted_access"
                                                        name="ticket_access"
                                                        type="radio"
                                                        value="RST"
                                                        onChange={onTicketVisibilityHandler}
                                                        className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                    />
                                                ) : (state.input.access_group === 'L') ? (
                                                    <input
                                                        id="restricted_access"
                                                        name="ticket_access"
                                                        type="radio"
                                                        value="RST"
                                                        checked={true}
                                                        onChange={onTicketVisibilityHandler}
                                                        className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                    />
                                                ) : (
                                                    <input
                                                        id="restricted_access"
                                                        name="ticket_access"
                                                        type="radio"
                                                        value="RST"
                                                        checked={false}
                                                        disabled={true}
                                                        onChange={onTicketVisibilityHandler}
                                                        className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                    />
                                                )
                                            }

                                            <label htmlFor="restricted_access" className="ml-2 text-sm text-gray-500">
                                                <span className={classNames(
                                                    (state.input.access_group === 'A') ?
                                                        'text-black'
                                                        : (state.input.access_group === 'L') ?
                                                            'text-black'
                                                            :
                                                            'cursor-not-allowed text-gray-500',
                                                    "custom-radio-button-label"
                                                )}>
                                                    Restricted Access
                                                </span>

                                                <div className="font-smaller text-secondary">
                                                    <span className="acs-psd">
                                                        Visibility <span className="text-red-500">ONLY</span> to the tickets assigned to them.
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {state.errors.ticket_access.length > 0 &&
                                    <p className='invalid-feedback font-small text-red-600 pl-4 form-group'>
                                        {state.errors.ticket_access}
                                    </p>
                                }
                            </div>

                            <div className="w-full border-t pt-3">
                                <p className="text-green-500 mb-2">Grants & Access Rights</p>

                                <div className="w-full flex flex-row">
                                    <div className="w-auto cursor-pointer" onClick={() => activateTab('administrative')}>
                                        <button type="button" className={classNames(
                                            state.activeTab === 'administrative' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                        )}>
                                            <span className="lolrtn robot">Administrative Rights</span>
                                        </button>
                                    </div>

                                    <div className="w-auto cursor-pointer" onClick={() => activateTab('escalations')}>
                                        <button type="button" className={classNames(
                                            state.activeTab === 'escalations' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                        )}>
                                            <span className="lolrtn robot">Escalation Rights</span>
                                        </button>
                                    </div>

                                    <div className="w-auto cursor-pointer" onClick={() => activateTab('tickets')}>
                                        <button type="button" className={classNames(
                                            state.activeTab === 'tickets' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                        )}>
                                            <span className="lolrtn robot">Ticket Rights</span>
                                        </button>
                                    </div>

                                    <div className="flex-grow border-b-2">

                                    </div>
                                </div>

                                <div className="w-full px-3">
                                    {loadRespectiveTab(state.activeTab)}
                                </div>
                            </div>

                            <div className="w-full pt-3 mb-5">
                                {
                                    state.isPostingForm ? (
                                        <button type="button" className={`inline-flex items-center px-4 py-1 border float-right border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-500`} disabled={true}>
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
                                        <button type="submit" className={`inline-flex items-center px-4 py-1 border border-green-500 float-right rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}>
                                            <span className="text-sm">
                                                Create Authorization Group
                                            </span>
                                        </button>
                                    )
                                }
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col align-middle mt-24 w-full h-16">
                            <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                        </div>
                    )
                }
            </div>

            <InformationAlert
                title=""
                details="Once the 30 days access span elapses, the user accounts will be de-activated. You can however, extend a users access if need be."
                showModal={state.showModal}
                closeModal={closeInformationModel}
            />
        </React.Fragment>
    )
}

export default CreateAuthorizationTeam