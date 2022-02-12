import React, { useState } from "react"
import { Helmet } from "react-helmet"
import ApiServices from "../../../api/ApiServices"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import ConstantsRegistry from "../../../global/ConstantsRegistry"
import { usePromiseEffect } from "../../../lib/hooks/usePromiseEffect"
import { securityRoutes } from "../../../routes/settings/securityRoutes"
import HttpServices from "../../../services/HttpServices"
import Error500 from "../../errors/Error500"
import AdministativeRights from "./authorizations/AdministrativeRights"
import EscalationRights from "./authorizations/EscalationRights"
import TicketRights from "./authorizations/TicketRights"

const CreateAuthorizationTeam = () => {
    const [state, setstate] = useState({
        activeTab: 'administrative',
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
    const applicationName = ConstantsRegistry.projectApplicationName()

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
        let {input}: any = state
        let {errors}: any = state
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
        let {input}: any = state
        let {checked}: any = state

        switch(targetName) {
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
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + `portal/a/site-master/features/support/all`
        const response: any = await HttpServices.httpGet(apiCall)

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching support features...");
        }

        return response.data.data
    }, [])

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <BreadCrumbs breadCrumbDetails={breadCrumb} />

            <Header title={pageTitle}
                showButton={showButton}
            />

            <div className="w-full mb-2">
                <div className="w-12/12">
                    <p className="text-sm mb-3 text-gray-500">
                        When creating an Authorization {groupOrTeam}, you're free to set limited or lifetime access for your agents, restrict the resources at their disposal and issue the various rights appropriate for each. Once created, you will be able to add agents into the various Auth Teams.
                    </p>
                </div>
            </div>

            {
                supportFeaturesPromise.status === 'rejected' ? (
                    <div className="w-full form-group">
                        <Error500 />
                    </div>
                ) : supportFeaturesPromise.status === 'fulfilled' ? (
                    <form className="w-8/12 form-group">
                        <div className="w-full">
                            <p className="text-green-500 mb-2">Team Details</p>

                            <div className="w-12/12 rounded-md shadow-none space-y-px form-group pl-4">
                                <label htmlFor="team-name" className="block mb-1 text-sm">Team Name</label>
                                <input type="text" name="name" id="team-name" autoComplete="off" className="focus:ring-2 focus:ring-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Team Name" />

                                {state.errors.name.length > 0 && 
                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                        {state.errors.name}
                                    </span>
                                }
                            </div>

                            <div className="w-12/12 rounded-md shadow-none space-y-px form-group pl-4">
                                <label htmlFor="team-description" className="block mb-1 text-sm">Description</label>
                                <textarea name="description" id="team-description" rows={2} autoComplete="off" className="focus:border-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Description"></textarea>

                                {state.errors.description.length > 0 && 
                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                        {state.errors.description}
                                    </span>
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
                                                Team contains field agents
                                            </label>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>

                        <div className="w-full text-justify border-t pt-3">
                            <p className="text-green-500 mb-2">Access Type</p>

                            <div className="w-full form-group">
                                <p className="text-sm mb-2 text-gray-500">
                                    Control users' access to the system by setting an Access Type applicable to each team.
                                </p>

                                <p className="text-sm mb-2 pl-4 text-gray-500">
                                    <span className="text-black">All Time Access:</span> users will have lifetime access to the system with periodic password resets as defined in the Password Policies.
                                </p>

                                <p className="text-sm form-group pl-4 text-gray-500">
                                    <span className="text-black"> Limited Time Access:</span> users will have a 30 day span access to the system after account activation, after which their accounts will be de-activated. You can, however, extend a users access if need be.
                                </p>
                            </div>

                            <div className="mb-3 flex items-center w-full pl-4">
                                <div className={classNames(
                                    state.input.access_group === 'A' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                    "flex-1 min-w-0 p-4 pl-8 border border-gray-300 mr-1 rounded-md"
                                )}>
                                    <div className="w-full flex">
                                        <input
                                            id="all_access"
                                            name="access_group"
                                            type="radio"
                                            value="A"
                                            className="h-4 w-4 mt-1 text-green-600 focus:ring-2 form-control checked:border-green-500 checked:bg-green-500 focus:ring-green-500 focus:bg-green-500 border-gray-300 rounded"
                                        />

                                        <label htmlFor="all_access" className="ml-2 text-sm text-gray-500">
                                            <span className="custom-radio-button-label text-black">
                                                All Time Access
                                            </span>

                                            <div className="font-smaller text-secondary">
                                                <span className="acs-psd">
                                                    No account expiry
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className={classNames(
                                    state.input.access_group === 'L' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                    "flex-1 min-w-0 p-4 pl-8 border border-gray-300 ml-1 rounded-md"
                                )}>
                                    <div className="w-full flex">
                                        <input
                                            id="limited_access"
                                            name="access_group"
                                            type="radio"
                                            value="L"
                                            className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                        />

                                        <label htmlFor="limited_access" className="ml-2 text-sm text-gray-500">
                                            <span className="custom-radio-button-label text-black">
                                                Limited Time Access
                                            </span>

                                            <div className="font-smaller text-secondary">
                                                <span className="acs-psd">
                                                    30 days access pass
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {state.errors.access_group.length > 0 && 
                                    <span className='invalid-feedback font-small text-red-600 pl-0'>
                                        {state.errors.access_group}
                                    </span>
                                }
                            </div>
                        </div>

                        <div className="w-full border-t pt-3">
                            <p className="text-green-500 mb-2">Tickets' Visibility</p>

                            <div className="w-full form-group">
                                <p className="text-sm mb-2 text-gray-500">
                                    Control users' access to tickets raised by setting a visibility mode.
                                </p>

                                <p className="text-sm mb-2 text-gray-500 pl-4">
                                    <span className="text-black">Global Access:</span> users have visibility to all tickets raised, regardless of who raised them and whether they are/were assigned to them.
                                </p>

                                <p className="text-sm form-group text-gray-500 pl-4">
                                    <span className="text-black">Restricted Access:</span> users will <span className="text-red-500">ONLY</span> have access to the tickets assigned to them.
                                </p>
                            </div>

                            <div className="flex items-center w-full mb-3 pl-4">
                                <div className={classNames(
                                    state.input.ticket_access === 'GLB' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                    "flex-1 min-w-0 p-4 pl-8 border border-gray-300 mr-1 rounded-md"
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
                                                    Visibility to all tickets
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                
                                <div className={classNames(
                                    state.input.ticket_access === 'RST' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                    "flex-1 min-w-0 p-4 pl-8 border border-gray-300 ml-1 rounded-md"
                                )}>
                                    <div className="w-full flex">
                                        {
                                            (state.input.access_group === 'A') ? (
                                                <input
                                                    id="restricted_access"
                                                    name="ticket_access"
                                                    type="radio"
                                                    value="RST"
                                                    disabled={
                                                        (state.input.access_group === 'A') ? 
                                                            false
                                                        : (state.input.access_group === 'L') ?
                                                            false
                                                        :
                                                            false
                                                    }
                                                    className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                />
                                            ) : (state.input.access_group === 'L') ? (
                                                <input
                                                    id="restricted_access"
                                                    name="ticket_access"
                                                    type="radio"
                                                    value="RST"
                                                    className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                />
                                            ) : (
                                                <input
                                                    id="restricted_access"
                                                    name="ticket_access"
                                                    type="radio"
                                                    value="RST"
                                                    checked={
                                                        (state.input.access_group === 'A') ? 
                                                            false
                                                        : (state.input.access_group === 'L') ?
                                                            true
                                                        :
                                                            false
                                                    }
                                                    disabled={
                                                        (state.input.access_group === 'A') ? 
                                                            false
                                                        : (state.input.access_group === 'L') ?
                                                            false
                                                        :
                                                            false
                                                    }
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
                                                    Visibility to assigned tickets
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {state.errors.ticket_access.length > 0 && 
                                <span className='invalid-feedback font-small text-red-600 pl-0'>
                                    {state.errors.ticket_access}
                                </span>
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









                    </form>
                ) : (
                    <div className="flex flex-col align-middle mt-24 w-full h-16">
                        <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                    </div>
                )
            }
            
        </React.Fragment>
    )
}

export default CreateAuthorizationTeam