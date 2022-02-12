import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"

import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import ActivateFeature from "../../../../lib/activations/ActivateFeature"
import { generalRoutes } from "../../../../routes/settings/generalRoutes"
import Error500 from "../../../errors/Error500"

const Announcements = () => {
    const [state, setstate] = useState({
        isLoading: false,
        requestFailed: false,
        allowAnnouncements: false,
    })

    const pageTitle = "Announcements"
    const thisPageRoutes = generalRoutes[0].path

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: thisPageRoutes },
        { linkItem: false, title: pageTitle },
    ]

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <BreadCrumbs breadCrumbDetails={breadCrumb} />

            <div className="flex items-center py-4 lg:justify-between w-full">
                <div className="flex-1 min-w-0">
                    <h2 className="text-3xl leading-7 text-green-500 sm:text-2xl sm: mb-0">
                        {pageTitle}
                    </h2>
                </div>

                {
                    state.isLoading || state.requestFailed ? (
                        null
                    ) : (
                        state.allowAnnouncements ? (
                            <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                <span className="hidden sm:block">
                                    <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`} /* onClick={this.showAnnouncementPanel} */>
                                        <span className="text-sm">
                                            Send Announcement
                                        </span>
                                        
                                        <span className={`ml-2 fal fa-megaphone`}></span>  
                                    </button>
                                </span>
                            </div>
                        ) : (
                            null
                        )
                    )
                }
            </div>

            {
                state.isLoading ? (
                    <div className="flex flex-col align-middle mt-4 w-full h-16">
                        <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                    </div>
                ) : (
                    state.requestFailed ? (
                        <div className="w-full form-group">
                            <div className="w-10/12 m-auto">
                                <Error500 />
                            </div>
                        </div>
                    ) : (
                        state.allowAnnouncements ? (
                            <div>
                                <div className="w-full form-group">
                                    <div className="w-9/12 mb-5">
                                        <p className="text-sm form-group mb-0 text-gray-600">
                                            An extension of your in-house communication between you and your users in the form of a broadcast. Send important messages/updates that will reach all your users, or if you'd like a specific set of users.
                                        </p>
                                    </div>
                                </div>



                            </div>
                        ) : (
                            <ActivateFeature
                                link=""
                                linkName="Support Features"
                            />
                        )
                    )
                )
            }

            <div className="w-full form-group">
                <div className="w-10/12">
                    
                </div>
            </div>
        </React.Fragment>
    )
}

export default Announcements