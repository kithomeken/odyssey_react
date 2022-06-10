import React, { useState } from "react"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"

import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HeaderParagraph from "../../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry"
import ActivateFeature from "../../../../lib/activations/ActivateFeature"
import { featuresRoutes } from "../../../../routes/settings/featuresRoutes"
import { generalRoutes } from "../../../../routes/settings/generalRoutes"
import Error500 from "../../../errors/Error500"

const Announcements = () => {
    const [state, setstate] = useState({
        isLoading: false,
        requestFailed: false,
        allowAnnouncements: false,
    })

    const showButton = false
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

            <div className={`px-12 py-3 w-full ${HEADER_SECTION_BG} form-group mb-3`}>
                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                />

                <HeaderParagraph title="An extension of your in-house communication between you and your users in the form of a broadcast. Send important messages/updates that will reach all your users, or if you'd like a specific set of users." />
            </div>

            <div className="flex items-center px-12 py-4 lg:justify-between w-full">
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

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-10/12 m-auto">
                                    <ActivateFeature
                                        link={featuresRoutes[0].path}
                                        linkName="Support Features"
                                    />
                                </div>
                            )
                        )
                    )
                }
            </div>


            <div className="w-full form-group">
                <div className="w-10/12">

                </div>
            </div>
        </React.Fragment>
    )
}

export default Announcements