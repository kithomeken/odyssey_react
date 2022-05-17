import CookieServices from '../../services/CookieServices'
import ConstantsRegistry from '../../global/ConstantsRegistry'

const sanctumCookie = ConstantsRegistry.sanctumCookie()
const uuidCookie = ConstantsRegistry.uuidCookie()

class Auth {
    constructor() {
        const sanctumToken = CookieServices.get(sanctumCookie)
        sanctumToken ? (this.authenticated = true) : (this.authenticated = false)
    }

    isAuthenticated() {
        const sanctumToken = CookieServices.get(sanctumCookie)
        sanctumToken ? (this.authenticated = true) : (this.authenticated = false)
        return this.authenticated
    }

    signOut(cb) {
        CookieServices.remove(sanctumCookie)
        CookieServices.remove(uuidCookie)

        this.authenticated = false
        cb()
    }

    freshStart() {
        // Removes all cookies set
        const sanctumToken = ConstantsRegistry.sanctumCookie()
        CookieServices.remove(sanctumToken)
        
        const uuidCookie = ConstantsRegistry.uuidCookie()
        CookieServices.remove(uuidCookie)
        
        const acEmailCookie = ConstantsRegistry.accountEmailCookie()
        CookieServices.remove(acEmailCookie)
        
        const acNameCookie = ConstantsRegistry.accountNameCookie()
        CookieServices.remove(acNameCookie)
    }
}

export default new Auth()