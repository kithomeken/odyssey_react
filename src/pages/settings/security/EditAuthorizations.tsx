import React from "react"
import { Helmet } from "react-helmet"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import { securityRoutes } from "../../../routes/settings/securityRoutes"

const EditAuthorizations = () => {
    const groupOrTeam = 'Team'
    const showButton = false
    const pageTitle = "Edit Authorization " + groupOrTeam
    const thisPageRoutes = securityRoutes[0].path

    const breadCrumb = [
        { linkItem: true, title: "Security", url: thisPageRoutes },
        { linkItem: true, title: "Authorization " + groupOrTeam, url: thisPageRoutes },
        { linkItem: false, title: "Edit" },
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

export default EditAuthorizations