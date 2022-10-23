import { ACCOUNT_INFO_COOKIE, SANCTUM_COOKIE_NAME } from '../../global/CookieNames'
import Crypto from '../../encryption/Crypto'
import StorageServices from "../../services/StorageServices";
import {KEY_ACCOUNT_INFO} from "../../global/ConstantsRegistry";

class Auth {
    checkAuthentication(authenticationState) {
        let sessionState

        if (!authenticationState.isAuthenticated) {
            // Redux session state not authenticated
            sessionState = {
                'isAuthenticated': false,
                'suspendedAccount': false,
                'accountInfoExists': false,
                'resetAccountSession': false,
                'accountAccessExpired': false,
            }
        } else {
            /* 
             * Redux session state is authenticated 
             * Counter-check with available session cookies
            */
            const sanctumCookie = this.isCookieSet(SANCTUM_COOKIE_NAME)
            const encryptedAccountInfo = StorageServices.getLocalStorage(KEY_ACCOUNT_INFO)

            if (sanctumCookie === null) {
                // Change redux session state to not authenticated
                sessionState = {
                    'isAuthenticated': false,
                    'suspendedAccount': false,
                    'accountInfoExists': false,
                    'resetAccountSession': true,
                    'accountAccessExpired': false,
                }
            } else {
                if (encryptedAccountInfo === null) {
                    // Re-pull account information from postAuthentication
                    sessionState = {
                        'isAuthenticated': true,
                        'suspendedAccount': false,
                        'accountInfoExists': false,
                        'resetAccountSession': false,
                        'accountAccessExpired': false,
                    }
                } else {
                    // Compare account information from redux and cookie
                    const deAccountInfo = Crypto.decryptDataUsingAES256(encryptedAccountInfo)
                    const accountInfo = JSON.parse(deAccountInfo)

                    if (accountInfo.email === authenticationState.email) {
                        // Account info match. Redirect to home
                        sessionState = {
                            'isAuthenticated': true,
                            'suspendedAccount': false,
                            'accountInfoExists': true,
                            'resetAccountSession': false,
                            'accountAccessExpired': false,
                        }

                        const dateToday = new Date();
                        const accountExpiry = accountInfo.expires_at
                        const dateOfAccountExpiry = new Date(accountExpiry);

                        if (dateToday > dateOfAccountExpiry) {
                            // Check account access expiry
                            sessionState = {
                                'isAuthenticated': true,
                                'suspendedAccount': false,
                                'accountInfoExists': false,
                                'resetAccountSession': false,
                                'accountAccessExpired': true,
                            }
                        }

                        if (accountInfo.active !== 'Y') {
                            // Suspended user account
                            sessionState = {
                                'isAuthenticated': true,
                                'suspendedAccount': true,
                                'accountInfoExists': false,
                                'resetAccountSession': false,
                                'accountAccessExpired': false,
                            }
                        }
                    } else {
                        // Account info do not match. Redirect to postAuthentication
                        sessionState = {
                            'isAuthenticated': true,
                            'suspendedAccount': false,
                            'accountInfoExists': false,
                            'resetAccountSession': false,
                            'accountAccessExpired': false,
                        }
                    }
                }
            }
        }

        return sessionState
    }

    isCookieSet(cookieName) {
        const cookieArr = document.cookie.split(";");

        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");

            if (cookieName === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }

        return null;
    }
}

export default new Auth()