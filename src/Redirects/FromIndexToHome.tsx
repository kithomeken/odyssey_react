import React, { Component } from "react"
import {Redirect} from "react-router-dom"

class FromIndexToHome extends Component {
    render() {
        const homeRoute = '/home'
        return (
            <Redirect to={homeRoute} />
        )
    }
}

export default FromIndexToHome