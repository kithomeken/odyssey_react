import React, {Component} from 'react'
import { Helmet } from 'react-helmet'
import {RouteComponentProps, Link} from 'react-router-dom'

// Components
import BreadCrumbs from '../../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../../components/layouts/parameters/Header'
import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"
import {generalRoutes} from '../../../../routes/parameters/generalRoutes'
import NoDataFound from '../../../errors/NoDataFound'

const apiHeader = ApiService.apiDomain()
const domainHeader = ApiService.FQDN()

class CompanyDetails extends Component<RouteComponentProps<{uuid: string}>> {
    state = {
        data: {
            name: '',
            logo: '',
            domain: '',
            suspended: 'N',
            description: '',
            created_at: '',
            contacts: [],
        },
        loading: true,
        httpError: false,
        showPanel: false,
        companyId: this.props.match.params.uuid,
    }

    render() {
        const pageTitle = "Company Details"
        const companyGroupRoute = generalRoutes[3].path

        const breadCrumb = [
            { linkItem: true, title: "General Settings", url: companyGroupRoute },
            { linkItem: true, title: "Company Groups", url: companyGroupRoute },
            { linkItem: false, title: pageTitle },
        ]

        const loading = this.state.loading
        const httpError = this.state.httpError
        const data = this.state.data

        return(
            <React.Fragment>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <div className="w-full form-group mt-8">
                    {
                        loading ? (
                            <div>
                                <div className="w-full mb-2 px-4 form-group">
                                    <h2 className="text-3xl leading-7 text-green-500 sm:text-2xl sm: mb-0">
                                        Company Details
                                    </h2>
                                </div>
                                
                                <div className="flex flex-col align-middle mt-6 h-16">
                                    <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                                </div>
                            </div>
                        ) : (
                            httpError ? (
                                <div>
                                    <div className="w-full mb-2 px-4 form-group">
                                        <h2 className="text-3xl leading-7 text-green-500 sm:text-2xl sm: mb-0">
                                            Company Details
                                        </h2>
                                    </div>

                                    <div className="w-full form-group">
                                        <NoDataFound />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-9/12 form-group">
                                    <div className="w-full mb-2 px-4 form-group">
                                        <h2 className="text-3xl leading-7 text-green-500 sm:text-2xl sm: mb-0">
                                            {data.name}
                                        </h2>

                                        <span className="block text-gray-500 text-sm">
                                            Created {data.created_at}
                                        </span>
                                    </div>

                                    {/* <div className="w-full flex flex-row">
                                        <button type="submit" 
                                            className={`flex items-center px-4 py-2 bg-white border-0 rounded-md shadow-0 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:bg-gray-200 mr-1`} >
                                            <span className="fal fa-highlighter mr-2"></span>

                                            <span className="text-sm">
                                                Edit Details
                                            </span>
                                        </button>
                                        
                                        <button type="submit" 
                                            className={`flex items-center px-4 py-2 bg-white border-0 rounded-md shadow-0 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:bg-gray-200 mr-1`} >
                                            <span className="fal fa-minus-octagon mr-2"></span>

                                            <span className="text-sm">
                                                Suspend
                                            </span>
                                        </button>
                                    </div>

                                    <hr className="my-3 border-gray-300" /> */}

                                    <div className="w-full flex flex-row pl-4">
                                        <div className="w-2/12">
                                            <p className="form-group text-sm text-gray-600">
                                                Details:
                                            </p>
                                        </div>


                                        <div className="w-10/12">
                                            {
                                                data.suspended === 'Y' ? (
                                                    <div className="w-full border border-red-700 bg-red-200 rounded-md p-3 form-group">
                                                        <span className="text-red-800 text-center m-auto block text-sm">
                                                            {data.name} is suspended from raising any further tickets
                                                        </span>
                                                    </div>
                                                ) : (
                                                    null
                                                )
                                            }

                                            <p className="form-group text-sm">
                                                {data.description}
                                            </p>

                                            <div className="w-full form-group">
                                                <p className="text-sm mb-1">
                                                    Tickets raised tagged with company id
                                                </p>
                                                
                                                <p className="text-2xl mb-1">
                                                    0
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    Company group currently has no tickets raised under it's wings 
                                                </p>
                                            </div>

                                            {
                                                data.logo === null ? (
                                                    null
                                                ) : (
                                                    <div className="w-full">
                                                        <img src={`${domainHeader}/uploads/company-logos/${data.logo}`} className="m-auto h-24 form-group mx-0 w-full text-sm" alt={`${data.name} Company Logo`} height="100" />
                                                    </div>
                                                )
                                            }

                                            {
                                                data.domain === null ? (
                                                    null
                                                ) : (
                                                    <div className="w-full flex flex-row form-group">
                                                        <div className="w-9/12">
                                                            <a href={data.domain} target="_blank" className="text-blue-600 text-sm visited:text-purple-600 block">
                                                                {data.domain}
                                                            </a>
                                                        </div>
                                                        
                                                        <div className="w-3/12">
                                                            {
                                                                data.logo === null ? (
                                                                    null
                                                                ) : (
                                                                    <button className="text-gray-600 text-sm float-right block">
                                                                        Change logo
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            <hr className="mb-3" />
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-row pl-4">
                                        <div className="w-2/12">
                                            <p className="form-group text-sm text-gray-600">
                                                Contacts:
                                            </p>
                                        </div>

                                        <div className="w-10/12">
                                            <div className="w-full">
                                                <p className="mb-3 text-sm text-black">
                                                    The company's first point of contact in the need of emergency or assistance
                                                </p>

                                                <div className="w-full pl-8">
                                                    {
                                                        data.contacts.map(
                                                            (item: any) => (
                                                                <div className="mb-3 flex flex-row">
                                                                    <div className="flex-fill">
                                                                        <span className="block text-gray-600 text-sm">
                                                                            {item.support_email}
                                                                        </span>
                                                                    </div>

                                                                    <div className="ml-3">

                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        )
                    }




                </div>
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.productDetailsApiCall()
    }

    async productDetailsApiCall() {
        try {
            const companyId = this.state.companyId
            const apiToBeConsumed = apiHeader + `portal/a/site-master/general/company-groups/${companyId}`
            const response: any = await HttpService.httpGet(apiToBeConsumed)
            console.log(response.data.data)

            if (response.data.success) {                
                this.setState({
                    loading: false,
                    data: response.data.data,
                    pageTitle: response.data.data.name,
                })
            } else {
                this.setState({
                    data: null,
                    loading: false,
                    httpError: true,
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                data: null,
                loading: false,
                httpError: true,
            })
        }
    }
}

export default CompanyDetails