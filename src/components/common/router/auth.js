import AuthService from '../../../services/AuthServices'
import CookieService from '../../../services/CookieService'
import ConstantsRegistry from '../../../global/ConstantsRegistry'

const cookieNameForAccessToken = ConstantsRegistry.cookieNameForAccessToken()

class Auth {
    constructor() {
        const token = CookieService.get(cookieNameForAccessToken)
        token ? (this.authenticated = true) : (this.authenticated = false)
    }

    async signIn(credentials, cb) {
        const user = await AuthService.doUserSignIn(credentials)

        if (!user) {
            cb (false)
            return false
        }

        localStorage.setItem(cookieNameForAccessToken, user.access_token)
        this.authenticated = true
        cb(true)
    }

    signOut(cb) {
        CookieService.remove(cookieNameForAccessToken)
        this.authenticated = false
        cb()
    }

    isAuthenticated() {
        return this.authenticated
    }

    getAccessToken() {
        return CookieService.get(cookieNameForAccessToken)
    }
}

export default new Auth()