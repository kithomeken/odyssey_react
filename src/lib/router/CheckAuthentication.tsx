import Auth from "./Auth"
import Crypto from "../../encryption/Crypto";
import { Navigate, Outlet, } from "react-router-dom"
import CookieServices from "../../services/CookieServices";
import { ACCOUNT_EMAIL_COOKIE, ACCOUNT_NAME_COOKIE, SANCTUM_COOKIE_NAME, UUID_COOKIE_NAME } from "../../global/CookieNames";

export default function CheckAuthentication() {    
    if (Auth.isAuthenticated()) {
        return <Navigate to="/home" replace />;
    } else {
        // Check if token is set
        const sanctumToken = CookieServices.get(SANCTUM_COOKIE_NAME)
    
        if (sanctumToken) {
            // Check on other auth cookies
            const emailCookieContents = CookieServices.get(ACCOUNT_EMAIL_COOKIE)
            const userCookieContents = CookieServices.get(ACCOUNT_NAME_COOKIE)
    
            if (!emailCookieContents || !userCookieContents) {
                // Redirect to post authentication
                const encryptedUuid = CookieServices.get(UUID_COOKIE_NAME)
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