import React, {Component} from "react"

import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"

const apiHeader = ApiService.apiDomain()

class ClientFeatures extends Component {
    state = {
        loading: true,
        data: {
            client_access: false,
            create_company_profile: false,
        }
    }
    
    render() {
        let loading = this.state.loading

        return(
            <React.Fragment>
                {
                    loading ? (
                        <div className="flex flex-col align-middle mt-6 h-16">
                            <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                        </div>
                    ) : (
                        <div className="w-full py-3">
                            <h2 className="text-lg leading-7 text-green-500 sm:text-lg sm: mb-2">
                                Client Features
                            </h2>
        
                            <div className="w-12/12">
                                <p className="text-sm form-group text-gray-500">
                                    Support features that extend the functionalities and access of your clients 
                                </p>
                            </div>
        
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onToggleClientAccess}>
                                        <input type="checkbox" id="access-toggle" defaultChecked={this.state.data.client_access} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                        <label htmlFor="access-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="access-toggle" className="ml-6 block text-sm mb-1 text-gray-900">
                                        Client Access
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Activating this feature allows you to create accounts for your clients and enables them to raise tickets, add comments/suggestions/attachments and follow the tickets' odyssey until closure. In retrospect only clients can create tickets. 
                                    </span>
                                </div>
                            </div>
                            
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onToggleCreateCompanyProfile}>
                                        <input type="checkbox" id="company-toggle" defaultChecked={this.state.data.create_company_profile} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                        <label htmlFor="company-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="company-toggle" className="ml-6 block text-sm mb-1 text-gray-900">
                                        Create Company Profile
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Create a company profile and make it easier to manage support requests from one single client company. Add more detailed information about the companies for your support team to easily get in touch with them. 
                                    </span>
                                </div>
                            </div>
                            
                            {/* <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input type="checkbox" id="link-toggle" defaultChecked={this.state.data.link_clients_to_companies} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                        <label htmlFor="link-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="remember-me" className="ml-6 block text-sm mb-1 text-gray-900">
                                        Link clients accounts to company profiles
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Link clients accounts to their respective companies. This creates a better sorting algorithm for your tickets according to company profile. 
                                    </span>
                                </div>
                            </div> */}
        
                        </div>
                    )
                }
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.clientSupportFeaturesApiCall()
    }

    async clientSupportFeaturesApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/clients`
            const response : any = await HttpService.httpGet(apiConsumed)

            if (response.data.success) {
                let client_access = response.data.data.client_access === 'Y' ? true : false
                let create_company_profile = response.data.data.create_company_profile === 'Y' ? true : false

                this.setState({
                    loading: false,
                    data: {
                        client_access: client_access,
                        create_company_profile: create_company_profile
                    }
                })
            } else {
                this.setState({
                    loading: false,
                    data: {
                        client_access: false,
                        create_company_profile: false
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    onToggleClientAccess = (event: any) => {
        let checked = event.target.checked;
        let clientAccess = checked ? 'Y' : 'N'

        this.clientAccessSupportFeatureApiCall(clientAccess)
    }

    async clientAccessSupportFeatureApiCall(clientAccess: any) {
        try {
            let input = {
                client_access: clientAccess
            }
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/clients/client-access`
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

    onToggleCreateCompanyProfile = (event: any) => {
        let checked = event.target.checked;
        let createCompanyProfile = checked ? 'Y' : 'N'

        this.createCompanyProfileSupportFeatureApiCall(createCompanyProfile)
    }

    async createCompanyProfileSupportFeatureApiCall(createCompanyProfile: any) {
        try {
            let input = {
                create_company_profile: createCompanyProfile
            }
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/clients/company-profile`
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

export default ClientFeatures