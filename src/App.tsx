import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Sanctum } from 'react-sanctum'
import axios from 'axios'

import Reducer from './store/Reducer'
import {ProtectedRoute} from './components/common/router/ProtectedRoute'
import ApiService from './services/ApiService'
import HttpService from './services/HttpService'

// Routes
import {userMaintenanceRoutes} from './routes/site-man/userMaintenanceRoutes'
import {securityRoutes} from './routes/site-man/securityRoutes'
import {featuresRoutes} from './routes/site-man/featuresRoutes'

import SignIn from './views/auth/SignIn'
import ForgotPassword from './views/auth/ForgotPassword'

interface GuestRouteInterface {
    path: string;
    component: any;
    exact?: boolean;
}

const store = createStore(Reducer, applyMiddleware(thunk))
let protectedRoutes: Array<any> = []

protectedRoutes = userMaintenanceRoutes.concat(
    securityRoutes,
    featuresRoutes
);

const guestRoutes: Array<GuestRouteInterface> = [
    { path: "/auth/sign-in", component: SignIn, exact: true },
    { path: "/auth/password-recovery", component: ForgotPassword, exact: true },
];

const headers = HttpService.axiosInstanceHeaders()
const instance = axios.create({
    headers
});

const apiService = new ApiService()
const domain = apiService.domainOnly()
const sanctumConfig = {
    apiUrl: domain,
    csrfCookieRoute: "sanctum/csrf-cookie",
    signInRoute: "api/auth/account/agent/authenticate",
    signOutRoute: "api/auth/account/agent/w-token/invalidate",
    userObjectRoute: "api/user",
    axiosInstance: instance,
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

                        <Provider store={store}>
                            {
                                protectedRoutes.map((route, key) => {
                                    return (
                                        <ProtectedRoute
                                            // exact={route.exact}
                                            path={route.path}
                                            component={route.component}
                                            activeMenu={route.activeMenu}
                                            key={key}
                                        />
                                    )
                                })
                            }
                        </Provider>
                    </Switch>
                </BrowserRouter>
            </Sanctum>
        )
    }
}