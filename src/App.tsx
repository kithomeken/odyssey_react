import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Sanctum } from 'react-sanctum'
import axios from 'axios'

// Styles
import './assets/css/tailwind.css'
import './assets/css/cuba.odyssey.css'
import './assets/icons/fontawesome_pro/css/all.css'

// Modules
import Reducer from './store/Reducers'
import { ProtectedRoutes } from './components/router/ProtectedRoutes'
import HttpServices from './services/HttpServices'

// Components
import ApiServices from './services/ApiServices'
import SignIn from './views/authentication/SignIn'
import FromIndexToHome from './Redirects/FromIndexToHome'
import Home from './views/Home'
import PasswordRecover from './views/authentication/PasswordRecovery'

// Routes
import {featuresRoutes} from './routes/parameters/featuresRoutes'
import {securityRoutes} from './routes/parameters/securityRoutes'
// import {userMaintenanceRoutes} from './routes/site-man/userMaintenanceRoutes'

interface GuestRouteInterface {
    path: string;
    component: any;
    exact?: boolean;
}

const guestRoutes: Array<GuestRouteInterface> = [
    { path: "/auth/sign-in", component: SignIn, exact: true },
    { path: "/auth/password-recovery", component: PasswordRecover, exact: true },
]

const temporaryRoutes = [
    { path: "/", component: FromIndexToHome, exact: true, activeMenu: 'Y' },
    { path: "/home", component: Home, exact: true, activeMenu: 'Y' },
]

const store = createStore(Reducer, applyMiddleware(thunk))
let protectedRoutes: Array<any> = []

protectedRoutes = temporaryRoutes.concat(
    securityRoutes,
    featuresRoutes,
);  

const headers = HttpServices.axiosInstanceHeaders()
const instance = axios.create({
    headers
});

const domain = ApiServices.FQDN()

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
                                    exact={route.exact}
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
                                        <ProtectedRoutes
                                            exact={route.exact}
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