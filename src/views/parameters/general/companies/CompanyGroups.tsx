import React, {Component} from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// Components
import BreadCrumbs from '../../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../../components/layouts/parameters/Header'
import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"
import {generalRoutes} from '../../../../routes/parameters/generalRoutes'
import ReactTable from '../../../../components/Tables/ReactTables'

const apiHeader = ApiService.apiDomain()

class CompanyGroups extends Component {
    state = {
        loading: true,
        data: null
    }

    render() {
        const pageTitle = "Company Groups"
        const companyGroupRoute = generalRoutes[3].path
        const createCompanyRoute = generalRoutes[4].path

        const breadCrumb = [
            { linkItem: true, title: "General Settings", url: companyGroupRoute },
            { linkItem: false, title: pageTitle },
        ]

        const showButton = true
        const buttonTitle = "Create Company"
        const buttonIcon = true
        const iconType = "fal fa-registered"
        const buttonColor = "green"
        const buttonHoverColor = "green"
        const buttonLink = createCompanyRoute

        const columns =  [
            {
                Header: 'Company Name',
                accessor: (data: {name: any, description: any}) => (
                    <span>
                        <span className="block text-black text-sm">
                            {data.name}
                        </span>

                        <span className="block text-gray-500 mb-0 text-sm">
                            {data.description}
                        </span>
                    </span>
                ),
            },
            {
                Header: 'Status',
                accessor: (data: { suspended: any }) => (
                    data.suspended === 'Y' ? (
                        <span className="flex items-center">
                            <span className="h-3 w-3 align-middle bg-red-500 rounded-full mr-3"></span>
                            
                            <span className="text-gray-500 text-sm align-middle">
                                Suspended
                            </span>
                        </span>
                    ) : (
                        <span className="flex items-center">
                            <span className="h-3 w-3 align-middle bg-green-500 rounded-full mr-3"></span>
                            
                            <span className="text-gray-500 text-sm align-middle">
                                Active
                            </span>
                        </span>
                    )
                )
            },
            {
                Header: ' ',
                accessor: (data: { uuid: any }) => (
                    <Link to={`company-groups/${data.uuid}`} className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-900 text-sm">
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

                <Header title={pageTitle}
                    showButton={showButton}
                    buttonTitle={buttonTitle}
                    buttonIcon={buttonIcon}
                    iconType={iconType}
                    buttonColor={buttonColor}
                    buttonHoverColor={buttonHoverColor}
                    buttonLink={buttonLink}
                />

                <div className="w-full form-group">
                    <div className="w-10/12">
                        <p className="text-sm text-gray-500">
                            Create companies and make it easier to manage support requests from the same group of companies. Add contact information for your support team to easily seek assitance on issues raised by each company group.
                        </p>
                    </div>
                </div>

                <div className="w-full form-group">
                    {
                        this.state.loading ? (
                            <div className="flex flex-col align-middle mt-6 h-16">
                                <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                            </div>
                        ) : (
                            
                                <ReactTable 
                                    columns={columns} 
                                    data={this.state.data} />
                            // )

                        )
                    }
                </div>

            </React.Fragment>
        )
    }

    componentDidMount() {
        this.allCompanyGroupsApiCall()
    }

    async allCompanyGroupsApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/general/company-groups/all`
            const response: any = await HttpService.httpGet(apiConsumed)
            console.log(response.data.data.data);

            if (response.data.success) {
                this.setState({
                    loading: false,
                    data: response.data.data.data
                })
            } else {
                this.setState({
                    loading: true,
                    data: null
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default CompanyGroups