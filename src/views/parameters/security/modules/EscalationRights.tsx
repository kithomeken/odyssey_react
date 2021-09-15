import React, {Component} from 'react'

class EscalationRights extends Component {
    state = {

    }

    render() {
        return(
            <React.Fragment>
                <div className="w-full py-3 h-72">
                    <h2 className="text-sm leading-7 text-gray-700 sm:text-lg sm: mb-3">
                        Define escalations your users can abide to when working on worflow items or when they need green light on items.
                    </h2>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="escalate_tickets"
                                    name="escalate_tickets"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="escalate_tickets" className="ml-4 block text-sm text-gray-500">
                                    Ability to escalate tickets
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="matrix_add"
                                    name="matrix_add"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="matrix_add" className="ml-4 block text-sm text-gray-500">
                                    Add users in Auth Team to escalation matrix
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="escalation_purge"
                                    name="escalation_purge"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="escalation_purge" className="ml-4 block text-sm text-gray-500">
                                    Add/purge other users from the escalation matrix
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="ml-6">
                        <div className="w-9/12 mb-4">
                            <div className="flex items-center">
                                <input
                                    id="configure_escalations"
                                    name="configure_escalations"
                                    type="checkbox"
                                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                />

                                <label htmlFor="configure_escalations" className="ml-4 block text-sm text-gray-500">
                                    Configure escalation matrix settings
                                </label>
                            </div>
                        </div>
                    </div>





                </div>
            </React.Fragment>
        )
    }
}

export default EscalationRights