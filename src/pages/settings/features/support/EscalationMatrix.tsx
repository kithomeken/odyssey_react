import React, { useState } from "react"
import { toast } from "react-toastify"

import Error500 from "../../../errors/Error500";
import HttpServices from "../../../../services/HttpServices";
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect";
import swal from "sweetalert";
import { SUPPORT_FEATURES_ESC_MATRIX_ENABLE_API_ROUTE, SUPPORT_FEATURES_ESC_MATRIX_CLIENT_API_ROUTE, SUPPORT_FEATURES_ESC_MATRIX_API_ROUTE } from "../../../../api/ApiRoutes";

const EscalationMatrix = () => {
    const [state, setstate] = useState({
        clientAccess: true
    })

    const onToggleEscalationsAccessFeature = async (e: any) => {
        let checked = e.target.checked;
        let toggleStatus = checked ? 'Y' : 'N'

        if (!checked) {
            escalationSupportFeaturesPromise.value.escalation_access = 'N'
            setstate({
                clientAccess: false
            })
        } else {
            escalationSupportFeaturesPromise.value.escalation_access = 'Y'
            setstate({
                clientAccess: true
            })
        }
        
        try {
            let input = {
                escalation_access: toggleStatus
            }

            const response: any = await HttpServices.httpPost(SUPPORT_FEATURES_ESC_MATRIX_ENABLE_API_ROUTE, input)
                
            if (response.data.success) {
                if (toggleStatus === 'Y') {
                    escalationSupportFeaturesPromise.value.escalation_access = 'Y'
                    toast.success("Escalation Access Feature Activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    escalationSupportFeaturesPromise.value.escalation_access = 'N'
                    toast.success("Escalation Access Feature De-activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
                escalationSupportFeaturesPromise.value.escalation_access = stateBeforeOnToggle

                toast.error("Something went wrong, could not change feature status...", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
            escalationSupportFeaturesPromise.value.escalation_access = stateBeforeOnToggle

            toast.error("Something went wrong, could not change feature status...", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }
    
    const onToggleClientEscalationsFeature = async (e: any) => {
        let checked = e.target.checked;
        let toggleStatus = checked ? 'Y' : 'N'

        if (!state.clientAccess ||  escalationSupportFeaturesPromise.value.escalation_access === 'N') {
            swal({
                dangerMode: true,
                title: 'Action Denied',
                text: 'Kindly enable escalations to allow client escalations in the system...',
                buttons: {
                    confirm: {
                        text: "Close",
                    }
                }
            });

            return
        }
        
        try {
            let input = {
                client_escalations: toggleStatus
            }

            const response: any = await HttpServices.httpPost(SUPPORT_FEATURES_ESC_MATRIX_CLIENT_API_ROUTE, input)
                
            if (response.data.success) {
                if (toggleStatus === 'Y') {
                    escalationSupportFeaturesPromise.value.client_escalations = 'Y'
                    toast.success("Client Escalations Feature Activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    escalationSupportFeaturesPromise.value.client_escalations = 'N'
                    toast.success("Client Escalations Feature De-activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
                escalationSupportFeaturesPromise.value.client_escalations = stateBeforeOnToggle

                toast.error("Something went wrong, could not change feature status...", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
            escalationSupportFeaturesPromise.value.client_escalations = stateBeforeOnToggle

            toast.error("Something went wrong, could not change feature status...", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    let escalationSupportFeaturesPromise = usePromiseEffect(async () => {
        const response: any = await HttpServices.httpGet(SUPPORT_FEATURES_ESC_MATRIX_API_ROUTE)

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
                            <h2 className="text-lg leading-7 text-gray-700 sm:text-lg sm: mb-2">
                                Escalation Matrix
                            </h2>

                            <div className="w-10/12">
                                <p className="text-sm form-group text-gray-500">
                                    A feature that speaks for itself.
                                </p>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onToggleEscalationsAccessFeature}>
                                        <input 
                                            type="checkbox"
                                            id="enable_escalations" 
                                            defaultChecked={escalationSupportFeaturesPromise.value.escalation_access === 'Y' ? true : false} 
                                            className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="enable_escalations" className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="enable_escalations" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Enable Escalations
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        At times, agents face a 'deadlock' when it comes to issue resolution and as such no workaround can be found. We offer agents (and clients) the ability to escalate issues to a higher level of your organization for a quicker resolution.
                                    </span>
                                </div>
                            </div>
                            
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onToggleClientEscalationsFeature}>
                                        <input type="checkbox" 
                                            id="enable_client_escalations" 
                                            checked={escalationSupportFeaturesPromise.value.escalation_access === 'Y' ? (
                                                escalationSupportFeaturesPromise.value.client_escalations === 'Y' ? true : false
                                            ) : false} 
                                            onChange={onToggleClientEscalationsFeature}
                                            className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="enable_client_escalations" className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer disabled:opacity-50"></label>
                                    </div>
        
                                    <label htmlFor="enable_client_escalations" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Enable Client Escalations
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
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