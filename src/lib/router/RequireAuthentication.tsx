import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Auth from "./Auth";

export default function RequireAuthentication() {
    const location = useLocation()
    const currentLocation = location.pathname
    
    if (!Auth.isAuthenticated()) {
        return <Navigate to="/auth/sign-in" state={{ from: currentLocation }} replace />;
    }

    const marginLeft = {marginLeft: '288px'}
    const marginTop = {marginTop: '64px'}

    return (
        <div className="flex h-screen">
            {/* <ParamsNavigation 
                activeMenu={activeMenu}
            /> */}

            <div className="flex flex-col w-full mb-5" style={marginLeft}>
                {/* <ParamsUserBox /> */}

                <div className="w-full px-8 py-3 overflow-y-auto">
                    <div className="kiOAkj" style={marginTop}>

                        <Outlet />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
