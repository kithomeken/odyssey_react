import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './auth'
import SideBar from '../../layouts/portal/SideBar'
import TopBar from '../../layouts/portal/TopBar'

export const ProtectedRoute = ({component: Component, activeMenu, ...rest}) => {
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    if (auth.isAuthenticated()) {
                        const marginLeft = {
                            marginLeft: '288px'
                        }

                        return (
                            <React.Fragment>
                                <div className="flex h-screen">
                                    <SideBar 
                                        activeMenu={activeMenu}
                                    />

                                    <div className="flex flex-col w-full mb-5" style={marginLeft}>
                                        <TopBar />

                                        <div className="w-full px-8 py-3 overflow-y-auto">
                                            <div className="kiOAkj">

                                                <Component {...props} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/auth/sign-in',
                                    state: {
                                        from: props.location
                                    }
                                }}
                            />
                        )
                    }
                }
            }
        />
    )
}
