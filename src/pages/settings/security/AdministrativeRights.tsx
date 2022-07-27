import React, { FC } from "react"

interface Props {
    support: any,
    stateFromParent: any,
    onCheckboxHandler: any,
    disableCheckbox: boolean,

}

export const AdministativeRights: FC<Props> = ({ stateFromParent, support, onCheckboxHandler, disableCheckbox }) => {
    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <React.Fragment>
            <div className="w-full py-1">
                <h2 className="text-sm leading-7 text-gray-700 sm:text-lg sm: mb-3">
                    Issue out administrative functionalities that users in this Auth Team can undertake.
                </h2>

                {
                    support.allow_client_access === 'Y' ? (
                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex items-center">
                                    <input
                                        id="onboard_client"
                                        onClick={onCheckboxHandler}
                                        disabled={disableCheckbox}
                                        checked={stateFromParent.adminRights.onboard_client === 'Y' ? true : false}
                                        name="onboard_client"
                                        type="checkbox"
                                        className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="onboard_client" className="ml-4 block text-sm text-gray-500">
                                        Onboard new clients to the system
                                    </label>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

                <div className="ml-6">
                    <div className="w-12/12 mb-4">
                        <div className="flex items-center">
                            <input
                                id="onboard_agents"
                                name="onboard_agents"
                                type="checkbox"
                                disabled={disableCheckbox}
                                onClick={onCheckboxHandler}
                                checked={stateFromParent.adminRights.onboard_agents === 'Y' ? true : false}
                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                            />

                            <label htmlFor="onboard_agents" className="ml-4 block text-sm text-gray-500">
                                Invite new user agents into the system
                            </label>
                        </div>
                    </div>
                </div>

                <div className="ml-6">
                    <div className="w-12/12 mb-4">
                        <div className="flex items-center">
                            <input
                                id="change_auth_team"
                                name="change_auth_team"
                                disabled={disableCheckbox}
                                onClick={onCheckboxHandler}
                                type="checkbox"
                                checked={stateFromParent.adminRights.change_auth_team === 'Y' ? true : false}
                                className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                            />

                            <label htmlFor="change_auth_team" className="ml-4 block text-sm text-gray-500">
                                Change a user's Authorization Team
                            </label>
                        </div>
                    </div>
                </div>

                {
                    support.allow_announcements === 'Y' ? (
                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex items-center">
                                    <input
                                        id="send_announcements"
                                        name="send_announcements"
                                        type="checkbox"
                                        onClick={onCheckboxHandler}
                                        disabled={disableCheckbox}
                                        checked={stateFromParent.adminRights.send_announcements === 'Y' ? true : false}
                                        className="h-4 w-4 mt-1 cursor-pointer text-green-600 disabled:cursor-not-allowed focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="send_announcements" className="ml-4 block text-sm text-gray-500">
                                        Send announcements to users in the system
                                    </label>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </React.Fragment>
    )
}