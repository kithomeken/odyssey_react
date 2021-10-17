import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'

// Components
import BreadCrumbs from '../../../../components/layouts/parameters/BreadCrumbs'
import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"
import {generalRoutes} from '../../../../routes/parameters/generalRoutes'
import {featuresRoutes} from '../../../../routes/parameters/featuresRoutes'
import ActivateFeature from '../../../errors/ActivateFeature'
import ReactTable from '../../../../components/Tables/ReactTables'
import NoDataReactTable from '../../../../components/Tables/NoDataReactTable'
import AnnouncementPanel from './AnnouncementPanel'
import Error500 from '../../../errors/500'

const apiHeader = ApiService.apiDomain()

class Announcements extends Component {
    state = {
        data: null,
        loading: true,
        errorMode: false,
        loadingTable: true,
        activeTab: 'tickets',
        postingFormData: false,
        showPanel: false,
        supportFeatures: {
            announcements: null,
        },
    }

    constructor(props: any) {
        super(props)
        this.showAnnouncementPanel = this.showAnnouncementPanel.bind(this)
        this.closeAnnouncementPanel = this.closeAnnouncementPanel.bind(this)
    }

    closeAnnouncementPanel = () => {
        this.setState({
            showPanel: false
        })
    }
    
    showAnnouncementPanel = () => {
        this.setState({
            showPanel: true,
        })
    }

    render() {
        const pageTitle = "Announcements"
        const generalSettingsRoutes = generalRoutes[6].path
        const supportFeaturesRoutes = featuresRoutes[0].path

        const breadCrumb = [
            { linkItem: true, title: "General Settings", url: generalSettingsRoutes },
            { linkItem: false, title: "Announcements" },
        ]

        const columns =  [
            {
                Header: 'Announced By',
                accessor: (data: {first_name: any, last_name: any, email: any}) => (
                    <span>
                        <span className="block text-black text-sm">
                            {data.first_name} {data.last_name}
                        </span>
                        
                        <span className="block text-gray-400 text-sm">
                            {data.email}
                        </span>
                    </span>
                ),
            },
            {
                Header: 'Announcement Title',
                accessor: (data: {title: any}) => (
                    <span>
                        <span className="block text-black text-sm">
                            {data.title}
                        </span>
                    </span>
                ),
            },
            {
                Header: 'Announced To',
                accessor: (data: {team_name: any}) => (
                    <span>
                        <span className="block text-black text-sm">
                            {data.team_name}
                        </span>
                    </span>
                ),
            },
            {
                Header: 'Announced On',
                accessor: (data: {created_at: any}) => (
                    <span>
                        <span className="block text-black text-sm text-right">
                            {data.created_at}
                        </span>
                    </span>
                ),
            },
            /* {
                Header: ' ',
                accessor: (data: { uuid: any }) => (
                    <Link to={`announcements/${data.uuid}`} className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-900 text-sm">
                        Details
                    </Link>
                )
            }, */
        ]

        return(
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
                        this.state.loading ? (
                            null
                        ) : (
                            this.state.errorMode ? (
                                null
                            ) : (
                                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                    <span className="hidden sm:block">
                                        <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`} onClick={this.showAnnouncementPanel}>
                                            <span className="text-sm">
                                                Send Announcement
                                            </span>
                                            
                                            <span className={`ml-2 fal fa-megaphone`}></span>  
                                        </button>
                                    </span>
                                </div>
                            )
                        )
                    }
                </div>


                {
                    this.state.loading ? (
                        <div className="flex flex-col align-middle mt-4 w-full h-16">
                            <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                        </div>
                    ) : (
                        this.state.errorMode ? (
                            <div className="w-full form-group">
                                <Error500 />
                            </div>
                        ) : (
                            this.state.supportFeatures.announcements === 'Y' ? (
                                <div>
                                    <div className="w-full form-group">
                                        <div className="w-9/12 mb-5">
                                            <p className="text-sm form-group mb-0 text-gray-600">
                                                An extension of your in-house communication between you and your users in the form of a broadcast. Send important messages/updates that will reach all your users, or if you'd like a specific set of users.
                                            </p>
                                        </div>
                                    </div>

                                    {
                                        this.state.loadingTable ? (
                                            <div className="flex flex-col align-middle mt-4 w-full h-16">
                                                <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                                            </div>
                                        ) : (
                                            this.state.data === null ? (
                                                <NoDataReactTable columns={columns} />
                                            ) : (
                                                <ReactTable columns={columns} data={this.state.data} />
                                            )
                                        )
                                    }

                                    <AnnouncementPanel
                                        showPanel={this.state.showPanel} 
                                        closePanel={this.closeAnnouncementPanel} 
                                        data={this.state.data}
                                        reloadTable={this.reloadAnnouncementsTable}
                                    />
                                </div>
                            ) : (
                                <ActivateFeature
                                    link={supportFeaturesRoutes}
                                    linkName='Support Features'
                                />
                            )
                        )
                    )
                }
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.supportFeaturesApiCall()
    }

    async supportFeaturesApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/features/support/all`
            const response : any = await HttpService.httpGet(apiConsumed)
            
            if (response.data.success) {
                const data = response.data.data

                this.setState({
                    loading: false,
                    supportFeatures: {
                        announcements: data.announcements,
                    }
                })
                
                if (this.state.supportFeatures.announcements === 'Y') {
                    this.allAnnouncementsApiCall()
                }
            } else {
                this.setState({
                    loading: false,
                    errorMode: true,
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                loading: false,
                errorMode: true,
            })
        }
    }

    reloadAnnouncementsTable = () => {
        this.allAnnouncementsApiCall()
    }

    async allAnnouncementsApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/general/announcements/all`
            const response : any = await HttpService.httpGet(apiConsumed)
            console.log(response)

            if (response.data.success) {
                const data = response.data.data

                this.setState({
                    data: data,
                    loadingTable: false,
                })
            } else {
                this.setState({
                    loadingTable: false,
                    errorMode: true,
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                loadingTable: false,
                errorMode: true,
            })
        }
    }
}

export default Announcements