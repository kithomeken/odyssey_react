import React, {Component} from 'react'
import { Helmet } from 'react-helmet'

import BreadCrumbs from '../../../components/layouts/parameters/BreadCrumbs'
import Header from '../../../components/layouts/parameters/Header'
import {securityRoutes} from '../../../routes/parameters/securityRoutes'

class AuthTeams extends Component {
    state = {
        teams: null,
        metaData: null,
    }

    render() {
        const accessTeamRoute = securityRoutes[0].path
        const createAccessTeamRoute = securityRoutes[1].path

        const pageTitle = "Auth Teams"
        const breadCrumb = [
            { linkItem: true, title: "Security Settings", url: accessTeamRoute },
            { linkItem: false, title: "Auth Teams" },
        ]

        const showButton = true
        const buttonTitle = "Create Auth Team"
        const buttonIcon = true
        const iconType = ""
        const buttonColor = "green"
        const buttonHoverColor = "bg-green-700"
        const buttonLink = createAccessTeamRoute

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
                    <div className="w-9/12">
                        <p className="text-sm form-group text-gray-500">
                            Organize your support agents into specialized teams and make it easier to issue out access rights. Create a team and specify the actions that your agents can perform.
                            To start you off, we've automatically created a few teams with the default badge tag. Go ahead and create a new team for your agents.
                        </p>
                    </div>
                </div>

                <div className="w-full form-group">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-3 py-3 text-left text-sm text-black font-normal">
                                    Team Name
                                </th>
                                <th className="px-3 py-3 text-left text-sm text-black font-normal">
                                    Access Type
                                </th>
                                <th className="px-3 py-3 text-left text-sm text-black font-normal">
                                    Group
                                </th>
                                <th className="px-3 py-3 text-left text-sm text-black font-normal">
                                    
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

export default AuthTeams