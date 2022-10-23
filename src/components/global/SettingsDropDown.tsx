import { Menu, Transition } from "@headlessui/react"
import React, { Fragment, useState } from "react"
import { Link } from "react-router-dom"
import { ACCOUNT_AUTH_TEAM_RIGHTS } from "../../api/ApiRegistry"
import { APPLICATION_NAME } from "../../global/ConstantsRegistry"
import { accountRoutes } from "../../routes/settings/accountRoutes"
import { generalRoutes } from "../../routes/settings/generalRoutes"
import HttpServices from "../../services/HttpServices"
import Loading from "../layouts/Loading"
import {ACCOUNT_TEAM_RIGHTS} from "../../api/accountApiRoutes";

export const SettingsDropDown = ({ show }) => {
    const [state, setstate] = useState({
        status: 'pending',
        rights: {
            agents: null,
            products: null
        }
    })

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const fetchAuthorizationTeamRightsApiCall = async () => {
        try {
            const response = await HttpServices.httpGet(ACCOUNT_TEAM_RIGHTS)
            const payload = response.data.payload

            let { rights } = state
            let status = state.status

            rights.agents = payload.agents
            rights.products = payload.products
            status = 'fulfilled'

            setstate({
                ...state, rights, status
            })
        } catch (error) {
            setstate({
                ...state, status: 'rejected'
            })
        }
    }

    React.useEffect(() => {
        if (show) {
            fetchAuthorizationTeamRightsApiCall()
        }
    }, [show]);
    
    const agentAccountRoute: any = (accountRoutes.find((routeName) => routeName.name === 'AGNT'))?.path
    const productManagementRoute: any = (generalRoutes.find((routeName) => routeName.name === 'PROD'))?.path
    const companyGroupsRoute: any = (generalRoutes.find((routeName) => routeName.name === 'CMPNY'))?.path

    return (
        <React.Fragment>
            <Transition
                show={show}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-2">
                        <p className="m-auto text-lg px-4 py-2 text-emerald-600">
                            Settings
                        </p>

                        {
                            state.status === 'rejected' ? (
                                <>

                                </>
                            ) : state.status === 'pending' ? (
                                <div className="py-5 mb-4">
                                    <Loading />
                                </div>
                            ) : (
                                <>
                                    <p className="m-auto text-sm px-4 py-1 text-slate-500">
                                        Administrative
                                    </p>

                                    {
                                        state.rights.agents.onboard_agent === 'Y' || state.rights.agents.edit_agent === 'Y' || state.rights.agents.suspend_agent === 'Y' ? (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link 
                                                    target="_blank"
                                                    to={agentAccountRoute}
                                                    className={classNames(
                                                        active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                        'px-4 py-2 text-sm text-left w-full block'
                                                    )}
                                                    >
                                                        <span className="flex flex-row pl-1">
                                                            <span className="w-7 mt-1">
                                                                <i className="fal m-auto fa-user-crown text-base"></i>
                                                            </span>

                                                            <span className="ml-3 flex-auto">
                                                                Agent Accounts Management

                                                                <span className="block truncate text-xs text-slate-400">
                                                                    Agent accounts management
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ) : null
                                    }

                                    {
                                        state.rights.products.create_product === 'Y' || state.rights.products.edit_product === 'Y' || state.rights.products.suspend_product === 'Y' ? (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link 
                                                    target="_blank"
                                                    to={productManagementRoute}
                                                    className={classNames(
                                                        active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                        'px-4 py-2 text-sm text-left w-full block'
                                                    )}
                                                    >
                                                        <span className="flex flex-row pl-1">
                                                            <span className="w-7 mt-1">
                                                                <i className="fal m-auto fa-box-full text-base"></i>
                                                            </span>

                                                            <span className="ml-3 flex-auto">
                                                                Product Management

                                                                <span className="block truncate text-xs text-slate-400">
                                                                    Manage your organizations products
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ) : null
                                    }

                                    {
                                        state.rights.products.create_product === 'Y' || state.rights.products.edit_product === 'Y' || state.rights.products.suspend_product === 'Y' ? (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link 
                                                    target="_blank"
                                                    to={companyGroupsRoute}
                                                    className={classNames(
                                                        active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                        'px-4 py-2 text-sm text-left w-full block'
                                                    )}
                                                    >
                                                        <span className="flex flex-row pl-1">
                                                            <span className="w-7 mt-1">
                                                                <i className="fal m-auto fa-warehouse-alt text-base"></i>
                                                            </span>

                                                            <span className="ml-3 flex-auto">
                                                                Company Groups Management

                                                                <span className="block truncate text-xs text-slate-400">
                                                                    Your organization's enlisted companies
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ) : null
                                    }

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={classNames(
                                                active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                'px-4 py-2 text-sm text-left w-full block'
                                            )}
                                            >
                                                <span className="flex flex-row pl-1">
                                                    <span className="w-7 mt-1">
                                                        <i className="fal m-auto fa-acorn text-base"></i>
                                                    </span>

                                                    <span className="ml-3 flex-auto">
                                                        Escalation Matrices

                                                        <span className="block truncate text-xs text-slate-400">
                                                            Add users, authorization teams and manage...
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <p className="m-auto text-sm px-4 py-1 text-slate-500">
                                        {APPLICATION_NAME} Settings
                                    </p>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button className={classNames(
                                                active ? 'bg-slate-100 text-slate-800' : 'text-slate-700',
                                                'px-4 py-2 text-sm text-left w-full block'
                                            )}
                                            >
                                                <span className="flex flex-row pl-1">
                                                    <span className="w-7 mt-1">
                                                        <i className="fal m-auto fa-server text-base"></i>
                                                    </span>

                                                    <span className="ml-3 flex-auto">
                                                        System Configurations

                                                        <span className="block truncate text-xs text-slate-400">
                                                            General configurations, authorization and permi...
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                        )}
                                    </Menu.Item>
                                </>
                            )
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </React.Fragment>
    )
}