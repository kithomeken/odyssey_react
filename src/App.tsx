import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Sanctum } from 'react-sanctum'
import axios from 'axios'

// Modules
import Reducer from './store/Reducers'
import { ProtectedRoutes } from './components/router/ProtectedRoutes'
import HttpServices from './services/HttpServices'

// Components
import SignIn from './views/authentication/SignIn'
import FromIndexToHome from './Redirects/FromIndexToHome'
import Home from './views/Home'

interface GuestRouteInterface {
    path: string;
    component: any;
    exact?: boolean;
}

const guestRoutes: Array<GuestRouteInterface> = [
    { path: "/auth/sign-in", component: SignIn, exact: true },
]

const temporaryRoutes = [
    { path: "/", component: FromIndexToHome, exact: true, activeMenu: 'Y' },
    { path: "/home", component: Home, exact: true, activeMenu: 'Y' },
]

const store = createStore(Reducer, applyMiddleware(thunk))
let protectedRoutes: Array<any> = []

protectedRoutes = temporaryRoutes.concat(
);  

const headers = HttpServices.axiosInstanceHeaders()
const instance = axios.create({
    headers
});

const sanctumConfig = {
    apiUrl: "https://project-0.kennedykitho.me",
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