import React, {Component} from 'react'

import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"

const apiHeader = ApiService.apiDomain()

class AgentFeatures extends Component {
    state = {
        loading: true,
        data: {
            field_agent: false,
        },
    }

    render() {
        let loading= this.state.loading

        return(
            <React.Fragment>
                {
                    loading ? (
                        <div className="flex flex-col align-middle mt-6 h-16">
                            <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                        </div>
                    ) : (
                        <div className="w-full py-3">
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
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onToggleFieldAgent}>
                                        <input type="checkbox" id="support-toggle" defaultChecked={this.state.data.field_agent} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="support-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>

                                    <label htmlFor="support-toggle" className="ml-6 block text-sm mb-1 text-gray-900">
                                        Support team consists of field technicians
                                    </label>
                                </div>

                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>

                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Support team consists of trained professionals engaged in performing on-site end-user support. They are responsible for troubleshooting, repairs and client training of devices in any assigned location. Useful in a network setup.
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.agentSupportFeaturesApiCall()
    }

    async agentSupportFeaturesApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/agents`
            const response : any = await HttpService.httpGet(apiConsumed)
            console.log(response.data);
            

            if (response.data.success) {
                let fieldAgent = response.data.data.field_agent === 'Y' ? true : false

                this.setState({
                    loading:    false,
                    data: {
                        field_agent: fieldAgent
                    }
                })
            } else {
                this.setState({
                    loading:    false,
                    data:       null
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    onToggleFieldAgent = (e: any) => {
        let checked = e.target.checked;
        let fieldAgent = checked ? 'Y' : 'N'
        
        this.fieldAgentSupportFeatureApiCall(fieldAgent)
    }

    async fieldAgentSupportFeatureApiCall(fieldAgent: string) {
        try {
            let input = {
                field_agent: fieldAgent
            }
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/agents/field-agent`
            const response : any = await HttpService.httpPost(apiConsumed, input)

            if (response.data.success) {
                // show success toast
            } else {
                // show failed toast
            }
        } catch (error) {
            // show failed toast
            console.log(error)
        }
    }
}

export default AgentFeatures