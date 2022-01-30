import React, { useState } from "react"
import { toast } from "react-toastify"
import ApiServices from "../../../api/ApiServices"
import { usePromiseEffect } from "../../../lib/hooks/usePromiseEffect"
import HttpServices from "../../../services/HttpServices"
import Error500 from "../../errors/Error500"

const AgentFeatures = () => {
    let [state, setstate] = useState({
        input: {
            field_agent: ''
        }
    })

    const onToggleFieldAgent = (e: any) => {
        let checked = e.target.checked;
        let fieldAgent = checked ? 'Y' : 'N'
        let checkedString = ''

        if (checked) {
            checkedString = 'Y'            
        } else {
            checkedString = 'N'
        }

        setstate({
            ...state,
            input: {
                field_agent: checkedString
            }
        })

        enableFieldAgentSupportFeature(checkedString)
    }

    const enableFieldAgentSupportFeature = async (checkedString: string) => {
        try {
            let input = {   
                field_agent: checkedString
            }
            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + `portal/a/site-master/features/support/agents/field-agent`
            const response: any = await HttpServices.httpPost(apiCall, input)
    
            console.log(response)
            if (response.data.success) {
                if (checkedString === 'Y') {
                    toast("Feature is now activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else if (checkedString === 'N') {
                    toast("Feature is now de-activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                let previousValue = checkedString === 'Y' ? 'N' : 'Y'
                agentSupportState.value.announcements = checkedString === 'Y' ? false : true

                toast("Something went wrong when trying to action on this feature...", {
                    position: toast.POSITION.TOP_RIGHT,
                });

                setstate({
                    ...state,
                    input: {
                        field_agent: previousValue
                    }
                })
            }
        } catch (error) {
            let previousValue = checkedString === 'Y' ? 'N' : 'Y'
            agentSupportState.value.announcements = checkedString === 'Y' ? false : true

            toast("Something went wrong when trying to action on this feature...", {
                position: toast.POSITION.TOP_RIGHT,
            });
            
            setstate({
                ...state,
                input: {
                    field_agent: previousValue
                }
            })
        }
    } 
    

    let agentSupportState = usePromiseEffect(async () => {
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + `portal/a/site-master/features/support/agents`
        const response: any = await HttpServices.httpGet(apiCall)

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching agent support features...");
        }

        if (response.data.data.field_agent === 'Y') {
            response.data.data.field_agent = true
        } else {
            response.data.data.field_agent = false
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
                            <h2 className="text-lg leading-7 text-green-500 sm: mb-2">
                                Agent Features
                            </h2>

                            <div className="w-12/12">
                                <p className="text-sm form-group text-gray-500">
                                    Support features that extend the functionalities and capabilities of your agents to enable them hit the road running. 
                                </p>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onToggleFieldAgent}>
                                        <input type="checkbox" id="support-toggle" defaultChecked={agentSupportState.value.field_agent} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="support-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>

                                    <label htmlFor="support-toggle" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Support team consists of field technicians
                                    </label>
                                </div>

                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>

                                    <span className="text-gray-500 text-sm ml-8 w-12/12">
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