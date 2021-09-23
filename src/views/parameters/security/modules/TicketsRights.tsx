import React, {Component} from 'react'

interface Props {
    inputs: any,
    supportFeatures: any
}

class TicketsRights extends Component<Props> {
    state = {
        input: this.props.inputs,
        supportFeatures: this.props.supportFeatures,
        ticketRights: {
            create_tickets: 'N',
            edit_ticket: 'N',
            add_comments: 'N',
            delete_comments: 'N',
            whos_comments: 'N',
            mark_resolved: 'N',
            configure_types: 'N',
            configure_regions: 'N'
        }
    }

    render() {
        return(
            <React.Fragment>
                <div className="w-full py-3 h-72">
                    <h2 className="text-sm leading-7 text-gray-700 sm:text-lg sm: mb-3">
                        Set the functionalities and configurations that users in this auth team can undertake regarding tickets.
                    </h2>

                    {
                        this.state.supportFeatures.client_access === 'Y' ? (
                            null
                        ) : (
                            <div className="ml-6">
                                <div className="w-9/12 mb-4">
                                    <div className="flex items-center">
                                        <input
                                            id="create_tickets"
                                            name="create_tickets"
                                            type="checkbox"
                                            onChange={this.onChangeHandler}
                                            className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                        />

                                        <label htmlFor="create_tickets" className="ml-4 block text-sm text-gray-500">
                                            Create tickets
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {
                        this.state.supportFeatures.client_access === 'Y' ? (
                            null
                        ) : (
                            <div className="ml-6">
                                <div className="w-9/12 mb-4">
                                    <div className="flex items-center">
                                        <input
                                            id="ticket_properties"
                                            name="edit_ticket"
                                            type="checkbox"
                                            onChange={this.onChangeHandler}
                                            className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                        />
        
                                        <label htmlFor="ticket_properties" className="ml-4 block text-sm text-gray-500">
                                            Edit ticket properties
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="ticket_comments"
                                    name="add_comments"
                                    type="checkbox"
                                    onChange={this.onChangeHandler}
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="ticket_comments" className="ml-4 block text-sm text-gray-500">
                                    Add notes/comments to tickets
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="delete_comments"
                                    name="delete_comments"
                                    type="checkbox"
                                    onChange={this.onChangeHandler}
                                    className="h-4 w-4 mt-1 text-green-600 checked:bg-green-500 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="delete_comments" className="ml-4 block text-sm text-gray-500">
                                    Delete notes/comments from tickets
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ml-16">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="own_notes_only"
                                    name="whos_comments"
                                    type="radio"
                                    value="OWN"
                                    onChange={this.onChangeHandler}
                                    disabled={
                                        this.state.ticketRights.delete_comments === 'Y' ? (
                                            false
                                        ) : (
                                            true
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="own_notes_only" className="ml-4 block text-sm text-gray-500">
                                    Own notes/comments only
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ml-16">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="anyones_notes"
                                    name="whos_comments"
                                    type="radio"
                                    value="ANY"
                                    onChange={this.onChangeHandler}
                                    disabled={
                                        this.state.ticketRights.delete_comments === 'Y' ? (
                                            false
                                        ) : (
                                            true
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="anyones_notes" className="ml-4 block text-sm text-gray-500">
                                    Anyone's notes/comments
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="resolve_tickets"
                                    name="mark_resolved"
                                    type="checkbox"
                                    onChange={this.onChangeHandler}
                                    disabled={
                                        (this.state.input.access_group === 'A') ? 
                                            false
                                        : (this.state.input.access_group === 'L') ?
                                            true
                                        :
                                            false
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="resolve_tickets" className="ml-4 block text-sm text-gray-500">
                                    Mark tickets as resolved - Close completed tickets
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="ticket_types"
                                    name="configure_types"
                                    type="checkbox"
                                    onChange={this.onChangeHandler}
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
                                    name="configure_regions"
                                    type="checkbox"
                                    onChange={this.onChangeHandler}
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

export default TicketsRights