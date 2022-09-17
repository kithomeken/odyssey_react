import React, { FC } from "react"
import { Link } from "react-router-dom"

import { accountRoutes } from "../../routes/settings/accountRoutes"
import { generalRoutes } from "../../routes/settings/generalRoutes"

interface Props {
    activeMenu: any
}

export const Special_Authorization_Navigation: FC<Props> = ({activeMenu}) => {
    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const AGNT_ACCOUNT_RT: any = (accountRoutes.find((routeName) => routeName.name === 'AGNT'))?.path
    const ANNOUNCEMENTS: any = (generalRoutes.find((routeName) => routeName.name === 'ANNC'))?.path
    const PRODUCT_MANAGEMENT: any = (generalRoutes.find((routeName) => routeName.name === 'PROD'))?.path
    const COMPANY_GROUPS: any = (generalRoutes.find((routeName) => routeName.name === 'CMPNY'))?.path

    return (
        <React.Fragment>
            <div className="flex flex-col h-screen lg:w-64 text-gray-900 border-0 shadow flex-shrink-0 z-20 bg-white decoration-clone fixed">
                <div className="block px-5">
                    <Link to="" className="my-0 p-2 pl-0 w-full block mx-0 border-none">
                        <span className="lan-1 mb-0 lolrtn nunito text-green-500 text-2xl font-bold block">
                            Odyssey
                        </span>

                        <span className="lan-1 mb-0 lolrtn text-gray-800 text-xs block tracking-widest">
                            Configurations
                        </span>
                    </Link>
                </div>

                <nav className="flex-grow block px-5 pt-0 pb-4 h-screen overflow-y-auto">
                    <Link to={AGNT_ACCOUNT_RT} className={classNames(
                        activeMenu === 'agents' ? 'text-green-900 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                        'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                    )}>
                        <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                            <i className="fal fa-user-circle"></i>
                        </div>

                        <p className="ml-4 text-sm">
                            Agent Accounts
                        </p>
                    </Link>
                    
                    <button className={classNames(
                        activeMenu === 'clients' ? 'text-green-900 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                        'mt-2 p-2 pl-4 flex aside-link-title w-full rounded-lg mx-0 border-none hover:border-none items-center'
                    )}>
                        <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                            <i className="fal fa-user-crown"></i>
                        </div>

                        <p className="ml-4 text-sm">
                            Client Accounts
                        </p>
                    </button>

                    <Link to={PRODUCT_MANAGEMENT} className={classNames(
                        activeMenu === 'products' ? 'text-green-900 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                        'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                    )}>
                        <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                            <i className="fal fa-box-full"></i>
                        </div>

                        <p className="ml-4 text-sm">
                            Products Management
                        </p>
                    </Link>

                    <Link to={COMPANY_GROUPS} className={classNames(
                        activeMenu === 'company' ? 'text-green-900 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                        'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                    )}>
                        <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                            <i className="fal fa-warehouse-alt"></i>
                        </div>

                        <p className="ml-4 text-sm">
                            Company Groups
                        </p>
                    </Link>

                    <Link to={ANNOUNCEMENTS} className={classNames(
                        activeMenu === 'announcements' ? 'text-green-900 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                        'mt-2 p-2 pl-4 flex aside-link-title rounded-lg mx-0 border-none hover:border-none items-center'
                    )}>
                        <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                            <i className="fal fa-megaphone"></i>
                        </div>

                        <p className="ml-4 text-sm">
                            Announcements
                        </p>
                    </Link>

                    <button className={classNames(
                        activeMenu === 'clients' ? 'text-green-900 bg-green-200' : 'text-gray-900 hover:bg-gray-200',
                        'mt-2 p-2 pl-4 flex aside-link-title w-full rounded-lg mx-0 border-none hover:border-none items-center'
                    )}>
                        <div className="flex-shrink-0 w-5 mb-0 justify-items-center">
                            <i className="fal fa-user-crown"></i>
                        </div>

                        <p className="ml-4 text-sm">
                            Escalation Matrix
                        </p>
                    </button>
                </nav>
            </div>
        </React.Fragment>
    )
}