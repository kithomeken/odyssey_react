import React, {Component} from 'react'
import { Helmet } from 'react-helmet'
import {RouteComponentProps} from 'react-router-dom'

// Components
import BreadCrumbs from '../../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../../components/layouts/parameters/Header'
import ApiService from "../../../../services/ApiServices"
import HttpService from "../../../../services/HttpServices"
import {generalRoutes} from '../../../../routes/parameters/generalRoutes'
import NoDataFound from '../../../errors/NoDataFound'
import ProductPanel from './ProductPanel'

const apiHeader = ApiService.apiDomain()

class ProductDetails extends Component<RouteComponentProps<{uuid: string}>> {
    state = {
        data: {
            name: null,
            description: null,
            updated_at: null,
        },
        loading: true,
        httpError: false,
        showPanel: false,
        pageTitle: "Product Details",
        productId: this.props.match.params.uuid,
    }

    constructor(props: any) {
        super(props)
        this.showProductPanel = this.showProductPanel.bind(this)
        this.closeProductPanel = this.closeProductPanel.bind(this)
    }

    closeProductPanel = () => {
        this.setState({
            showPanel: false
        })
    }
    
    showProductPanel = () => {
        this.setState({
            showPanel: true,
        })
    }

    componentDidMount() {
        this.productDetailsApiCall()
    }

    render() {
        const showButton = false
        const pageTitle = this.state.pageTitle
        const productRoute = generalRoutes[0].path

        const breadCrumb = [
            { linkItem: true, title: "General Settings", url: productRoute },
            { linkItem: true, title: "Product Management", url: productRoute },
            { linkItem: false, title: pageTitle },
        ]

        const loading = this.state.loading
        const httpError = this.state.httpError

        return(
            <React.Fragment>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle}
                    showButton={showButton}
                    />

                <div className="w-full form-group">
                    {
                        loading ? (
                            <div className="flex flex-col align-middle mt-6 h-16">
                                <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                            </div>
                        ) : (
                            httpError ? (
                                <div className="w-full form-group">
                                    <NoDataFound />
                                </div>
                            ) : (
                                <div className="w-9/12 form-group">
                                    <div className="w-full flex flex-row mb-4">
                                        <button type="submit" 
                                            className={`flex items-center px-4 py-1 bg-white border border-green-500 rounded shadow-0 text-sm text-green-600 hover:text-white hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 focus:bg-green-600 focus:text-white mr-2`} onClick={this.showProductPanel}>
                                            <span className="fal fa-highlighter mr-2"></span>

                                            <span className="text-sm">
                                                Edit Details
                                            </span>
                                        </button>
                                        
                                        <button type="submit" 
                                            className={`flex items-center px-4 py-1 bg-white border border-red-500 rounded shadow-0 text-sm text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:bg-red-600 focus:text-white mr-2`}>
                                            <span className="fal fa-trash-alt mr-2"></span>

                                            <span className="text-sm">
                                                Suspend
                                            </span>
                                        </button>
                                    </div>

                                    <hr className="mb-3" />

                                    <div className="flex flex-row align-middle">
                                        <div className="w-2/12">
                                            <p className="form-group text-sm text-gray-600">
                                                Details:
                                            </p>
                                        </div>

                                        <div className="w-10/12">
                                            <p className="form-group text-sm">
                                                {this.state.data.description}
                                            </p>

                                            <div className="w-full form-group">
                                                <p className="text-sm mb-1">
                                                    Tickets raised tagged with product id
                                                </p>
                                                
                                                <p className="text-2xl mb-1">
                                                    0
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    Product currently has no tickets raised under it's wings 
                                                </p>
                                            </div>

                                            <hr className="mb-3" />
                                        </div>
                                    </div>

                                    <div className="flex flex-row align-middle">
                                        <div className="w-2/12">
                                            <p className="form-group text-sm text-gray-600">
                                                Last Updated:
                                            </p>
                                        </div>

                                        <div className="w-9/12">
                                            <p className="text-sm">
                                                {this.state.data.updated_at}
                                            </p>
                                        </div>
                                    </div>

                                    <ProductPanel
                                        showPanel={this.state.showPanel} 
                                        closePanel={this.closeProductPanel} 
                                        data={this.state.data}
                                    />

                                </div>
                            )
                        )
                    }
                </div>

            </React.Fragment>
        )
    }

    async productDetailsApiCall() {
        try {
            const productId = this.state.productId
            const apiToBeConsumed = apiHeader + `portal/a/site-master/general/products/${productId}`
            const response: any = await HttpService.httpGet(apiToBeConsumed)
            console.log(response.data)

            if (response.data.success) {
                
                this.setState({
                    loading: false,
                    data: response.data.data,
                    pageTitle: response.data.data.name,
                })
            } else {
                this.setState({
                    data: null,
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

export default ProductDetails