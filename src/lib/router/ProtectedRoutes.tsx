import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Auth from "./Auth";

interface Props {
    exact: boolean,
    path: string,
    component: any,
    activeMenu: string,
}

export const ProtectedRoutes: FC<Props> = ({component: Component, activeMenu, ...rest}) => {
    return(
        <Routes>
            <Route
                {...rest}

                // children={
                //     (props: any) => {
                //         if (Auth.isAuthenticated()) {
                //             const marginLeft = {marginLeft: '288px'}
                //             const marginTop = {marginTop: '64px'}

                //             return (
                //                 <div className="flex h-screen">
                //                     {/* <ParamsNavigation 
                //                         activeMenu={activeMenu}
                //                     /> */}

                //                     <div className="flex flex-col w-full mb-5" style={marginLeft}>
                //                         {/* <ParamsUserBox /> */}

                //                         <div className="w-full px-8 py-3 overflow-y-auto">
                //                             <div className="kiOAkj" style={marginTop}>

                //                                 <Component 
                //                                     {...props} 
                //                                 />
                                                
                //                             </div>
                //                         </div>
                //                     </div>
                //                 </div>
                //             )
                //         } else {
                //             return (
                //                 <Navigate 
                //                     replace
                //                     to={{
                //                         pathname: '/auth/sign-in',
                //                 }}/>
                //             )
                //         }
                //     }
                // }
            />
        </Routes>
    )
}