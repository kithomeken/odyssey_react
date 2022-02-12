import React, { FC } from "react"

interface Props {
    input: any,
    errors: any,
    supportFeatures: any,
    onChangeHandler: any,
}

const AdministativeRights: FC<Props> = ({input, errors, supportFeatures, onChangeHandler}) => {
    return (
        <React.Fragment>
            <div className="w-full py-4">
                <h2 className="text-sm leading-7 text-gray-700 sm:text-lg sm: mb-3">
                    Issue out sets of administrative functionalities the users in this Auth Team can undertake.
                </h2>

                {
                    supportFeatures.client_access === 'Y' ? (
                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex items-center">
                                    <input
                                        id="add_client"
                                        name="add_client"
                                        type="checkbox"
                                        onChange={onChangeHandler}
                                        checked={
                                            input.ticket_access === 'GLB' ? (
                                                input.add_client === 'Y' ? true : false
                                                ) : (
                                                false
                                            )
                                        }
                                        disabled={
                                            input.ticket_access !== 'GLB' ? (
                                                true
                                            ) : (
                                                false
                                            )
                                        }
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="add_client" className="ml-4 block text-sm text-gray-500">
                                        Can onboard new clients to the system
                                    </label>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

                <div className="w-full">
                    <div className="ml-6">
                        <div className="w-12/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="add_users"
                                    name="add_users"
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={
                                        input.ticket_access === 'GLB' ? (
                                            input.add_users === 'Y' ? true : false
                                            ) : (
                                            false
                                        )
                                    }
                                    disabled={
                                        input.ticket_access !== 'GLB' ? (
                                            true
                                        ) : (
                                            false
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="add_users" className="ml-4 block text-sm text-gray-500">
                                    Can invite new user agents into the system
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="ml-6">
                        <div className="w-12/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="assign_auth_team"
                                    name="assign_auth_team"
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={
                                        input.ticket_access === 'GLB' ? (
                                            input.assign_auth_team === 'Y' ? true : false
                                            ) : (
                                            false
                                        )
                                    }
                                    disabled={
                                        input.ticket_access !== 'GLB' ? (
                                            true
                                        ) : (
                                            false
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="assign_auth_team" className="ml-4 block text-sm text-gray-500">
                                    Can change a user's Authorization Team
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="send_announcements"
                                    name="send_announcements"
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={
                                        input.ticket_access === 'GLB' ? (
                                            input.send_announcements === 'Y' ? true : false
                                            ) : (
                                            false
                                        )
                                    }
                                    disabled={
                                        input.ticket_access !== 'GLB' ? (
                                            true
                                        ) : (
                                            false
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="send_announcements" className="ml-4 block text-sm text-gray-500">
                                    Can send announcements to all users in the system
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                    
                <div className="w-full">
                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="company_groups"
                                    name="company_groups"
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={
                                        input.ticket_access === 'GLB' ? (
                                            input.company_groups === 'Y' ? true : false
                                            ) : (
                                            false
                                        )
                                    }
                                    disabled={
                                        input.ticket_access !== 'GLB' ? (
                                            true
                                        ) : (
                                            false
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="company_groups" className="ml-4 block text-sm text-gray-500">
                                    Can create client Company Groups
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdministativeRights