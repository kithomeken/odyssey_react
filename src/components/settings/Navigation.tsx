import React, { Component } from "react"
import { Link } from "react-router-dom"
import { generalRoutes } from "../../routes/settings/generalRoutes"

interface Props {
    activeMenu: any
}

class Navigation extends Component<Props> {
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
                                General Settings
                            </span>

                            <Link to={generalRoutes[0].path} className={this.classNames(
                                activeMenu === 'organization' ? 'text-green-700 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                                'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                            )}>
                                <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                                    <i className="fal fa-copyright"></i>
                                </div>

                                <p className="ml-4 text-sm">
                                    Organizational Details
                                </p>
                            </Link>
                        </div>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
}

export default Navigation