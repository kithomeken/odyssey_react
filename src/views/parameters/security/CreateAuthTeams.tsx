import React, {Component} from 'react'
import { Helmet } from 'react-helmet'

import ApiService from "../../../services/ApiServices"
import HttpService from "../../../services/HttpServices"
import BreadCrumbs from '../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../components/layouts/parameters/Header'
import {securityRoutes} from '../../../routes/parameters/securityRoutes'

import TicketsRights from './modules/TicketsRights'
import EscalationRights from './modules/EscalationRights'
import Error500 from '../../errors/500'
import AdministativeRights from './modules/AdministrativeRights'

const apiHeader = ApiService.apiDomain()

class CreateAuthTeams extends Component {
    state = {
        loading: true,
        errorMode: false,
        activeTab: 'tickets',
        postingFormData: false,
        supportFeatures: {
            announcements: null,
            client_access: null,
            client_escalations: null,
            create_company_profile: null,
            escalation_access: null,
            field_agent: null,
        },
        input: {
            name: null,
            description: null,
            field_agent: null,
            access_group: null,
            ticket_access: null,
            delete_comments: null,
            whos_comments: null,
        },
        errors: {
            name: '',
            description: '',
            access_group: '',
            ticket_access: '',
            delete_comments: '',
            whos_comments: '',
        },
        checked: {
            globalTicketAccess: false
        },
    }

    constructor(props: any) {
        super(props)
        this.onChangeHandler = this.onChangeHandler.bind(this)
    }

    render() {
        const authenticationRoutes = securityRoutes[0].path
        const activeTab = this.state.activeTab
        const loading = this.state.loading
        const errorMode = this.state.errorMode
        const {errors} = this.state;

        const pageTitle = "Create Auth Teams"
        const showButton = false
        const breadCrumb = [
            { linkItem: true, title: "Security Settings", url: authenticationRoutes },
            { linkItem: true, title: "Auth Teams", url: authenticationRoutes },
            { linkItem: false, title: "Create Auth Teams" },
        ]

        return(
            <React.Fragment>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle} showButton={showButton} />


                <div className="w-full mb-2">
                    <div className="w-9/12">
                        <p className="text-sm form-group mb-0 text-gray-500">
                            When creating an Auth Team, you're free to set limited or lifetime access for your agents and restrict the resources at their disposal. Once created, you will be able to add agents into the Auth Teams.
                        </p>
                    </div>
                </div>

                {
                    loading ? (
                        <div className="flex flex-col align-middle mt-4 w-9/12 h-16">
                            <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                        </div>
                    ) : (
                        errorMode ? (
                            <div className="flex flex-col align-middle mt-4 w-9/12">
                                <Error500 />
                            </div>
                        ) : (
                            <form className="w-9/12 form-group" onSubmit={this.onFormSubmitHandler}>
                                <p className="text-green-500 mb-2">Team Details</p>

                                <div className="w-full ml-4 form-group">
                                    <div className="w-12/12 rounded-md shadow-none space-y-px form-group">
                                        <label htmlFor="team-name" className="block mb-1 text-sm">Team Name</label>
                                        <input type="text" name="name" id="team-name" autoComplete="off" onChange={this.onChangeHandler} className="focus:ring-2 focus:ring-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Team Name" />

                                        {errors.name.length > 0 && 
                                            <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                {errors.name}
                                            </span>
                                        }
                                    </div>

                                    <div className="w-12/12 rounded-md shadow-none space-y-px form-group">
                                        <label htmlFor="team-name" className="block mb-1 text-sm">Description</label>
                                        <textarea name="description" id="team-name" rows={2} autoComplete="off" onChange={this.onChangeHandler} className="focus:border-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Description" ></textarea>

                                        {errors.description.length > 0 && 
                                            <span className='invalid-feedback font-small text-red-600 pl-0'>
                                                {errors.description}
                                            </span>
                                        }
                                    </div>

                                    {
                                        this.state.supportFeatures.field_agent === 'Y' ? (
                                            <div className="w-9/12 mb-4">
                                                <div className="flex items-start">
                                                    <input
                                                        id="field_agent"
                                                        name="field_agent"
                                                        type="checkbox"
                                                        onChange={this.onChangeHandler}
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
                                
                                <p className="text-green-500 mb-2">Access Type</p>

                                <div className="w-full ml-4 form-group">
                                    <p className="text-sm mb-1 text-gray-500">
                                        Control users' access to the system by setting an Access Type applicable to each.
                                    </p>

                                    <p className="text-sm mb-1 text-gray-500">
                                        <span className="text-black">All Time Access</span> users will have lifetime access to the system with periodic password resets as defined by the set Password Policies.
                                    </p>

                                    <p className="text-sm form-group text-gray-500">
                                        <span className="text-black"> Limited Time Access</span> users will have a 30 day span access to the system from account activation, after which their accounts will be de-activated. You can, however, extend a users access if need be.
                                    </p>

                                    <div className="flex items-center w-full">
                                        <div className={this.classNames(
                                            this.state.input.access_group === 'A' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                            "flex-1 min-w-0 p-4 pl-8 border border-gray-300 mr-1 rounded-md"
                                        )}>
                                            <div className="w-full flex">
                                                <input
                                                    id="all_access"
                                                    name="access_group"
                                                    type="radio"
                                                    value="A"
                                                    onChange={this.onChangeHandler}
                                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-2 form-control checked:border-green-500 checked:bg-green-500 focus:ring-green-500 focus:bg-green-500 border-gray-300 rounded"
                                                />

                                                <label htmlFor="all_access" className="ml-2 text-sm text-gray-500">
                                                    <span className="custom-radio-button-label text-black">
                                                        All Time Access
                                                    </span>

                                                    <div className="font-smaller text-secondary">
                                                        <span className="acs-psd">
                                                            User's account does not expire
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className={this.classNames(
                                            this.state.input.access_group === 'L' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                            "flex-1 min-w-0 p-4 pl-8 border border-gray-300 ml-1 rounded-md"
                                        )}>
                                            <div className="w-full flex">
                                                <input
                                                    id="limited_access"
                                                    name="access_group"
                                                    type="radio"
                                                    value="L"
                                                    onChange={this.onChangeHandler}
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
                                    </div>

                                    {errors.access_group.length > 0 && 
                                        <span className='invalid-feedback font-small text-red-600 pl-0'>
                                            {errors.access_group}
                                        </span>
                                    }
                                </div>

                                <p className="text-green-500 mb-2">Ticket Access</p>

                                <div className="w-full ml-4 form-group">
                                    <p className="text-sm mb-1 text-gray-500">
                                        Control users' access to tickets raised by selecting a Ticket Access method.
                                    </p>

                                    <p className="text-sm mb-1 text-gray-500">
                                        <span className="text-black">Global Access</span> users can access all tickets raised in Odyssey regardless of who raised them or whether they are/were assigned to them.
                                    </p>

                                    <p className="text-sm form-group text-gray-500">
                                        <span className="text-black">Restricted Access</span> users will ONLY have access to the tickets assigned to them.
                                    </p>

                                    <div className="flex items-center w-full">
                                        <div className={this.classNames(
                                            this.state.input.ticket_access === 'GLB' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                            "flex-1 min-w-0 p-4 pl-8 border border-gray-300 mr-1 rounded-md"
                                        )}>
                                            <div className="w-full flex">
                                                <input
                                                    id="global_access"
                                                    name="ticket_access"
                                                    type="radio"
                                                    value="GLB"
                                                    onChange={this.onChangeHandler}
                                                    disabled={
                                                        this.state.input.access_group === 'A' ? (
                                                            false
                                                        ) : (
                                                            true
                                                        )
                                                    }
                                                    className={this.classNames(
                                                        (this.state.input.access_group === 'A') ? null : 'cursor-not-allowed',
                                                        "h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                    )}
                                                />

                                                <label htmlFor="global_access" className="ml-2 text-sm text-gray-500">
                                                    <span className={this.classNames(
                                                        (this.state.input.access_group === 'A') ? 'text-black' : 'cursor-not-allowed text-gray-500',
                                                        "custom-radio-button-label"
                                                    )}>
                                                        Global Access
                                                    </span>

                                                    <div className="font-smaller text-secondary">
                                                        <span className="acs-psd">
                                                            Access all tickets in the system
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div className={this.classNames(
                                            this.state.input.ticket_access === 'RST' ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white',
                                            "flex-1 min-w-0 p-4 pl-8 border border-gray-300 ml-1 rounded-md"
                                        )}>
                                            <div className="w-full flex">
                                                {
                                                    (this.state.input.access_group === 'A') ? (
                                                        <input
                                                            id="restricted_access"
                                                            name="ticket_access"
                                                            type="radio"
                                                            value="RST"
                                                            onChange={this.onChangeHandler}
                                                            disabled={
                                                                (this.state.input.access_group === 'A') ? 
                                                                    false
                                                                : (this.state.input.access_group === 'L') ?
                                                                    false
                                                                :
                                                                    false
                                                            }
                                                            className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                        />
                                                    ) : (this.state.input.access_group === 'L') ? (
                                                        <input
                                                            id="restricted_access"
                                                            name="ticket_access"
                                                            type="radio"
                                                            value="RST"
                                                            onChange={this.onChangeHandler}
                                                            checked={
                                                                (this.state.input.access_group === 'A') ? 
                                                                    false
                                                                : (this.state.input.access_group === 'L') ?
                                                                    true
                                                                :
                                                                    false
                                                            }
                                                            disabled={
                                                                (this.state.input.access_group === 'A') ? 
                                                                    false
                                                                : (this.state.input.access_group === 'L') ?
                                                                    false
                                                                :
                                                                    false
                                                            }
                                                            className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                        />
                                                    ) : (
                                                        <input
                                                            id="restricted_access"
                                                            name="ticket_access"
                                                            type="radio"
                                                            value="RST"
                                                            onChange={this.onChangeHandler}
                                                            checked={
                                                                (this.state.input.access_group === 'A') ? 
                                                                    false
                                                                : (this.state.input.access_group === 'L') ?
                                                                    true
                                                                :
                                                                    false
                                                            }
                                                            disabled={
                                                                (this.state.input.access_group === 'A') ? 
                                                                    false
                                                                : (this.state.input.access_group === 'L') ?
                                                                    false
                                                                :
                                                                    false
                                                            }
                                                            className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                                        />
                                                    )
                                                }

                                                <label htmlFor="restricted_access" className="ml-2 text-sm text-gray-500">
                                                    <span className={this.classNames(
                                                        (this.state.input.access_group === 'A') ? 
                                                            'text-black'
                                                        : (this.state.input.access_group === 'L') ?
                                                            'text-black'
                                                        : 
                                                            'cursor-not-allowed text-gray-500',
                                                        "custom-radio-button-label"
                                                    )}>
                                                        Restricted Access
                                                    </span>

                                                    <div className="font-smaller text-secondary">
                                                        <span className="acs-psd">
                                                            Only access tickets assigned to them
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {errors.ticket_access.length > 0 && 
                                        <span className='invalid-feedback font-small text-red-600 pl-0'>
                                            {errors.ticket_access}
                                        </span>
                                    }
                                </div>

                                <p className="text-green-500 mb-2">Grants & Access Rights</p>

                                <div className="w-full flex flex-row">
                                    <div className="w-auto cursor-pointer" onClick={() => this.activateTab('tickets')}>
                                        <button type="button" className={this.classNames(
                                            activeTab === 'tickets' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                        )}>
                                            <span className="lolrtn robot">Ticket Rights</span>
                                        </button>
                                    </div>

                                    <div className="w-auto cursor-pointer" onClick={() => this.activateTab('escalations')}>
                                        <button type="button" className={this.classNames(
                                            activeTab === 'escalations' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                        )}>
                                            <span className="lolrtn robot">Escalation Rights</span>
                                        </button>
                                    </div>

                                    <div className="w-auto cursor-pointer" onClick={() => this.activateTab('administrative')}>
                                        <button type="button" className={this.classNames(
                                            activeTab === 'administrative' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                                        )}>
                                            <span className="lolrtn robot">Administrative Rights</span>
                                        </button>
                                    </div>

                                    <div className="flex-grow border-b-2">

                                    </div>
                                </div>

                                <div className="w-full px-3">
                                    {this.loadRespectiveTab(activeTab)}
                                </div>

                                <div className="w-full">
                                    {
                                        this.state.postingFormData ? (
                                            <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300`} disabled={true}>
                                                <span>                                                    
                                                    <span className="left-0 inset-y-0 flex items-center pl-3">
                                                        <span className="pr-2">
                                                            Creating Team
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
                                                    Create Auth Team
                                                </span>
                                            </button>
                                        )
                                    }                                    
                                </div>
                            </form>                            
                        )
                    )
                }

            </React.Fragment>
        )
    }

    onFormSubmitHandler = (e: any) => {
        e.preventDefault()

        if (this.onFormValidation()) {
            this.setState({
                postingFormData: true
            })

            console.log(this.state.input)
            this.postFormData()
        } else {
            this.setState({
                postingFormData: false
            })
        }
    }

    async postFormData() {
        try {
            let input = this.state.input
            let apiToBeConsumed = apiHeader + `portal/a/site-master/security/auth-team/create`
            const response: any = await HttpService.httpPost(apiToBeConsumed, input)
            console.log(response)

            if (response.data.success) {
                // show success toast
            } else {
                // show failed toast
            }
        } catch (error) {
            // show failed toast
            console.log(error)
        }
    }
    
    onFormValidation = () => {
        let {input} = this.state
        let errors = this.state.errors
        let isFormValid = true

        if (!input['name']) {
            isFormValid = false
            errors.name = 'Please enter a team name'
        } else {
            errors.name = ''
        }

        if (!input['description']) {
            isFormValid = false
            errors.description = 'Please enter a team description'
        } else {
            errors.description = ''
        }

        if (!input['access_group']) {
            isFormValid = false
            errors.access_group = 'Please select an access group'
        } else {
            errors.access_group = ''
        }

        if (!input['ticket_access']) {
            isFormValid = false
            errors.ticket_access = 'Please select a ticket access method'
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

        this.setState({
            errors: errors
        })

        return isFormValid
    }

    onChangeHandler = (e: any) => {
        let {input}: any = this.state
        let {errors}: any = this.state
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

        this.changeRadio(e.target.name)
        this.setState({
            input
        })
    }

    changeRadio(targetName: string) {
        let {input}: any = this.state
        let {checked}: any = this.state

        switch(targetName) {
            case 'access_group':
                if (this.state.input.access_group === 'L') {
                    input['ticket_access'] = 'RST'
                    checked['globalTicketAccess'] = true
                } else {
                    input['ticket_access'] = null
                }
        }
    }

    componentDidMount() {
        this.supportFeaturesApiCall()

        this.setState({
            activeTab: 'tickets'
        })
    }

    classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    activateTab(tabName: any) {
        this.setState({
            activeTab: tabName
        })
    }

    loadRespectiveTab(tabName = 'tickets') {
        switch (tabName) {
            case 'tickets':
                return <TicketsRights 
                inputs={this.state.input}
                errors={this.state.errors}
                onChangeHandler={this.onChangeHandler}
                supportFeatures={this.state.supportFeatures}
                />
            
            case 'escalations':
                return <EscalationRights 
                inputs={this.state.input}
                onChangeHandler={this.onChangeHandler}
                supportFeatures={this.state.supportFeatures}
                />

            case 'administrative':
                return <AdministativeRights 
                inputs={this.state.input}
                onChangeHandler={this.onChangeHandler}
                supportFeatures={this.state.supportFeatures}
                />

            default:
                return null
        }
    }

    async supportFeaturesApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/all`
            const response : any = await HttpService.httpGet(apiConsumed)
            
            if (response.data.success) {
                const data = response.data.data

                this.setState({
                    loading: false,
                    supportFeatures: {
                        announcements: data.announcements,
                        client_access: data.client_access,
                        client_escalations: data.client_escalations,
                        create_company_profile: data.create_company_profile,
                        escalation_access: data.escalation_access,
                        field_agent: data.field_agent,
                    }
                })
            } else {
                this.setState({
                    loading: false,
                    errorMode: true,
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                loading: false,
                errorMode: true,
            })
        }
    }
}

export default CreateAuthTeams