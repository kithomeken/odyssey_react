import React, {Component} from 'react'
import { Helmet } from 'react-helmet'

/* import ApiService from "../../../services/ApiServices"
import HttpService from "../../../services/HttpServices" */
import BreadCrumbs from '../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../components/layouts/parameters/Header'
import {securityRoutes} from '../../../routes/parameters/securityRoutes'

class PasswordPolicies extends Component {
    state = {
        loading: true,
        errorMode: false,
        errors: {

        }
    }

    render() {
        const authenticationRoutes = securityRoutes[0].path
        /* const loading = this.state.loading
        const errorMode = this.state.errorMode
        const {errors} = this.state; */

        const pageTitle = "Password Policies"
        const showButton = false
        const breadCrumb = [
            { linkItem: true, title: "Security Settings", url: authenticationRoutes },
            { linkItem: false, title: "Password Policies" },
        ]

        return(
            <React.Fragment>
                <Helmet>
                    <title>{pageTitle}</title>
                </Helmet>

                <BreadCrumbs breadCrumbDetails={breadCrumb} />

                <Header title={pageTitle} showButton={showButton} />


                <div className="w-full mb-2">
                    <div className="w-9/12">
                        <p className="text-sm form-group mb-0 text-gray-500">
                            When creating an Auth Team, you're free to set limited or lifetime access for your agents and restrict the resources at their disposal. Once created, you will be able to add agents into the Auth Teams.
                        </p>
                    </div>
                </div>



            </React.Fragment>
        )
    }
}

export default PasswordPolicies