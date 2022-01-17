import React, { Component } from "react"
import { Helmet } from "react-helmet"
import {Navigate} from "react-router-dom"

class FromIndexToHome extends Component {
    render() {
        const homeRoute = '/home'
        return (
            <React.Fragment>
                <Helmet>
                    redirecting...
                </Helmet>
                
                <Navigate replace to={homeRoute} />
            </React.Fragment>
        )
    }
}

export default FromIndexToHome