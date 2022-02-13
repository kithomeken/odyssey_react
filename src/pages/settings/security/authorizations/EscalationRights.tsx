import React, { FC } from "react"
import ActivateFeature from "../../../../lib/activations/ActivateFeature"

interface Props {
    input: any,
    errors: any,
    supportFeatures: any,
    onChangeHandler: any,
}

const EscalationRights: FC<Props> = ({input, errors, supportFeatures, onChangeHandler}) => {
    return (
        <React.Fragment>
            <div className="w-full py-4">
                {
                    supportFeatures.value.escalation_access === 'Y' ? (
                        <div>
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
                                            onChange={onChangeHandler}
                                            checked={
                                                input.escalate_tickets === 'Y' ? true : false
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
                                            onChange={onChangeHandler}
                                            checked={
                                                input.ticket_access === 'GLB' ? (
                                                    input.matrix_add === 'Y' ? true : false
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
                                            onChange={onChangeHandler}
                                            checked={
                                                input.ticket_access === 'GLB' ? (
                                                    input.escalation_purge === 'Y' ? true : false
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
                                            onChange={onChangeHandler}
                                            checked={
                                                input.ticket_access === 'GLB' ? (
                                                    input.config_escalations === 'Y' ? true : false
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

                                        <label htmlFor="config_escalations" className="ml-4 block text-sm text-gray-500">
                                            Configure Escalation Matrix settings
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <ActivateFeature 
                            link=""
                            linkName="Support Features"
                        />
                    )
                }




            </div>
        </React.Fragment>
    )
}

export default EscalationRights