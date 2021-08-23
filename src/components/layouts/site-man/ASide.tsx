import React, {Component} from "react"
import {Link} from 'react-router-dom'

class ASide extends Component {
    render () {
        const letterSpacing = {letterSpacing: '0.40px!important'}
        const marginTop = {
            marginTop: '65px',
            postion: 'fixed',
            zIndex: 5
        }

        return (
            <React.Fragment>
                <div className="flex flex-col h-screen md:w-72 text-gray-700 flex-shrink-0 bg-gray-100 decoration-clone fixed" style={letterSpacing}>
                    <nav className="flex-grow md:block px-5 py-4 md:pb-0 md:overflow-y-auto" style={marginTop}>
                        <Link to="/home" className="mt-0 p-3 flex items-start rounded-lg mx-0 mb-2 border-none hover:border-none" style={letterSpacing}>
                            <h6 className="lan-1 mb-0 text-base font-medium text-green-900">
                                <i className="fas fa-arrow-circle-left mr-3 lolrtn"></i>
                                <span className="lolrtn robot">Back To Portal</span>
                            </h6>
                        </Link>

                        <hr className="border-gray-300" />

                        <p className="text-gray-500 mb-0 mt-3 font-small" style={letterSpacing}>
                            User Maintenance
                        </p>

                        <Link to="/a/default/site-manager/user-maintenance/agents" className="mt-3 p-3 pl-3 flex aside-link-title rounded-lg hover:bg-gray-300 mx-0 border-none hover:border-none items-center">
                            <div className="flex-shrink-0 h-5 w-5 mb-0 justify-items-center">
                                <i className="far fa-user-circle"></i>
                            </div>

                            <p className="text-sm font-bold ml-3 text-gray-900">
                                Agents
                            </p>
                        </Link>

                        <Link to="/a/default/site-manager/user-maintenance/access-teams" className="p-3 pl-3 flex rounded-lg aside-link-title hover:bg-gray-300 mx-0 border-none hover:border-none items-center">
                            <div className="flex-shrink-0 h-5 w-5 mb-0 justify-items-center">
                                <i className="far fa-universal-access"></i>
                            </div>

                            <p className="text-sm font-bold ml-3 text-gray-900">
                                Access Teams
                            </p>
                        </Link>

                        <Link to="/a/default/site-manager/user-maintenance/portal-clients" className="p-3 pl-3 flex rounded-lg aside-link-title hover:bg-gray-300 mx-0 border-none hover:border-none items-center">
                            <div className="flex-shrink-0 h-5 w-5 mb-0 justify-items-center">
                                <i className="far fa-user-crown"></i>
                            </div>

                            <p className="text-sm font-bold ml-3 text-gray-900">
                                Portal Clients
                            </p>
                        </Link>

                        <p className="text-gray-500 mt-3 mb-3 font-small" style={letterSpacing}>
                            General Settings
                        </p>

                        <Link to="/a/default/site-manager/user-maintenance/agents" className="p-3 pl-3 flex rounded-lg aside-link-title hover:bg-gray-300 mx-0 border-none hover:border-none items-center">
                            <div className="flex-shrink-0 h-5 w-5 mb-0 justify-items-center">
                                <i className="far fa-copyright"></i>
                            </div>

                            <p className="text-sm font-bold ml-3 text-gray-900">
                                Organizational Details
                            </p>
                        </Link>

                        <Link to="/a/default/site-manager/user-maintenance/agents" className="p-3 pl-3 flex rounded-lg aside-link-title hover:bg-gray-300 mx-0 border-none hover:border-none items-center">
                            <div className="flex-shrink-0 h-5 w-5 mb-0 justify-items-center">
                                <i className="far fa-registered"></i>
                            </div>

                            <p className="text-sm font-bold ml-3 text-gray-900">
                                Company Groups
                            </p>
                        </Link>

                        <Link to="/a/default/site-manager/user-maintenance/agents" className="p-3 pl-3 flex rounded-lg aside-link-title hover:bg-gray-300 mx-0 border-none hover:border-none items-center">
                            <div className="flex-shrink-0 h-5 w-5 mb-0 justify-items-center">
                                <i className="far fa-megaphone"></i>
                            </div>

                            <p className="text-sm font-bold ml-3 text-gray-900">
                                Announcements
                            </p>
                        </Link>

                        <p className="text-gray-500 mt-3 mb-3 font-small" style={letterSpacing}>
                            Security
                        </p>

                        <Link to="/a/default/site-manager/user-maintenance/agents" className="p-3 pl-3 flex rounded-lg aside-link-title hover:bg-gray-300 mx-0 border-none hover:border-none items-center">
                            <div className="flex-shrink-0 h-5 w-5 mb-0 justify-items-center">
                                <i className="far fa-unlock-alt"></i>
                            </div>

                            <p className="text-sm font-bold ml-3 text-gray-900">
                                Password Policies
                            </p>
                        </Link>

                        <p className="text-gray-500 mt-3 mb-3 font-small" style={letterSpacing}>
                            Features
                        </p>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
}

export default ASide