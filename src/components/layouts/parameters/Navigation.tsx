import React, {Component} from "react"
import {Link} from 'react-router-dom'

import {securityRoutes} from '../../../routes/parameters/securityRoutes'
// import {userMaintenanceRoutes} from '../../../routes/site-man/userMaintenanceRoutes'
import {featuresRoutes} from '../../../routes/parameters/featuresRoutes'
import {generalRoutes} from '../../../routes/parameters/generalRoutes'

interface Props {
    activeMenu: any,
}

class SideBar extends Component<Props> {
    state = {
        activeMenu: this.props.activeMenu
    }

    classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    render() {
        let activeMenu = this.state.activeMenu

        return (
            <React.Fragment>
                <div className="flex flex-col h-screen w-72 text-gray-900 border-r-2 flex-shrink-0 z-10 bg-white decoration-clone fixed">
                    <div className="block px-5">
                        <Link to="" className="my-0 p-2 pl-0 w-full block mx-0 border-none">
                            <span className="lan-1 mb-0 lolrtn nunito text-green-500 text-2xl font-bold block">
                                Odyssey
                            </span>

                            <span className="lan-1 mb-0 lolrtn text-gray-800 text-xs block tracking-widest">
                                Site Manager
                            </span>
                        </Link>
                    </div>

                    <nav className="flex-grow block px-5 pt-0 pb-4 h-screen overflow-y-auto">
                        <div className="w-full">
                            <span className="lan-1 mb-0 mt-3 lolrtn text-gray-500 text-xs block tracking-widest">
                                User Maintenance
                            </span>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'agents' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-user-circle"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Agents
                                </p>
                            </Link>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'clients' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-1 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-user-crown"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Clients
                                </p>
                            </Link>
                        </div>

                        <div className="w-full">
                            <span className="lan-1 mb-0 mt-3 lolrtn text-gray-500 text-xs block tracking-widest">
                                General Settings
                            </span>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'organization' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-copyright "></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Organizational Details
                                </p>
                            </Link>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'company-groups' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-registered"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Company Groups
                                </p>
                            </Link>

                            <Link to={generalRoutes[0].path}  className={this.classNames(
                                activeMenu === 'products' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-box-full"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Product Management
                                </p>
                            </Link>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'announcements' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-megaphone"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Announcements
                                </p>
                            </Link>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'escalations' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-exclamation-circle"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Escalations Settings
                                </p>
                            </Link>
                        </div>

                        <div className="w-full">
                            <span className="lan-1 mb-0 mt-3 lolrtn text-gray-500 text-xs block tracking-widest">
                                Ticket Settings
                            </span>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'organization' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-betamax "></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Ticket Types
                                </p>
                            </Link>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'organization' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-album-collection "></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Ticket Statuses
                                </p>
                            </Link>

                        </div>

                        <div className="w-full">
                            <span className="lan-1 mb-0 mt-3 lolrtn text-gray-500 text-xs block tracking-widest">
                                Security Settings
                            </span>

                            <Link to={securityRoutes[2].path} className={this.classNames(
                                activeMenu === 'pwd-policies' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-lock"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Password Policies
                                </p>
                            </Link>

                            <Link to={securityRoutes[0].path} className={this.classNames(
                                activeMenu === 'teams' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-universal-access"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Auth Teams
                                </p>
                            </Link>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'clients' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-1 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-user-lock"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Master Accounts
                                </p>
                            </Link>
                        </div>

                        <div className="w-full">
                            <span className="lan-1 mb-0 mt-3 lolrtn text-gray-500 text-xs block tracking-widest">
                                Features
                            </span>

                            <Link to={featuresRoutes[0].path} className={this.classNames(
                                activeMenu === 'support' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-headset"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Support Features
                                </p>
                            </Link>

                            <Link to={featuresRoutes[1].path} className={this.classNames(
                                activeMenu === 'tickets' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-ticket"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Ticket Features
                                </p>
                            </Link>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'sla' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-business-time"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    SLA Features
                                </p>
                            </Link>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'sla' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-business-time"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Automation Rules
                                </p>
                            </Link>
                        </div>

                        <div className="w-full">
                            <span className="lan-1 mb-0 mt-3 lolrtn text-gray-500 text-xs block tracking-widest">
                                Payments
                            </span>

                            <Link to="/a/default/site-manager/user-maintenance/agents" className={this.classNames(
                                activeMenu === 'billing' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center mb-16'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-credit-card-front"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Billing Details
                                </p>
                            </Link>
                        </div>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
}

export default SideBar