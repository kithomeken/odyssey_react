import React, { useState } from "react"
import ApiServices from "../../../api/ApiServices";
import { usePromiseEffect } from "../../../lib/hooks/usePromiseEffect";
import HttpServices from "../../../services/HttpServices";
import Error500 from "../../errors/Error500";

const ClientFeatures = () => {
    let [state, setstate] = useState({
        data: {
            client_access: false,
            create_company_profile: false,
        }
    })

    const onToggleClientAccess = (e: any) => {
        let checked = e.target.checked;
        let fieldAgent = checked ? 'Y' : 'N'
    }

    let clientSupportFeaturesPromise = usePromiseEffect(async () => {
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + `portal/a/site-master/features/support/clients`
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
                    clientSupportFeaturesPromise.status === 'rejected' ? (
                        <Error500 />
                    ) : clientSupportFeaturesPromise.status === 'fulfilled' ? (
                        <div>
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
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onToggleClientAccess}>
                                        <input type="checkbox" 
                                            id="client-access" 
                                            defaultChecked={clientSupportFeaturesPromise.value.client_access} 
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="client-access" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="client-access" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Client Access
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-8 w-12/12">
                                        Activating this feature allows you to create user accounts for your clients and enables them to raise tickets, add comments, suggestions, attachments and follow the tickets' odyssey until closure. In retrospect only clients will create tickets. 
                                    </span>
                                </div>
                            </div>
                            
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" /* onClick={onToggleCreateCompanyProfile} */>
                                        <input type="checkbox" 
                                            id="company-profile" 
                                            defaultChecked={clientSupportFeaturesPromise.value.create_company_profile} 
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="company-profile" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="company-profile" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Create Company Profile
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-8 w-12/12">
                                        Create a company profile and make it easier to manage support requests from one single client company. Add more detailed information about the companies for your support team to easily get in touch with them. 
                                    </span>
                                </div>
                            </div>
                            
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" /* onClick={onToggleCreateCompanyProfile} */>
                                        <input type="checkbox" id="company-toggle" defaultChecked={state.data.create_company_profile} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                        <label htmlFor="company-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="company-toggle" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Create Profile Regions
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-8 w-12/12">
                                        Create regions and make it easier to manage support requests from one single region. You can have as many regions as you want. Most useful if tickets are coming from multiple regions.
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

export default ClientFeatures