import React, {Component} from 'react'

class TicketsRights extends Component {
    state = {

    }

    render() {
        return(
            <React.Fragment>
                <div className="w-full py-3 h-72">
                    <h2 className="text-sm leading-7 text-gray-700 sm:text-lg sm: mb-3">
                        Set the functionalities and configurations that users in this auth team can undertake regarding tickets.
                    </h2>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="create_tickets"
                                    name="create_tickets"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="create_tickets" className="ml-4 block text-sm text-gray-500">
                                    Create tickets
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="ticket_properties"
                                    name="ticket_properties"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="ticket_properties" className="ml-4 block text-sm text-gray-500">
                                    Edit ticket properties
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="ticket_comments"
                                    name="ticket_comments"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="ticket_comments" className="ml-4 block text-sm text-gray-500">
                                    Add comments to tickets
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="resolve_tickets"
                                    name="resolve_tickets"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="resolve_tickets" className="ml-4 block text-sm text-gray-500">
                                    Mark tickets as resolved
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="ticket_types"
                                    name="ticket_types"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="ticket_types" className="ml-4 block text-sm text-gray-500">
                                    Configure ticket types
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="ticket_regions"
                                    name="ticket_regions"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="ticket_regions" className="ml-4 block text-sm text-gray-500">
                                    Configure ticket regions
                                </label>
                            </div>
                        </div>
                    </div>







                </div>
            </React.Fragment>
        )
    }
}

export default TicketsRights