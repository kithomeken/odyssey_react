import React from "react"
import ActivateFeature from "../../../lib/activations/ActivateFeature"

export const EscalationRights = () => {
    return (
        <React.Fragment>
            <div className="w-full py-1">
                <h2 className="text-sm leading-7 text-gray-700 sm:text-lg sm: mb-3">
                    Define escalations your users can abide to when they face a deadlock or when they need green light on items.
                </h2>

                <ActivateFeature 
                            link=""
                            linkName="Support Features"
                        />

            </div>
        </React.Fragment>
    )
}