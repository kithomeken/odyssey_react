import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Sanctum } from 'react-sanctum'
import axios from 'axios'



const sanctumConfig = {
    apiUrl: "https://project-0.kennedykitho.me",
    csrfCookieRoute: "sanctum/csrf-cookie",
    signInRoute: "api/auth/account/agent/authenticate",
    signOutRoute: "api/auth/account/agent/w-token/invalidate",
    userObjectRoute: "api/user",
    // axiosInstance: instance,
};

export default class App extends Component {
    render() {
        return (
            <Sanctum config={sanctumConfig}>
                <BrowserRouter>
                    <Switch>
                        <p>Hello, welcome to project Odessa</p>
                    </Switch>
                </BrowserRouter>
            </Sanctum>
        )
    }
}