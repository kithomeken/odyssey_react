import React from "react"
import { toast } from "react-toastify"

import Error500 from "../../../errors/Error500";
import ApiServices from "../../../../api/ApiServices";
import HttpServices from "../../../../services/HttpServices";
import { usePromiseEffect } from "../../../../lib/hooks/usePromiseEffect";

const AnnouncementFeatures = () => {
    const onToggleAnnouncementsFeature = async (e: any) => {
        let checked = e.target.checked;
        let toggleStatus = checked ? 'Y' : 'N'
        
        try {
            let input = {   
                announcements: toggleStatus
            }
            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + `portal/a/site-master/features/support/announcements/enable`
            const response: any = await HttpServices.httpPost(apiCall, input)
            
            if (response.data.success) {
                if (toggleStatus === 'Y') {
                    toast("Annoucements Feature Activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast("Annoucements Feature De-activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
                announcementState.value.announcements = stateBeforeOnToggle

                toast("Something went wrong, could not change feature status...", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            let stateBeforeOnToggle = toggleStatus === 'Y' ? true : false
            announcementState.value.announcements = stateBeforeOnToggle

            toast("Something went wrong, could not change feature status...", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    let announcementState = usePromiseEffect(async () => {
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + `portal/a/site-master/features/support/announcements`
        const response: any = await HttpServices.httpGet(apiCall)

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching the announcement support features...");
        }

        console.log(response);
        
        return response.data.data
    }, [])

    return (
        <React.Fragment>
            <div className="py-4">
                {
                    announcementState.status === 'rejected' ? (
                        <Error500 />
                    ) : announcementState.status === 'fulfilled' ? (
                        <div>
                            <h2 className="text-lg leading-7 text-gray-700 sm:text-lg sm: mb-2">
                                Announcement Features
                            </h2>

                            <div className="w-10/12">
                                <p className="text-sm form-group text-gray-500">
                                    Support features to extend your in-house communication and reach a specific, if not all, sub set of users.
                                </p>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onToggleAnnouncementsFeature}>
                                        <input 
                                            type="checkbox" 
                                            id="enable_announcements" 
                                            defaultChecked={announcementState.value.announcements === 'Y' ? true : false} 
                                            className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-2 appearance-none cursor-pointer"
                                        />
                                        <label htmlFor="enable_announcements" className="toggle-label block overflow-hidden h-4 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="enable_announcements" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Enable Announcements
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Activating this feature allows you to send important messages/updates to all your users, or if you'd like a sub set of users. This feature will only be available to users with administrative rights
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

export default AnnouncementFeatures