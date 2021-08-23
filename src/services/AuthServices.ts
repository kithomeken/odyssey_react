import axios from 'axios'
import ApiService from './ApiService'
import CookieService from './CookieService'
import Crypto from '../encryption/Crypto'
import ConstantsRegistry from '../global/ConstantsRegistry'

interface Credentials {
    email: string
    password: string
}

const cookieNameForAccessToken = ConstantsRegistry.cookieNameForAccessToken()

class AuthService {
    async doUserSignIn(credentials: Credentials) {
        const xsrfToken = CookieService.get("XSRF-TOKEN")
        const contentHeaders = {
            "X-XSRF-TOKEN": xsrfToken,
            "Accept": "application/json",
        }

        try {
            const finalOptions = Object.assign(contentHeaders)
            const response = await axios.post(ApiService.signInApi(), credentials, finalOptions)
            return response.data
        } catch (error) {
            console.error("Error", error.response)
            return false
        }
    }

    handleSuccessfulSignIn(response: any) {
        try {
            const accessToken = response.data.token
            const options = {path: '/', secure: true, sameSite: 'none'}
    
            // Encrypt access token
            let encryptedAccessToken = Crypto.encryptUsingAES256(accessToken)
            CookieService.set(cookieNameForAccessToken, encryptedAccessToken, options)
            
            return true
        } catch (error) {
            return false
        }
    }
}

export default new AuthService()