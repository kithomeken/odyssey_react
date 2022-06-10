import React from "react"
import { toast } from "react-toastify"

import Error500 from "../../../errors/Error500";
import ApiServices from "../../../../api/ApiServices";
import HttpServices from "../../../../services/HttpServices";
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect";

const AgentFeatures = () => {
    const onToggleAgentTechnicianFeature = async (e: any) => {
        let checked = e.target.checked;
        let toggleStatus = checked ? 'Y' : 'N'
        
        try {
            let input = {   
                field_agent: toggleStatus
            }
            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + `portal/a/site-master/features/support/agents/field-agent`
            const response: any = await HttpServices.httpPost(apiCall, input)
                
            if (response.data.success) {
                if (toggleStatus === 'Y') {
                    toast("Agent Technician Feature Activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast("Agent Technician Feature De-activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
                agentSupportState.value.field_agent = stateBeforeOnToggle

                toast("Something went wrong, could not change feature status...", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
            agentSupportState.value.field_agent = stateBeforeOnToggle

            toast("Something went wrong, could not change feature status...", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }
    
    let agentSupportState = usePromiseEffect(async () => {
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + `portal/a/site-master/features/support/agents`
        const response: any = await HttpServices.httpGet(apiCall)

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching agent support features...");
        }        

        return response.data.data
    }, [])

    return (
        <React.Fragment>
            <div className="py-4">
                {
                    agentSupportState.status === 'rejected' ? (
                        <Error500 />
                    ) : agentSupportState.status === 'fulfilled' ? (
                        <div>
                            <h2 className="text-lg leading-7 text-gray-700 sm: mb-2">
                                Agent Features
                            </h2>

                            <div className="w-12/12">
                                <p className="text-sm form-group text-gray-500">
                                    Support features that extend the functionalities and capabilities of your agents to enable them hit the road running. 
                                </p>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onToggleAgentTechnicianFeature}>
                                        <input type="checkbox" 
                                            id="support-toggle" 
                                            defaultChecked={agentSupportState.value.field_agent === 'Y' ? true : false} 
                                            className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="support-toggle" className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>

                                    <label htmlFor="support-toggle" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Support team consists of field technicians
                                    </label>
                                </div>

                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>

                                    <span className="text-gray-500 text-sm ml-6 w-12/12">
                                        Support team consists of trained professionals engaged in performing on-site end-user support. They are responsible for troubleshooting, repairs and client training of devices in any assigned location. Most useful in a network setup.
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col align-middle mt-6 h-16">
                            <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    )
}

export default AgentFeatures