import React, {Component} from 'react'
import Helmet from 'react-helmet'

// Components
import BreadCrumbs from '../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../components/layouts/parameters/Header'
import {featuresRoutes} from "../../../routes/parameters/featuresRoutes"

// Modules
import AgentFeatures from './modules/AgentFeatures'
import AnnouncementFeatures from './modules/AnnouncementFeatures'
import ClientFeatures from './modules/ClientFeatures'
import EscalationFeatures from './modules/EscalationFeatures'

class SupportFeatures extends Component {
    state = {
        activeTab: 'agents'
    }

    render() {
        const pageTitle = "Support Features"
        const supportFeaturesRoutes = featuresRoutes[0].path
        const activeTab = this.state.activeTab

        const showButton = false
        const breadCrumb = [
            { linkItem: true, title: "Features", url: supportFeaturesRoutes },
            { linkItem: false, title: "Support" },
        ]

        return(
            <React.Fragment>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle} showButton={showButton} />

                <div className="w-full form-group">
                    <div className="w-10/12">
                        <p className="text-sm form-group text-gray-500">
                            We have a tonne of support features available on Odyssey that help us tailor the system to your exact needs. Unfortunately not all may apply to you or your users. And as such, to best suit your experience and performance, select all support features and channels that may apply to your business flow
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-row">
                    <div className="w-auto cursor-pointer" onClick={() => this.activateTab('agents')}>
                        <button className={this.classNames(
                            activeTab === 'agents' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Agent Features</span>
                        </button>
                    </div>
                    
                    <div className="w-auto cursor-pointer" onClick={() => this.activateTab('clients')}>
                        <button className={this.classNames(
                            activeTab === 'clients' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Client Features</span>
                        </button>
                    </div>

                    <div className="w-auto cursor-pointer" onClick={() => this.activateTab('announcements')}>
                        <button className={this.classNames(
                            activeTab === 'announcements' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Announcement Features</span>
                        </button>
                    </div>

                    <div className="w-auto cursor-pointer" onClick={() => this.activateTab('escalations')}>
                        <button className={this.classNames(
                            activeTab === 'escalations' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Escalation Matrix</span>
                        </button>
                    </div>

                    <div className="flex-grow border-b-2">

                    </div>
                </div>

                <div className="w-full px-3">
                    {this.loadRespectiveTab(activeTab)}
                </div>
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.setState({
            activeTab: 'agents'
        })
    }

    classNames(...classes: any[]) {
        return classes.filter(Boolean).join(' ')
    }

    activateTab(tabName: any) {
        this.setState({
            activeTab: tabName
        })
    }

    loadRespectiveTab(tabName = 'agents') {
        switch (tabName) {
            case 'agents':
                return <AgentFeatures />
            
            case 'clients':
                return <ClientFeatures />

            case 'announcements':
                return <AnnouncementFeatures />

            case 'escalations':
                return <EscalationFeatures />

            default:
                return null
        }
    }
}

export default SupportFeatures