import React, {Component} from 'react'
import Helmet from 'react-helmet'

// Components
import BreadCrumbs from '../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../components/layouts/parameters/Header'
import ApiService from "../../../services/ApiServices"
import HttpService from "../../../services/HttpServices"
import {generalRoutes} from '../../../routes/parameters/generalRoutes'

const apiHeader = ApiService.apiDomain()

class Products extends Component {
    state = {

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
                        <p className="text-sm form-group text-gray-500">
                            Configure the various products your team(s) support within your business workflow to Odysseys workstreams and track the issues/tickets raised on each product.
                        </p>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Products