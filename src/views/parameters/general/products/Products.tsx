import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

// Components
import BreadCrumbs from '../../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../../components/layouts/parameters/Header'
import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"
import { generalRoutes } from '../../../../routes/parameters/generalRoutes'
import ReactTable from '../../../../components/Tables/ReactTables'
import NoDataReactTable from '../../../../components/Tables/NoDataReactTable'

const apiHeader = ApiService.apiDomain()

class Products extends Component {
    state = {
        loading: true,
        data: null
    }

    render() {
        const pageTitle = "Product Management"
        const createProductRoute = generalRoutes[1].path

        const breadCrumb = [
            { linkItem: true, title: "General Settings", url: createProductRoute },
            { linkItem: false, title: pageTitle },
        ]

        const showButton = true
        const buttonTitle = "Add Product"
        const buttonIcon = true
        const iconType = "fal fa-box-full"
        const buttonColor = "green"
        const buttonHoverColor = "green"
        const buttonLink = createProductRoute

        const columns =  [
            {
                Header: 'Product Name',
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
                Header: ' ',
                accessor: (data: { uuid: any }) => (
                    <Link to={`products/${data.uuid}`} className="text-blue-600 m-auto text-right float-right cursor-pointer hover:text-blue-900 text-sm">
                        Details
                    </Link>
                )
            },
        ]

        return (
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
                        <p className="text-sm form-group text-gray-500">
                            Configure the various products your team(s) support within your business workflow to Odysseys workstreams and track the issues/tickets raised on each product.
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
                            this.state.data === null ? (
                                <NoDataReactTable columns={columns} />
                            ) : (
                                <ReactTable columns={columns} data={this.state.data} />
                            )
                        )
                    }
                </div>
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.allProductsApiCall()
    }

    async allProductsApiCall() {
        try {
            let apiConsumed = apiHeader + `portal/a/site-master/general/products/all`
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

export default Products