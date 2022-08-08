import React, { useState } from "react"
import { Helmet } from "react-helmet"
import BreadCrumbs from "../../../components/settings/BreadCrumbs"
import Header from "../../../components/settings/Header"
import HeaderParagraph from "../../../components/settings/HeaderParagraph"
import { HEADER_SECTION_BG, APPLICATION_NAME } from "../../../global/ConstantsRegistry"
import { InviteAgents } from "./InviteAgents"

export const AgentAccounts = () => {
    const [state, setstate] = useState({
        data: null,
        show: false,
        status: 'pending',
        requestFailed: '',
    })

    // Header button
    const pageTitle = "Agent Accounts"
    const showButton = true
    const actionButton = true
    const buttonTitle = "Invite Team"
    const buttonIcon = true
    const iconType = "fas fa-plus-circle"

    const breadCrumb = [
        { linkItem: true, title: "Account Settings", url: "" },
        { linkItem: false, title: pageTitle },
    ]

    const showOrHideModal = () => {
        setstate({
            ...state, show: !state.show
        })
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>

            <div className={`px-12 py-3 w-full ${HEADER_SECTION_BG} form-group mb-3`}>
                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                    actionButton={actionButton}
                    actionEvent={showOrHideModal}
                    buttonTitle={buttonTitle}
                    buttonIcon={buttonIcon}
                    iconType={iconType}
                />

                <HeaderParagraph title={`Master accounts control the administrative aspects of ${APPLICATION_NAME}, like account management, authorizations, helpdesk features among others, and furthermore help pay the bills at the end of the month (someone's got to do it).`} />
            </div>

            <InviteAgents
                show={state.show}
                showOrHideModal={showOrHideModal}
            />
        </React.Fragment>
    )
}