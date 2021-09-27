import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import parachute from '../../../../assets/images/parachute.png'
import {featuresRoutes} from '../../../../routes/parameters/featuresRoutes'

interface Props {
    inputs: any,
    supportFeatures: any,
    onChangeHandler: any,
}

class EscalationRights extends Component<Props> {
    state = {
        input: this.props.inputs,
        supportFeatures: this.props.supportFeatures
    }

    render() {
        const supportFeaturesRoutes = featuresRoutes[0].path

        return(
            <React.Fragment>
                {
                this.state.supportFeatures.escalation_access === 'Y' ? (
                        <div className="w-full py-3 h-72">
                            <h2 className="text-sm leading-7 text-gray-700 sm:text-lg sm: mb-3">
                                Define escalations your users can abide to when working on worflow items or when they need green light on items.
                            </h2>

                            <div className="ml-6">
                                <div className="w-12/12 mb-4">
                                    <div className="flex items-center">
                                        <input
                                            id="escalate_tickets"
                                            name="escalate_tickets"
                                            type="checkbox"
                                            onChange={this.props.onChangeHandler}
                                            checked={
                                                this.state.input.escalate_tickets === 'Y' ? true : false
                                            }
                                            className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 focus:bg-green-500 active: border-gray-300 rounded"
                                        />

                                        <label htmlFor="escalate_tickets" className="ml-4 block text-sm text-gray-500">
                                            Can escalate tickets to a higher chain of command
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-6">
                                <div className="w-12/12 mb-4">
                                    <div className="flex items-center">
                                        <input
                                            id="matrix_add"
                                            name="matrix_add"
                                            type="checkbox"
                                            onChange={this.props.onChangeHandler}
                                            checked={
                                                this.state.input.ticket_access === 'GLB' ? (
                                                    this.state.input.matrix_add === 'Y' ? true : false
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

                                        <label htmlFor="matrix_add" className="ml-4 block text-sm text-gray-500">
                                            Automatically add users in this Auth Team to the Escalation Matrix
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-6">
                                <div className="w-12/12 mb-4">
                                    <div className="flex items-center">
                                        <input
                                            id="escalation_purge"
                                            name="escalation_purge"
                                            type="checkbox"
                                            onChange={this.props.onChangeHandler}
                                            checked={
                                                this.state.input.ticket_access === 'GLB' ? (
                                                    this.state.input.escalation_purge === 'Y' ? true : false
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

                                        <label htmlFor="escalation_purge" className="ml-4 block text-sm text-gray-500">
                                            Can add/purge users from the Escalation Matrix
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-6">
                                <div className="w-12/12 mb-4">
                                    <div className="flex items-center">
                                        <input
                                            id="config_escalations"
                                            name="config_escalations"
                                            type="checkbox"
                                            onChange={this.props.onChangeHandler}
                                            checked={
                                                this.state.input.ticket_access === 'GLB' ? (
                                                    this.state.input.config_escalations === 'Y' ? true : false
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

                                        <label htmlFor="config_escalations" className="ml-4 block text-sm text-gray-500">
                                            Configure Escalation Matrix settings
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full mt-6 h-72">
                            <div className="w-full mb-4">
                                <img src={parachute} alt="parachute" width="190px" className="block text-center m-auto" />
                            </div>

                            <div className="w-6/12 m-auto">
                                <p className="text-sm text-center mb-2 text-gray-600 inline-block">
                                    This support feature has not been activated. To activate go to 
                                    <Link className="text-green-500 inline-block ml-1 hover:underline" to={supportFeaturesRoutes}>Support Features</Link>
                                </p>
                            </div>
                        </div>
                    )
                }



                
            </React.Fragment>
        )
    }
}

export default EscalationRights