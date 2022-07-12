import React, { useState } from "react"
import { Helmet } from "react-helmet"

import BreadCrumbs from "../../../../components/settings/BreadCrumbs"
import Header from "../../../../components/settings/Header"
import HeaderParagraphLarge from "../../../../components/settings/HeaderParagraphLarge"
import { APPLICATION_NAME, HEADER_SECTION_BG } from "../../../../global/ConstantsRegistry"
import { featuresRoutes } from "../../../../routes/settings/featuresRoutes"
import AgentFeatures from "./AgentFeatures"
import AnnouncementFeatures from "./AnnouncementFeatures"
import ClientFeatures from "./ClientFeatures"
import EscalationMatrix from "./EscalationMatrix"

const SupportFeatures = () => {
    const [state, setstate] = useState({
        activeTab: 'agents',
        isLoading: true,
        requestFailed: false,
    })

    const showButton = false
    const pageTitle = "Support Features"
    const thisPageRoutes = featuresRoutes[0].path
    const applicationName = APPLICATION_NAME

    const breadCrumb = [
        { linkItem: true, title: "Features", url: thisPageRoutes },
        { linkItem: false, title: pageTitle },
    ]

    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    const activateTab = (tabName: any) => {
        setstate({
            ...state,
            activeTab: tabName
        })
    }

    const loadRespectiveTab = (tabName = 'agents') => {
        switch (tabName) {
            case 'agents':
                return <AgentFeatures />

            case 'clients':
                return <ClientFeatures />

            case 'announcements':
                return <AnnouncementFeatures />

            case 'escalations':
                return <EscalationMatrix />

            default:
                return null
        }
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
                />

                <HeaderParagraphLarge title={`We have a tonne of support features available on ${applicationName} that help us tailor the system to your exact needs. As per usual, not all may be applicable to you or your users. And as such, to best suit your workflow experience and performance, select all support features that may apply to your business flow.`} />
            </div>

            <div className="w-full px-12 form-group">
                <div className="w-full flex flex-row">
                    <div className="w-auto cursor-pointer" onClick={() => activateTab('agents')}>
                        <button className={classNames(
                            state.activeTab === 'agents' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Agent Features</span>
                        </button>
                    </div>

                    <div className="w-auto cursor-pointer" onClick={() => activateTab('clients')}>
                        <button className={classNames(
                            state.activeTab === 'clients' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Client Features</span>
                        </button>
                    </div>

                    <div className="w-auto cursor-pointer" onClick={() => activateTab('announcements')}>
                        <button className={classNames(
                            state.activeTab === 'announcements' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Announcement Features</span>
                        </button>
                    </div>

                    <div className="w-auto cursor-pointer" onClick={() => activateTab('escalations')}>
                        <button className={classNames(
                            state.activeTab === 'escalations' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Escalation Matrix</span>
                        </button>
                    </div>

                    <div className="flex-grow border-b-2">

                    </div>
                </div>

                <div className="w-full px-3">
                    {loadRespectiveTab(state.activeTab)}
                </div>
            </div>

        </React.Fragment>
    )
}

export default SupportFeatures