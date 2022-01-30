import React, { useState } from "react"
import { toast } from "react-toastify";
import ApiServices from "../../../api/ApiServices";
import { usePromiseEffect } from "../../../lib/hooks/usePromiseEffect";
import HttpServices from "../../../services/HttpServices";
import Error500 from "../../errors/Error500";

const AnnouncementFeatures = () => {
    const [state, setstate] = useState({
        input: {
            enable_announcements: ''
        }
    })

    const onToggleEnableAnnouncements = (e: any) => {
        let checked = e.target.checked;
        let checkedString = ''

        if (checked) {
            checkedString = 'Y'            
        } else {
            checkedString = 'N'
        }

        setstate({
            ...state,
            input: {
                enable_announcements: checkedString
            }
        })

        enableAnnouncementsSupportFeature(checkedString)
    }

    const enableAnnouncementsSupportFeature = async (checkedString: string) => {
        try {
            let input = {   
                enable_announcements: checkedString
            }
            const apiDomain = ApiServices.apiDomain()
            const apiCall = apiDomain + `portal/a/site-master/features/support/announcements/enable`
            const response: any = await HttpServices.httpPost(apiCall, input)
    
            console.log(response)
            if (response.data.success) {
                if (checkedString === 'Y') {
                    toast("Announcements feature is now activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else if (checkedString === 'N') {
                    toast("Announcements feature is now de-activated...", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                let previousValue = checkedString === 'Y' ? 'N' : 'Y'
                announcementState.value.announcements = checkedString === 'Y' ? false : true
                toast("Something went wrong when trying to action on this feature...", {
                    position: toast.POSITION.TOP_RIGHT,
                });

                setstate({
                    ...state,
                    input: {
                        enable_announcements: previousValue
                    }
                })
            }
        } catch (error) {
            let previousValue = checkedString === 'Y' ? 'N' : 'Y'
            announcementState.value.announcements = checkedString === 'Y' ? false : true
            toast("Something went wrong when trying to action on this feature...", {
                position: toast.POSITION.TOP_RIGHT,
            });
            
            setstate({
                ...state,
                input: {
                    enable_announcements: previousValue
                }
            })
        }
    } 

    let announcementState = usePromiseEffect(async () => {
        const apiDomain = ApiServices.apiDomain()
        const apiCall = apiDomain + `portal/a/site-master/features/support/announcements`
        const response: any = await HttpServices.httpGet(apiCall)

        if (response.status !== 200) {
            throw new Error("Something went wrong when fetching the announcement support features...");
        }

        if (response.data.data.announcements === 'Y') {
            response.data.data.announcements = true
        } else {
            response.data.data.announcements = false
        }

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
                            <h2 className="text-lg leading-7 text-green-500 sm:text-lg sm: mb-2">
                                Announcement Features
                            </h2>

                            <div className="w-10/12">
                                <p className="text-sm form-group text-gray-500">
                                    Support features to extend your in-house communication and reach a specific, if not all, sub set of users.
                                </p>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={onToggleEnableAnnouncements}>
                                        <input type="checkbox" id="enable_announcements" defaultChecked={announcementState.value.announcements} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                        <label htmlFor="enable_announcements" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="enable_announcements" className="ml-4 block text-sm mb-1 text-gray-900">
                                        Enable Announcements
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-7 w-12/12">
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