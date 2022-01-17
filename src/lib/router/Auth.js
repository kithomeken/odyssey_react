import CookieServices from '../../services/CookieServices'
import ConstantsRegistry from '../../global/ConstantsRegistry'

const cookieNameForSanctumToken = ConstantsRegistry.cookieNameForSanctumToken()

class Auth {
    constructor() {
        const sanctumToken = CookieServices.get(cookieNameForSanctumToken)
        sanctumToken ? (this.authenticated = true) : (this.authenticated = false)
    }

    isAuthenticated() {
        return this.authenticated
    }

    signOut(cb) {
        CookieServices.remove(cookieNameForSanctumToken)
        this.authenticated = false
        cb()
    }
}

export default new Auth()