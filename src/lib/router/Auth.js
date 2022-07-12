import CookieServices from '../../services/CookieServices'
import { ACCOUNT_EMAIL_COOKIE, ACCOUNT_NAME_COOKIE, SANCTUM_COOKIE_NAME, UUID_COOKIE_NAME } from '../../global/CookieNames'

class Auth {
    constructor() {
        const sanctumToken = CookieServices.get(SANCTUM_COOKIE_NAME)
        sanctumToken ? (this.authenticated = true) : (this.authenticated = false)
    }

    isAuthenticated() {
        const sanctumToken = CookieServices.get(SANCTUM_COOKIE_NAME)
        sanctumToken ? (this.authenticated = true) : (this.authenticated = false)
        return this.authenticated
    }

    signOut(cb) {
        CookieServices.remove(SANCTUM_COOKIE_NAME)
        CookieServices.remove(UUID_COOKIE_NAME)

        this.authenticated = false
        cb()
    }

    freshStart() {
        // Removes all cookies set
        CookieServices.remove(SANCTUM_COOKIE_NAME)
        CookieServices.remove(UUID_COOKIE_NAME)
        CookieServices.remove(ACCOUNT_EMAIL_COOKIE)
        CookieServices.remove(ACCOUNT_NAME_COOKIE)
    }
}

export default new Auth()