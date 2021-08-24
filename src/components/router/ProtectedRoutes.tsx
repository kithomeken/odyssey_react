import React, {FC} from "react"
import {Route, Redirect} from 'react-router-dom'
import Auth from './Auth'

interface Props {
    exact: boolean,
    path: string,
    component: any,
    activeMenu: string
}

export const ProtectedRoutes: FC<Props> = ({component: Component, activeMenu, ...rest}) => {
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    if (Auth.isAuthenticated()) {
                        return (
                            <React.Fragment>
                                <p>Authenticated</p>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <Redirect to={{
                                pathname: '/auth/sign-in',
                                state: {
                                    from: props.location
                                }
                            }}/>
                        )
                    }
                }
            }
        />
    )
}