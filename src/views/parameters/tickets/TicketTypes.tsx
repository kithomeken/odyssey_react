import React, {Component} from 'react'
import { Helmet } from 'react-helmet'

// Components
import BreadCrumbs from '../../../components/layouts/parameters/BreadCrumbs'
import ApiService from "../../../services/ApiServices"
import HttpService from "../../../services/HttpServices"
import { ticketRoutes } from '../../../routes/parameters/ticketRoutes'
import ReactTable from '../../../components/Tables/ReactTables'
import NoDataReactTable from '../../../components/Tables/NoDataReactTable'
import Error500 from '../../errors/500'
import { Link } from 'react-router-dom'
import CreateTicketTypes from './CreateTicketTypes'

const apiHeader = ApiService.apiDomain()

class TicketTypes extends Component {
    state = {
        data: null,
        loading: true,
        errorMode: false,
        loadingTable: true,
        postingFormData: false,
        showPanel: false,
    }

    constructor(props: any) {
        super(props)
        this.showCreateTypePanel = this.showCreateTypePanel.bind(this)
        this.closeCreateTypePanel = this.closeCreateTypePanel.bind(this)
    }

    closeCreateTypePanel = () => {
        this.setState({
            showPanel: false
        })
    }
    
    showCreateTypePanel = () => {
        this.setState({
            showPanel: true,
        })
    }

    render() {
        const pageTitle = "Ticket Types"
        const ticketTypesRoute = ticketRoutes[0].path

        const breadCrumb = [
            { linkItem: true, title: "General Settings", url: ticketTypesRoute },
            { linkItem: false, title: pageTitle },
        ]

        const columns =  [
            {
                Header: 'Ticket Type',
                accessor: (data: {name: any, description: any}) => (
                    <span>
                        <span className="block text-black text-sm">
                            {data.name}
                        </span>
                        
                        <span className="block text-gray-500 text-sm">
                            {data.description}
                        </span>
                    </span>
                ),
            },
            {
                Header: ' ',
                accessor: (data: { uuid: any }) => (
                    <Link to={`types/${data.uuid}`} className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-900 text-sm">
                        Details
                    </Link>
                )
            },
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
                                        <button type="button" className={`inline-flex items-center px-4 py-1 border border-green-500 rounded shadow-sm text-sm text-white bg-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`} onClick={this.showCreateTypePanel}>
                                            <span className="text-sm">
                                                Create Type
                                            </span>
                                            
                                            <span className={`ml-2 fal fa-betamax`}></span>  
                                        </button>
                                    </span>
                                </div>
                            )
                        )
                    }
                </div>

                <div className="w-full form-group">
                    <div className="w-10/12 mb-5">
                        <p className="text-sm form-group mb-0 text-gray-600">
                            Create ticket types to group all the issues raised by your client base. Makes it easier to manage and classify all issues increasing productivity and workflow. 
                        </p>
                    </div>
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
                            <div className="w-full">
                                {
                                    this.state.data === null ? (
                                        <NoDataReactTable columns={columns} />
                                    ) : (
                                        <ReactTable columns={columns} data={this.state.data} />
                                    )
                                }

                                <CreateTicketTypes
                                    showPanel={this.state.showPanel} 
                                    closePanel={this.closeCreateTypePanel} 
                                    data={this.state.data}
                                    reloadTable={this.reloadTicketTypesTable}
                                />
                            </div>
                        )
                    )
                }
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.allTicketTypesApiCall()
    }

    reloadTicketTypesTable = () => {
        this.allTicketTypesApiCall()
    }

    async allTicketTypesApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/tickets/types/all`
            const response : any = await HttpService.httpGet(apiConsumed)

            if (response.status === 200) {
                const data = response.data

                this.setState({
                    data: data,
                    loading: false,
                })
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

}

export default TicketTypes