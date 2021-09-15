import CookieService from '../../services/CookieService'
import ConstantsRegistry from '../../global/ConstantsRegistry'

const cookieNameForAccessToken = ConstantsRegistry.cookieNameForAccessToken()

class Auth {
    constructor() {
        const token = CookieService.get(cookieNameForAccessToken)
        token ? (this.authenticated = true) : (this.authenticated = false)
    }

    isAuthenticated() {
        return this.authenticated
    }

    signOut(cb) {
        CookieService.remove("")
        this.authenticated = false
        cb()
    }
}

export default new Auth()