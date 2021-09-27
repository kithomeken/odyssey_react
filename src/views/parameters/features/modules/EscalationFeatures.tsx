import React from "react"

import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"

const apiHeader = ApiService.apiDomain()

class EscalationFeatures extends React.Component {
    state = {
        loading: true,
        data: {
            enable_escalations: false,
            client_escalations: false,
        }
    }

    render() {
        let loading = this.state.loading

        return (
            <React.Fragment>
                {
                    loading ? (
                        <div className="flex flex-col align-middle mt-6 h-16">
                            <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                        </div>
                    ) : (
                        <div className="w-full py-3">
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
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onToggleEnableEscalations}>
                                        <input type="checkbox" id="enable_escalations" defaultChecked={this.state.data.enable_escalations} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                        <label htmlFor="enable_escalations" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="remember-me" className="ml-6 block text-sm mb-1 text-gray-900">
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
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onToggleClientEscalations}>
                                        <input type="checkbox" id="enable_client_escalations" defaultChecked={this.state.data.client_escalations} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                        <label htmlFor="enable_client_escalations" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="remember-me" className="ml-6 block text-sm mb-1 text-gray-900">
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
                            
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onToggleClientEscalations}>
                                        <input type="checkbox" id="enable_client_escalations" defaultChecked={this.state.data.client_escalations} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                        <label htmlFor="enable_client_escalations" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="remember-me" className="ml-6 block text-sm mb-1 text-gray-900">
                                        Configure Escalations Types
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        the types of escalations when escalating. eg. no first response, client not available etc.
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
        this.escalationMatrixSupportFeatureApiCall()
    }

    async escalationMatrixSupportFeatureApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/escalation-matrix`
            const response: any = await HttpService.httpGet(apiConsumed)

            if (response.data.success) {
                let escalationAccess = response.data.data.escalation_access === 'Y' ? true : false
                let clientEscalations = response.data.data.client_escalations === 'Y' ? true : false

                this.setState({
                    loading: false,
                    data: {
                        enable_escalations: escalationAccess,
                        client_escalations: clientEscalations
                    }
                })
            } else {
                this.setState({
                    loading: false,
                    data: {
                        enable_escalations: false,
                        client_escalations: false
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    onToggleEnableEscalations = (event: any) => {
        let checked = event.target.checked;
        let enableEscalations = checked ? 'Y' : 'N'

        this.enableEscalationsSupportFeatures(enableEscalations)
    }
    
    async enableEscalationsSupportFeatures(enableEscalations: any) {
        try {
            let input = {
                enable_escalation: enableEscalations
            }
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/escalation-matrix/enable`
            const response: any = await HttpService.httpPost(apiConsumed, input)

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

    onToggleClientEscalations = (event: any) => {
        let checked = event.target.checked;
        let clientEscalations = checked ? 'Y' : 'N'

        this.clientEscalationsSupportFeatureApiCall(clientEscalations)
    }

    async clientEscalationsSupportFeatureApiCall(clientEscalations: any) {
        try {
            let input = {
                client_escalations: clientEscalations
            }
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/escalation-matrix/client`
            const response = await HttpService.httpPost(apiConsumed, input)

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

export default EscalationFeatures