import CookieService from '../../services/CookieService'

class Auth {
    constructor() {
        const token = CookieService.get("")
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