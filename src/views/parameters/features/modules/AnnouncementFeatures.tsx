import React from "react"

import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"

const apiHeader = ApiService.apiDomain()

class AnnouncementFeatures extends React.Component {
    state = {
        loading: true,
        data: {
            announcements: false
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
                                Announcement Features
                            </h2>

                            <div className="w-10/12">
                                <p className="text-sm form-group text-gray-500">
                                    Support features to extend your in-house communication and reach a specific, if not all, sub set of users.
                                </p>
                            </div>

                            <div className="w-full ml-5 mb-3">
                                <div className="flex flex-row items-center">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in" onClick={this.onToggleEnableAnnouncements}>
                                        <input type="checkbox" id="enable_announcements" defaultChecked={this.state.data.announcements} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                                        <label htmlFor="enable_announcements" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
        
                                    <label htmlFor="remember-me" className="ml-6 block text-sm mb-1 text-gray-900">
                                        Enable Announcements
                                    </label>
                                </div>
        
                                <div className="flex flex-row">
                                    <div className="w-10 mr-2"></div>
        
                                    <span className="text-gray-500 text-sm ml-6 w-9/12">
                                        Activating this feature allows you to send important messages/updates to all your users, or if you'd like a sub set of users. This feature will only be available to administrators 
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
        this.announcementsSupportFeatureApiCall()
    }

    async announcementsSupportFeatureApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/announcements`
            const response: any = await HttpService.httpGet(apiConsumed)

            if (response.data.success) {
                let enableAnnouncements = response.data.data.announcements === 'Y' ? true : false

                this.setState({
                    loading: false,
                    data: {
                        announcements: enableAnnouncements,
                    }
                })
            } else {
                this.setState({
                    loading: false,
                    data: {
                        announcements: false,
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    onToggleEnableAnnouncements = (event: any) => {
        let checked = event.target.checked;
        let enableAnnouncements = checked ? 'Y' : 'N'

        this.enableAnnouncementsSupportFeature(enableAnnouncements)
    }

    async enableAnnouncementsSupportFeature(enableAnnouncements: any) {
        try {
            let input = {   
                enable_announcements: enableAnnouncements
            }
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/announcements/enable`
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

export default AnnouncementFeatures