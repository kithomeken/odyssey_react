import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './assets/css/tailwind.css'
import './assets/css/cuba.odyssey.css'
import "react-toastify/dist/ReactToastify.css";
import './assets/icons/fontawesome_pro/css/all.css'

import Error404 from './pages/errors/Error404';

import { guestRoutes } from './routes/auth/guestRoutes';
import { accountRoutes } from './routes/settings/accountRoutes';
import { generalRoutes } from './routes/settings/generalRoutes';
import { securityRoutes } from './routes/settings/securityRoutes';
import { featuresRoutes } from './routes/settings/featuresRoutes';
import { postAuthRoute, protectedRoutes } from './routes/auth/protectedRoutes';

import AuthRouteController from './lib/router/AuthRouteController';
import PostAuthRouteController from './lib/router/PostAuthRouteController';
import StandardRoutesController from './lib/router/StandardRoutesController';
import MasterAuthorizedRoutesController from './lib/router/MasterAuthorizedRoutesController';
import SpecialAuthorizationRoutesControllers from './lib/router/SpecialAuthorizationRoutesController';
import { exceptionalRoutes } from './routes/exceptionalRoutes';
import { standardErrorRoutes } from './routes/errorRoutes';
import ErrorRoutesController from './lib/router/ErrorRouteController';

let errorRoutes: Array<any> = []
let standardRoutes: Array<any> = []
let configurationRoutes: Array<any> = []
let postAuthenticationRoutes: Array<any> = []
let masterConfigurationRoutes: Array<any> = []

standardRoutes = standardRoutes.concat(
    protectedRoutes,
);

postAuthenticationRoutes = postAuthenticationRoutes.concat(
    postAuthRoute,
)

masterConfigurationRoutes = masterConfigurationRoutes.concat(
    securityRoutes,
    featuresRoutes,
)

configurationRoutes = configurationRoutes.concat(
    accountRoutes,
    generalRoutes,
)

errorRoutes = errorRoutes.concat(
    standardErrorRoutes,
)

export const allConfigurationRoutes = configurationRoutes

interface RouteContextType {
    currentpage: string,
    from: string
}

const RoutingContext = React.createContext<RouteContextType>(null!)

function App() {
    const RouterProvider = ({ children }: { children: React.ReactNode }) => {
        const currentLocation = useLocation()
        const [route, setRoute] = useState({
            currentpage: currentLocation.pathname,
            from: ''
        });

        useEffect(() => {
            setRoute((prev) => ({ currentpage: currentLocation.pathname, from: prev.currentpage }))
        }, [currentLocation]);

        return <RoutingContext.Provider value={route}>
            {children}
        </RoutingContext.Provider>
    }

    return (
        <Router>
            <RouterProvider>

                <ToastContainer />

                <Routes>
                    <Route element={<AuthRouteController />}>
                        {guestRoutes.map((route, index) => {
                            return (
                                <Route
                                    path={route.path}
                                    element={route.element}
                                    key={index}
                                />
                            )
                        })
                        }
                    </Route>

                    <Route element={<PostAuthRouteController />} >
                        {
                            postAuthenticationRoutes.map((route, index) => {
                                return (
                                    <Route
                                        path={route.path}
                                        element={route.element}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </Route>

                    <Route element={<StandardRoutesController />} >
                        {
                            standardRoutes.map((route, index) => {
                                return (
                                    <Route
                                        path={route.path}
                                        element={route.element}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </Route>

                    <Route element={<SpecialAuthorizationRoutesControllers />} >
                        {
                            configurationRoutes.map((route, index) => {
                                return (
                                    <Route
                                        path={route.path}
                                        element={route.element}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </Route>

                    <Route element={<MasterAuthorizedRoutesController />} >
                        {
                            masterConfigurationRoutes.map((route, index) => {
                                return (
                                    <Route
                                        path={route.path}
                                        element={route.element}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </Route>

                    <Route path="*" element={<Error404 />} />

                    <Route element={<ErrorRoutesController />} >
                        /* 
                         * Redirection routes for error messages
                         * 
                        */
                        {
                            errorRoutes.map((route, index) => {
                                return (
                                    <Route
                                        path={route.path}
                                        element={route.element}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </Route>

                    {
                        /* 
                         * Routes that do not rely on authentication. 
                         * Can be accessed by both authenticated and
                         * unauthenticated users 
                         * 
                         * Different from authentication
                         * Redirection for error messages
                        */
                        exceptionalRoutes.map((route, index) => {
                            return (
                                <Route
                                    path={route.path}
                                    element={route.element}
                                    key={index}
                                />
                            )
                        })
                    }

                </Routes>
            </RouterProvider>
        </Router>
    )
}

export default App;

