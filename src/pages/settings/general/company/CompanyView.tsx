import React from "react"
import { Helmet } from "react-helmet"
import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HeaderParagraph from "../../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry"

const CompanyView = () => {
    const showButton = false
    const pageTitle = "Company Details"

    const breadCrumb = [
        { linkItem: true, title: "General Settings", url: "" },
        { linkItem: true, title: "Company Groups", url: "" },
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

                <HeaderParagraph title="View company details and add contact information" />
            </div>
        </React.Fragment>
    )
}

export default CompanyView