import React, { Component } from "react"
import { Helmet } from "react-helmet"
import {Redirect} from "react-router-dom"
import ConstantsRegistry from "../global/ConstantsRegistry"

const projectApplicationName = ConstantsRegistry.projectApplicationName()

class FromIndexToHome extends Component {
    render() {
        const homeRoute = '/home'
        return (
            <React.Fragment>
                <Helmet>
                    {projectApplicationName}
                </Helmet>
                <Redirect to={homeRoute} />
            </React.Fragment>
        )
    }
}

export default FromIndexToHome