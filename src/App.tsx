import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';

import './assets/css/tailwind.css'
import './assets/css/cuba.odyssey.css'
import './assets/css/tailwind_colors.css'
import "react-toastify/dist/ReactToastify.css";
import './assets/icons/fontawesome_pro/css/all.css'

import Home from './pages/home/Home';
import Error404 from './pages/errors/Error404';

import FromIndexToHome from './lib/redirects/FromIndexToHome';
import RequireAuthentication from './lib/router/RequireAuthentication';

import { guestRoutes } from './routes/auth/guestRoutes';
import { generalRoutes } from './routes/settings/generalRoutes';
import { securityRoutes } from './routes/settings/securityRoutes';
import { featuresRoutes } from './routes/settings/featuresRoutes';
import CheckAuthentication from './lib/router/CheckAuthentication';
import PostAuthentication from './pages/auth/PostAuthentication';
import { accountRoutes } from './routes/settings/accountRoutes';

const redirectedRoutes = [
    { path: "/home", element: <Home />, activeMenu: 'Y' },
    { path: "/", element: <FromIndexToHome />, activeMenu: 'Y' },
    { path: "/ac/post/auth/access/sntm/oen/seal/:uuid", element: <PostAuthentication />, activeMenu: 'N'},
]

let protectedRoutes: Array<any> = []

protectedRoutes = redirectedRoutes.concat(
    generalRoutes,
    securityRoutes,
    featuresRoutes,
    accountRoutes,
);

interface RouteContextType {
    currentpage: string,
    from: string
}

const RoutingContext = React.createContext<RouteContextType>(null!)

function App() {
    const RouterProvider = ({children}: {children: React.ReactNode}) => {
        const currentLocation = useLocation()        
        const [route, setRoute] = useState({ 
            //--> it can be replaced with useRef or localStorage
            currentpage: currentLocation.pathname,
            from: ''
        });
        
        useEffect(()=> {
            setRoute((prev) => ({currentpage: currentLocation.pathname, from: prev.currentpage}) )
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
                    <Route element={<CheckAuthentication />}>
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
                    
                    <Route element={<RequireAuthentication />} >
                        {
                            protectedRoutes.map((route, index) => {
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
                </Routes>
            </RouterProvider>
        </Router>
    )
}

export default App;

