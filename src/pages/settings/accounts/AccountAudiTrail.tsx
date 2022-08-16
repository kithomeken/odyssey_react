import React from "react"
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import BreadCrumbs from "../../../components/settings/BreadCrumbs";
import Header from "../../../components/settings/Header";
import { HEADER_SECTION_BG } from "../../../global/ConstantsRegistry";
import { accountRoutes } from "../../../routes/settings/accountRoutes";

export const AccountAuditTrail = () => {
    // Header button
    const showButton = false
    const params = useParams();
    const pageTitle = "Audi Trail"
    const AGNT_ACCOUNT_RT: any = (accountRoutes.find((routeName) => routeName.name === 'AGNT'))?.path

    const breadCrumb = [
        { linkItem: true, title: "Account Settings", url: AGNT_ACCOUNT_RT },
        { linkItem: true, title: "Agent Accounts", url: AGNT_ACCOUNT_RT },
        { linkItem: true, title: "Agent", url: AGNT_ACCOUNT_RT },
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
            </div>
        </React.Fragment>
    )
}