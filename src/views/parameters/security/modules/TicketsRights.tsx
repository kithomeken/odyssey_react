import React, {Component} from 'react'

interface Props {
    inputs: any,
    errors:  any,
    supportFeatures: any,
    onChangeHandler: any,
}

class TicketsRights extends Component<Props> {
    state = {
        input: this.props.inputs,
        errors: this.props.errors,
        supportFeatures: this.props.supportFeatures,
    }

    render() {
        const errors = this.state.errors
        
        return(
            <React.Fragment>
                <div className="w-full py-3">
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
                                            onChange={this.props.onChangeHandler}
                                            checked={
                                                this.state.input.create_tickets === 'Y' ? true : false
                                            }
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
                                            id="edit_ticket"
                                            name="edit_ticket"
                                            type="checkbox"
                                            onChange={this.props.onChangeHandler}
                                            checked={
                                                this.state.input.edit_ticket === 'Y' ? true : false
                                            }
                                            className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                        />
        
                                        <label htmlFor="edit_ticket" className="ml-4 block text-sm text-gray-500">
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
                                    id="add_comments"
                                    name="add_comments"
                                    type="checkbox"
                                    onChange={this.props.onChangeHandler}
                                    checked={
                                        this.state.input.add_comments === 'Y' ? true : false
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="add_comments" className="ml-4 block text-sm text-gray-500">
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
                                    onChange={this.props.onChangeHandler}
                                    checked={
                                        this.state.input.delete_comments === 'Y' ? true : false
                                    }
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
                                    onChange={this.props.onChangeHandler}
                                    checked={
                                        this.state.input.whos_comments === 'OWN' ? true : false
                                    }
                                    disabled={
                                        this.props.inputs.delete_comments === 'Y' ? (
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
                                    onChange={this.props.onChangeHandler}
                                    checked={
                                        this.state.input.whos_comments === 'ANY' ? true : false
                                    }
                                    disabled={
                                        this.props.inputs.ticket_access !== 'GLB' ? (
                                            true
                                        ) : (
                                            this.props.inputs.delete_comments === 'Y' ? (
                                                false
                                            ) : (
                                                true
                                            )
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="anyones_notes" className="ml-4 block text-sm text-gray-500">
                                    Anyone's notes/comments
                                </label>
                            </div>

                            
                            {errors.whos_comments.length > 0 && 
                                <span className='invalid-feedback font-small text-red-600 pl-0'>
                                    {errors.whos_comments}
                                </span>
                            }
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="merge_ticket"
                                    name="merge_ticket"
                                    type="checkbox"
                                    onChange={this.props.onChangeHandler}
                                    checked={
                                        this.state.input.merge_ticket === 'Y' ? true : false
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="merge_ticket" className="ml-4 block text-sm text-gray-500">
                                    Merge / split a ticket
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="close_ticket"
                                    name="close_ticket"
                                    type="checkbox"
                                    onChange={this.props.onChangeHandler}
                                    checked={
                                        this.state.input.ticket_access === 'GLB' ? (
                                            this.state.input.close_ticket === 'Y' ? true : false
                                            ) : (
                                            false
                                        )
                                    }
                                    disabled={
                                        this.state.input.ticket_access !== 'GLB' ? (
                                            true
                                        ) : (
                                            false
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="close_ticket" className="ml-4 block text-sm text-gray-500">
                                    Close resolved tickets
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="configure_types"
                                    name="configure_types"
                                    type="checkbox"
                                    onChange={this.props.onChangeHandler}
                                    disabled={
                                        this.state.input.ticket_access !== 'GLB' ? (
                                            true
                                        ) : (
                                            false
                                        )
                                    }
                                    checked={
                                        this.state.input.ticket_access === 'GLB' ? (
                                            this.state.input.configure_types === 'Y' ? true : false
                                            ) : (
                                            false
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="configure_types" className="ml-4 block text-sm text-gray-500">
                                    Configure ticket types
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="configure_regions"
                                    name="configure_regions"
                                    type="checkbox"
                                    onChange={this.props.onChangeHandler}
                                    disabled={
                                        this.state.input.ticket_access !== 'GLB' ? (
                                            true
                                        ) : (
                                            false
                                        )
                                    }
                                    checked={
                                        this.state.input.ticket_access === 'GLB' ? (
                                            this.state.input.configure_regions === 'Y' ? true : false
                                        ) : (
                                            false
                                        )
                                    }
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded disabled:cursor-not-allowed"
                                />

                                <label htmlFor="configure_regions" className="ml-4 block text-sm text-gray-500">
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