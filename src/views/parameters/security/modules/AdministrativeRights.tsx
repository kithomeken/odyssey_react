import React, {Component} from 'react'

interface Props {
    inputs: any,
    supportFeatures: any
}

class AdministativeRights extends Component<Props> {
    state = {
        input: this.props.inputs,
        supportFeatures: this.props.supportFeatures,
        adminRights: {

        }
    }

    render() {
        return(
            <React.Fragment>
                <div className="w-full py-3 h-72">
                    <h2 className="text-sm leading-7 text-gray-700 sm:text-lg sm: mb-3">
                        Issue out sets of administrative functionalities the users in this Auth Team can undertake.
                    </h2>

                    <div className="w-full">
                        <div className="ml-6">
                            <div className="w-12/12 mb-4">
                                <div className="flex items-center">
                                    <input
                                        id="add_users"
                                        name="add_users"
                                        type="checkbox"
                                        onChange={this.onChangeHandler}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="add_users" className="ml-4 block text-sm text-gray-500">
                                        Can invite new user agents into the system
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        {
                            this.state.supportFeatures.client_access === 'Y' ? (
                                <div className="ml-6">
                                    <div className="w-9/12 mb-4">
                                        <div className="flex items-center">
                                            <input
                                                id="add_client"
                                                name="add_client"
                                                type="checkbox"
                                                onChange={this.onChangeHandler}
                                                className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                            />

                                            <label htmlFor="add_client" className="ml-4 block text-sm text-gray-500">
                                                Can onboard new clients to the system
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                null
                            )
                        }

                        <div className="ml-6">
                            <div className="w-12/12 mb-4">
                                <div className="flex items-center">
                                    <input
                                        id="assign_auth_team"
                                        name="assign_auth_team"
                                        type="checkbox"
                                        onChange={this.onChangeHandler}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="assign_auth_team" className="ml-4 block text-sm text-gray-500">
                                        Can assign different Auth Teams to users
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex items-center">
                                    <input
                                        id="send_announcements"
                                        name="send_announcements"
                                        type="checkbox"
                                        onChange={this.onChangeHandler}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="send_announcements" className="ml-4 block text-sm text-gray-500">
                                        Can send announcements to all users in the system
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="ml-6">
                            <div className="w-9/12 mb-4">
                                <div className="flex items-center">
                                    <input
                                        id="send_announcements"
                                        name="send_announcements"
                                        type="checkbox"
                                        onChange={this.onChangeHandler}
                                        className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                    />

                                    <label htmlFor="send_announcements" className="ml-4 block text-sm text-gray-500">
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

    onChangeHandler = (e: any) => {
        let {ticketRights}: any = this.state
        let isCheckbox: any = (e.target.type === 'checkbox') ? true : false;
        ticketRights[e.target.name] = e.target.value

        if (isCheckbox) {
            if (e.target.checked) {
                ticketRights[e.target.name] = "Y"
            } else {
                ticketRights[e.target.name] = "N"
            }
        }

        this.setState({
            ticketRights
        })
    }
}

export default AdministativeRights