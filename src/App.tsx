import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams} from 'react-router-dom';

import './assets/css/tailwind.css'
import './assets/css/cuba.odyssey.css'
import "react-toastify/dist/ReactToastify.css";
import './assets/icons/fontawesome_pro/css/all.css'

import Home from './pages/home/Home';
import SignIn from './pages/auth/SignIn';
import Error404 from './pages/errors/Error404';
import ForgotPassword from './pages/auth/ForgotPassword';

import FromIndexToHome from './lib/redirects/FromIndexToHome';
import RequireAuthentication from './lib/router/RequireAuthentication';
import PostAuthentication from './pages/auth/PostAuthentication';
import { generalRoutes } from './routes/settings/generalRoutes';
import { securityRoutes } from './routes/settings/securityRoutes';


interface GuestRouteInterface {
    path: string;
    element: any;
    caseSensitive?: boolean;
}

const guestRoutes: Array<GuestRouteInterface> = [
    { path: "/auth/sign-in", element: <SignIn />, caseSensitive: true },
    { path: "/auth/forgot-password", element: <ForgotPassword />, caseSensitive: true },
]

const redirectedRoutes = [
    { path: "/", element: <FromIndexToHome />, activeMenu: 'Y' },
    { path: "/home", element: <Home />, activeMenu: 'Y' },
    { path: "/auth/post/access/ac/sntm/oen/seal/:uuid", element: <PostAuthentication />, activeMenu: 'Y' },
]

let protectedRoutes: Array<any> = []

protectedRoutes = redirectedRoutes.concat(
    generalRoutes,
    securityRoutes,
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
    
    
    const route = useContext(RoutingContext);

    return (
        <Router>
            <RouterProvider>
                <ToastContainer />

                <Routes>
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

