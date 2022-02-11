import React, { useState } from "react"
import ApiServices from "../../../api/ApiServices";
import { usePromiseEffect } from "../../../lib/hooks/usePromiseEffect";
import HttpServices from "../../../services/HttpServices";
import Error500 from "../../errors/Error500";

const EscalationMatrix = () => {
    let [state, setstate] = useState({
        data: {
            enable_escalations: false,
            client_escalations: false,
        }
    })

    const onToggleEnableAnnouncements = (e: any) => {
        let checked = e.target.checked;
        let fieldAgent = checked ? 'Y' : 'N'
    }

    let escalationSupportFeaturesPromise = usePromiseEffect(async () => {
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + `portal/a/site-master/features/support/escalation-matrix`
        const response: any = await HttpServices.httpGet(apiCall)

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching agent support features...");
        }
        
        console.log(response);
        return response.data.data
    }, [])

    return (
        <React.Fragment>
            <div className="py-4">
                {
                    escalationSupportFeaturesPromise.status === 'rejected' ? (
                        <Error500 />
                    ) : escalationSupportFeaturesPromise.status === 'fulfilled' ? (
                        <div>
                            <h2 className="text-lg leading-7 text-green-500 sm:text-lg sm: mb-2">
                                Escalation Matrix
                            </h2>

                            <div className="w-10/12">
                                <p className="text-sm form-group text-gray-500">
                                    A feature that speaks for itself.
                                </p>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" /* onClick={onToggleEnableEscalations} */>
                                        <input type="checkbox" 
                                            id="enable_escalations" 
                                            defaultChecked={escalationSupportFeaturesPromise.value.escalation_access} 
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="enable_escalations" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="enable_escalations" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Enable Escalations
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-8 w-12/12">
                                        At times, agents face a 'deadlock' when it comes to issue resolution and as such no workaround can be found. We offer agents (and clients) the ability to escalate issues to a higher level of your organization for a quicker resolution.
                                    </span>
                                </div>
                            </div>
                            
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" /* onClick={onToggleClientEscalations} */>
                                        <input type="checkbox" 
                                            id="enable_client_escalations" 
                                            defaultChecked={escalationSupportFeaturesPromise.value.client_escalations} 
                                            disabled={
                                                escalationSupportFeaturesPromise.value.escalation_access === 'N' ? false : true
                                            } 
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="enable_client_escalations" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="enable_client_escalations" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Enable Client Escalations
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-8 w-12/12">
                                        Allows clients to escalate tickets to your escalation team. <span className="text-red-500">But be warned</span>, as all clients want their issues to be sorted as quickly as possible and might end up misusing this god-given gift. 
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

export default EscalationMatrix