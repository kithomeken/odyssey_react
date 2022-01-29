import React, { useState } from "react"
import { Helmet } from "react-helmet"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import { securityRoutes } from "../../../routes/settings/securityRoutes"

const CreateAuthorizationTeam = () => {
    const [state, setstate] = useState({
        isLoading: false,
        requestFailed: false,
    })

    const showButton = false
    const pageTitle = "Create Authorization Group"
    const thisPageRoutes = securityRoutes[1].path

    const breadCrumb = [
        { linkItem: true, title: "Security", url: thisPageRoutes },
        { linkItem: true, title: "Authorization Groups", url: thisPageRoutes },
        { linkItem: false, title: "Create" },
    ]

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <BreadCrumbs breadCrumbDetails={breadCrumb} />

            <Header title={pageTitle}
                showButton={showButton}
            />
            
        </React.Fragment>
    )
}

export default CreateAuthorizationTeam