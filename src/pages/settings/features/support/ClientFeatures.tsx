import React from "react"
import { toast } from "react-toastify"

import Error500 from "../../../errors/Error500";
import HttpServices from "../../../../services/HttpServices";
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect";
import { SUPPORT_FEATURES_CLIENT_API_ROUTE, SUPPORT_FEATURES_CLIENT_ACCESS_API_ROUTE, SUPPORT_FEATURES_COMPANY_PROFILE_API_ROUTE } from "../../../../api/ApiRoutes";

const ClientFeatures = () => {
    let clientSupportFeaturesPromise = usePromiseEffect(async () => {
        const response: any = await HttpServices.httpGet(SUPPORT_FEATURES_CLIENT_API_ROUTE)

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching agent support features...");
        }
        
        return response.data.data
    }, [])

    const onToggleClientAccessFeature = async (e: any) => {
        let checked = e.target.checked;
        let toggleStatus = checked ? 'Y' : 'N'
        
        try {
            let input = {   
                client_access: toggleStatus
            }
            
            const response: any = await HttpServices.httpPost(SUPPORT_FEATURES_CLIENT_ACCESS_API_ROUTE, input)
                
            if (response.data.success) {
                if (toggleStatus === 'Y') {
                    toast("Client Access Feature Activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast("Client Access Feature De-activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
                clientSupportFeaturesPromise.value.client_access = stateBeforeOnToggle

                toast("Something went wrong, could not change feature status...", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
            clientSupportFeaturesPromise.value.client_access = stateBeforeOnToggle

            toast("Something went wrong, could not change feature status...", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }
    
    const onToggleConpanyProfileFeature = async (e: any) => {
        let checked = e.target.checked;
        let toggleStatus = checked ? 'Y' : 'N'
        
        try {
            let input = {   
                create_company_profile: toggleStatus
            }
            
            const response: any = await HttpServices.httpPost(SUPPORT_FEATURES_COMPANY_PROFILE_API_ROUTE, input)
                
            if (response.data.success) {
                if (toggleStatus === 'Y') {
                    toast("Company Profiles Feature Activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast("Company Profiles Feature De-activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
                clientSupportFeaturesPromise.value.client_access = stateBeforeOnToggle

                toast("Something went wrong, could not change feature status...", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
            clientSupportFeaturesPromise.value.client_access = stateBeforeOnToggle

            toast("Something went wrong, could not change feature status...", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    return (
        <React.Fragment>
            <div className="py-4">
                {
                    clientSupportFeaturesPromise.status === 'rejected' ? (
                        <Error500 />
                    ) : clientSupportFeaturesPromise.status === 'fulfilled' ? (
                        <div>
                            <h2 className="text-lg leading-7 text-gray-700 sm:text-lg sm: mb-2">
                                Client Features
                            </h2>
        
                            <div className="w-12/12">
                                <p className="text-sm form-group text-gray-500">
                                    Support features that extend the functionalities and access of your clients 
                                </p>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onToggleClientAccessFeature}>
                                        <input type="checkbox" 
                                            id="client-access" 
                                            defaultChecked={clientSupportFeaturesPromise.value.client_access === 'Y' ? true : false} 
                                            className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="client-access" className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="client-access" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Client Ticketing
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Activating this feature allows you to create user accounts for your clients and enable them to raise tickets, add comments, attachments and follow the Ticket's Odyssey until closure. {/* In retrospect only clients will create tickets.  */}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onToggleConpanyProfileFeature}>
                                        <input type="checkbox" 
                                            id="company-profile" 
                                            defaultChecked={clientSupportFeaturesPromise.value.create_company_profile === 'Y' ? true : false} 
                                            className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="company-profile" className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="company-profile" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Create Company Profiles
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Create a company profile and make it easier to manage support requests from one single client company. Add more detailed information about the companies for your support team to easily get in touch with them. 
                                    </span>
                                </div>
                            </div>
                            
                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in" /* onClick={onToggleCreateCompanyProfile} */>
                                        <input 
                                            type="checkbox" 
                                            id="company-toggle" 
                                            defaultChecked={clientSupportFeaturesPromise.value.create_region_profile === 'Y' ? true : false}
                                            className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="company-toggle" className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="company-toggle" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Create Profile Regions
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
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