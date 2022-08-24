/*
 * Master authenticated routes accessible 
 * By master account types, provided that they 
 * are authenticated.
*/

import { Navigate, Outlet, useLocation } from "react-router-dom";

import Auth from "./Auth";
import Navigation from "../../components/settings/Navigation";
import TopHeader from "../../components/settings/TopHeader";
import { useAppSelector } from "../../store/hooks";

export default function MasterAuthorizedRoutesController() {
    const location: any = useLocation()
    const currentLocation = location.pathname
    const authenticationState = useAppSelector(state => state.auth)
    
    if (!authenticationState.isAuthenticated) {
        return <Navigate to="/auth/sign-in" state={{ from: currentLocation }} replace />;
    }

    const marginLeft = {marginLeft: '288px'}
    const marginTop = {marginTop: '64px'}
    const postAuth = location.state?.from    

    return (
        <div>
            {
                postAuth ? (
                    <Outlet />
                ) : (
                    <div className="flex h-screen">
                        <Navigation
                            activeMenu={'activeMenu'}
                        />
        
                        <TopHeader />
        
                        <div className="flex flex-col w-full mb-5" style={marginLeft}>
        
                            <div className="w-full overflow-y-auto">
                                <div className="kiOAkj" style={marginTop}>
        
                                    <Outlet />
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
