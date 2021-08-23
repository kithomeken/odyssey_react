import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Sanctum } from 'react-sanctum'
import axios from 'axios'

import Reducer from './store/Reducer'

interface GuestRouteInterface {
    path: string;
    component: any;
    exact?: boolean;
}

const store = createStore(Reducer, applyMiddleware(thunk))
let protectedRoutes: Array<any> = []

const guestRoutes: Array<GuestRouteInterface> = [
    { path: "/auth/sign-in", component: SignIn, exact: true },
    { path: "/auth/password-recovery", component: ForgotPassword, exact: true },
];

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
                        {guestRoutes.map((route, key) => {
                            return (
                                <Route
                                    // exact={route.exact}
                                    path={route.path}
                                    component={route.component}
                                    key={key}
                                />
                            )
                        })}
                    </Switch>
                </BrowserRouter>
            </Sanctum>
        )
    }
}