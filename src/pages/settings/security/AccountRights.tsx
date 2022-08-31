import React, { FC } from "react"

interface Props {
    state: any,
    support: any,
    disableCheckbox: boolean,
    agentCheckboxHandler: any,
}

export const AccountRights: FC<Props> = ({ state, support, disableCheckbox, agentCheckboxHandler }) => {
    return (
        <React.Fragment>
            <div className="w-full py-1">
                <h2 className="text-lg leading-7 text-emerald-600 sm:text-lg">
                    Account Management Rights
                </h2>

                <p className="text-sm leading-7 text-slate-600 sm:text-lg sm: pb-5">
                    Account management functionalities that users can undertake
                </p>

                {
                    support.allow_client_access === 'Y' ? (
                        <>
                            <div className="w-full pb-2 pl-5">
                                <div className="w-full mb-2">
                                    <span className="text-sm text-emerald-600 block">
                                        Client Accounts Rights
                                    </span>
                                </div>

                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="onboard_client"
                                                onChange={agentCheckboxHandler}
                                                disabled={disableCheckbox}
                                                // checked={state.client.onboard_client === 'Y' ? true : false}
                                                name="onboard_client"
                                                type="checkbox"
                                                className="h-4 w-4 mt-1 cursor-pointer checked:bg-green-500 text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="onboard_client" className="ml-4 block text-sm text-gray-800">
                                                Onboard new clients to the system

                                                <span className="block text-xs text-gray-500">
                                                    Can onboard new client users into the system
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="edit_client"
                                                onChange={agentCheckboxHandler}
                                                disabled={disableCheckbox}
                                                // checked={state.client.edit_client === 'Y' ? true : false}
                                                name="edit_client"
                                                type="checkbox"
                                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="edit_client" className="ml-4 block text-sm text-gray-800">
                                                Edit client accounts

                                                <span className="block text-xs text-gray-500">
                                                    Can make changes to the client account details
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex">
                                            <input
                                                id="suspend_client"
                                                onChange={agentCheckboxHandler}
                                                disabled={disableCheckbox}
                                                // checked={state.client.suspend_client === 'Y' ? true : false}
                                                name="suspend_client"
                                                type="checkbox"
                                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="suspend_client" className="ml-4 block text-sm text-gray-800">
                                                Blacklist clients

                                                <span className="block text-xs text-gray-500">
                                                    Can change the status of a client account to blacklisted
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null
                }

                <div className="w-full mb-3 pl-5">
                    <div className="w-full mb-2">
                        <span className="text-sm text-emerald-600 block">
                            Agent Accounts
                        </span>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex">
                                <input
                                    id="onboard_agent"
                                    onChange={agentCheckboxHandler}
                                    disabled={disableCheckbox}
                                    checked={state.agent.onboard_agent === 'Y' ? true : false}
                                    name="onboard_agent"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="onboard_agent" className="ml-4 block text-sm text-gray-800">
                                    Onboard new agents to the system

                                    <span className="block text-xs text-gray-500">
                                        Can send invites to new agents to join
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex">
                                <input
                                    id="edit_agent"
                                    onChange={agentCheckboxHandler}
                                    disabled={disableCheckbox}
                                    checked={state.agent.edit_agent === 'Y' ? true : false}
                                    name="edit_agent"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="edit_agent" className="ml-4 block text-sm text-gray-800">
                                    Edit agent accounts details

                                    <span className="block text-xs text-gray-500">
                                        Can make changes to the agent account details, with the exception of master accounts.
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex">
                                <input
                                    id="change_auth_team"
                                    onChange={agentCheckboxHandler}
                                    disabled={disableCheckbox}
                                    checked={state.agent.change_auth_team === 'Y' ? true : false}
                                    name="change_auth_team"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="change_auth_team" className="ml-4 block text-sm text-gray-800">
                                    Change account Auth Team

                                    <span className="block text-xs text-gray-500">
                                        Can move an agent account from one Authorization Team to another. 
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex">
                                <input
                                    id="suspend_agent"
                                    onChange={agentCheckboxHandler}
                                    disabled={disableCheckbox}
                                    checked={state.agent.suspend_agent === 'Y' ? true : false}
                                    name="suspend_agent"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="suspend_agent" className="ml-4 block text-sm text-gray-800">
                                    Suspend agents

                                    <span className="block text-xs text-gray-500">
                                        Can suspend agent accounts, with the exception of master accounts.
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}