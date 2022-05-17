import { Navigate, Outlet, } from "react-router-dom"
import Crypto from "../../encryption/Crypto";
import ConstantsRegistry from "../../global/ConstantsRegistry";
import CookieServices from "../../services/CookieServices";
import Auth from "./Auth"

export default function CheckAuthentication() {    
    if (Auth.isAuthenticated()) {
        return <Navigate to="/home" replace />;
    } else {
        // Check if token is set
        const cookieName = ConstantsRegistry.sanctumCookie()
        const sanctumToken = CookieServices.get(cookieName)
    
        if (sanctumToken) {
            // Check on other auth cookies
            const emailCookieName = ConstantsRegistry.accountEmailCookie()
            const emailCookieContents = CookieServices.get(emailCookieName)
    
            const userCookieName = ConstantsRegistry.accountEmailCookie()
            const userCookieContents = CookieServices.get(userCookieName)
    
            if (!emailCookieContents || !userCookieContents) {
                // Redirect to post authentication
                const uuidCookie = ConstantsRegistry.uuidCookie()
                const encryptedUuid = CookieServices.get(uuidCookie)
                const decryptedUuid = Crypto.decryptDataUsingAES256(encryptedUuid)            
                    
                const state = {
                    postAuth: true
                }
        
                return <Navigate 
                    state={state} 
                    replace 
                    to={`/ac/post/auth/access/sntm/oen/seal/${decryptedUuid}`} 
                />;
            }
        }
    }

    return (
        <Outlet />
    )
}