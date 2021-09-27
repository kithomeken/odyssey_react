import React, {Component} from 'react'
import Helmet from 'react-helmet'

// Components
import BreadCrumbs from '../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../components/layouts/parameters/Header'
import {featuresRoutes} from "../../../routes/parameters/featuresRoutes"
import ApiService from "../../../services/ApiServices"
import HttpService from "../../../services/HttpServices"
import ComplementaryTicketFeatures from './modules/ComplementaryTicketFeatures'
import MainTicketFeatures from './modules/MainTicketFeatures'

const apiHeader = ApiService.apiDomain()

class TicketFeatures extends Component {
    state = {
        activeTab: 'main',
        loading: true,
        errorMode: false,
        features: null
    }

    render() {
        const pageTitle = "Ticket Features"
        const supportFeaturesRoutes = featuresRoutes[0].path
        const activeTab = this.state.activeTab

        const showButton = false
        const breadCrumb = [
            { linkItem: true, title: "Features", url: supportFeaturesRoutes },
            { linkItem: false, title: "Ticket" },
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
                    <div className="w-auto cursor-pointer" onClick={() => this.activateTab('main')}>
                        <button className={this.classNames(
                            activeTab === 'main' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Main Features</span>
                        </button>
                    </div>
                    
                    <div className="w-auto cursor-pointer" onClick={() => this.activateTab('complementary')}>
                        <button className={this.classNames(
                            activeTab === 'complementary' ? 'text-green-700 border-b-2 border-green-400' : 'hover:text-gray-700 text-gray-500 hover:bg-gray-100 border-b-2',
                            "text-sm items-center block p-2 px-3 rounded-t rounded-b-none"
                        )}>
                            <span className="lolrtn robot">Complementary Features</span>
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
            activeTab: 'main'
        })

        this.fetchTicketFeaturesApiCall()
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
            case 'main':
                return <MainTicketFeatures 
                    loading={this.state.loading}
                    features={this.state.features}
                    errorMode={this.state.errorMode}
                />

            case 'complementary':
                return <ComplementaryTicketFeatures 
                    loading={this.state.loading}
                    features={this.state.features}
                    errorMode={this.state.errorMode}
                />

            default:
                return null
        }
    }

    async fetchTicketFeaturesApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/features/tickets/all`
            const response: any = await HttpService.httpGet(apiConsumed)
            console.log(response)

            if (response.data.success) {
                let features = response.data.data

                this.setState({
                    loading: false,
                    features: features
                })
            } else {
                this.setState({
                    loading: false,
                    // errorMode: true
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    onChangeToggleHandler = (event: any) => {
        let checked = event.target.checked;
        let toggleStatus = checked ? 'Y' : 'N'

        this.postTicketFeaturesApiCall(event.target.name, toggleStatus)
    }

    async postTicketFeaturesApiCall(inputName: any, value: any) {
        try {
            let input = {
                inputName: value
            }

            let apiConsumed = apiHeader + `portal/a/site-master/features/tickets/config`
            const response: any = await HttpService.httpPost(apiConsumed, input)

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

export default TicketFeatures