import React, {Component} from 'react'
import { Helmet } from 'react-helmet'

import BreadCrumbs from '../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../components/layouts/parameters/Header'
import {securityRoutes} from '../../../routes/parameters/securityRoutes'
import TicketsRights from './modules/TicketsRights'
import EscalationRights from './modules/EscalationRights'

class CreateAuthTeams extends Component {
    state = {
        activeTab: 'tickets',
        input: {
            name: null,
            description: null,
            field_agent: null,
            access_group: null,
            ticket_access: null,
        },
        enable: {
            ticketAccess: false
        },
        display: {
            accessGroup: null,
        }
    }

    render() {
        const authenticationRoutes = securityRoutes[0].path
        const activeTab = this.state.activeTab

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
                            When creating an agent team, you're free to set temporary or long term access for your agents and restrict the information at their disposal. Once created, you will be able to add agents into the teams.
                        </p>
                    </div>
                </div>

                <form className="w-9/12 form-group">
                    <p className="text-green-500 mb-2">Team Details</p>

                    <div className="w-full ml-4 form-group">
                        <div className="w-12/12 rounded-md shadow-none space-y-px form-group">
                            <label htmlFor="team-name" className="block mb-1 text-sm">Team Name</label>
                            <input type="text" name="name" id="team-name" autoComplete="off" onChange={this.onChangeHandler} className="focus:ring-2 focus:ring-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Team Name" />
                        </div>

                        <div className="w-12/12 rounded-md shadow-none space-y-px form-group">
                            <label htmlFor="team-name" className="block mb-1 text-sm">Description</label>
                            <textarea name="description" id="team-name" rows={2} autoComplete="off" onChange={this.onChangeHandler} className="focus:border-green-500 p-2 capitalize flex-1 block w-full text-sm rounded-md sm:text-sm border border-gray-300" placeholder="Description" ></textarea>
                        </div>

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
                    </div>
                    
                    <p className="text-green-500 mb-2">Access Group</p>

                    <div className="w-full ml-4 form-group">
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
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-2 checked:border-green-500 checked:bg-green-500 focus:ring-green-500 focus:bg-green-500 border-gray-300 rounded"
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
                    </div>

                    <p className="text-green-500 mb-2">Ticket Access</p>

                    <div className="w-full ml-4 form-group">
                        <div className="flex items-center w-full">
                            <div className="flex-1 min-w-0 p-4 pl-8 border border-gray-300 mr-1 rounded-md">
                                <div className="w-full flex">
                                    <input
                                        id="global_access"
                                        name="ticket_access"
                                        type="radio"
                                        value="GLB"
                                        onChange={this.onChangeHandler}
                                        disabled={this.state.enable.ticketAccess}
                                        className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="global_access" className="ml-2 text-sm text-gray-500">
                                        <span className="custom-radio-button-label text-black">
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
                            
                            <div className="flex-1 min-w-0 p-4 pl-8 border border-gray-300 ml-1 rounded-md">
                                <div className="w-full flex">
                                    <input
                                        id="restricted_access"
                                        name="ticket_access"
                                        type="radio"
                                        value="RST"
                                        onChange={this.onChangeHandler}
                                        disabled={true}
                                        className="h-4 w-4 mt-1 text-green-600 disabled:opacity-50 focus:ring-green-500 checked:bg-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="restricted_access" className="ml-2 text-sm text-gray-500">
                                        <span className="custom-radio-button-label text-black disabled:opacity-50">
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

                        <div className="flex-grow border-b-2">

                        </div>
                    </div>

                    <div className="w-full px-3">
                        {this.loadRespectiveTab(activeTab)}
                    </div>

                    <div className="w-full">

                    </div>

                </form>
            </React.Fragment>
        )
    }

    onChangeHandler = (e: any) => {
        let {input}: any = this.state
        input[e.target.name] = e.target.value

        let isCheckboxOrRadio: any = (e.target.type === 'checkbox') ? true : false;
        if (isCheckboxOrRadio) {
            if (e.target.checked) {
                input[e.target.name] = "Y"
                this.setState({
                    enable: {
                        ticketAccess: true
                    }
                })
            } else {
                input[e.target.name] = "N"
            }
        }

        this.setState({
            input
        })
    }

    componentDidMount() {
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
                return <TicketsRights />
            
            case 'escalations':
                return <EscalationRights />

            default:
                return null
        }
    }
}

export default CreateAuthTeams