import { Navigate } from "react-router"

import CookieServices from "../../services/CookieServices"
import { ACCOUNT_EMAIL_COOKIE, ACCOUNT_NAME_COOKIE, SANCTUM_COOKIE_NAME } from "../../global/CookieNames"

const failedAuthenticationReducer = (action: any) => {
    switch (action.type) {
        case 'REVOKE_AUTH_ACCESS_':
            // Revoke authentication access
            CookieServices.remove(ACCOUNT_NAME_COOKIE)
            CookieServices.remove(ACCOUNT_EMAIL_COOKIE)
            CookieServices.remove(SANCTUM_COOKIE_NAME)

            return <Navigate replace to="/auth/sign-in" />
    }
}

export default failedAuthenticationReducer