import axios from 'axios'
import ConstantsRegistry from '../global/ConstantsRegistry'
import ApiServices from './ApiServices'
import CookieService from './CookieService'
import Crypto from '../encryption/Crypto'

interface Credentials {
    email: string,
    password: string
}

const cookieNameForAccessToken = ConstantsRegistry.cookieNameForAccessToken()

class AuthenticationServices {
    async authenticateAgentAccount(credentials: Credentials) {
        const xsrfToken = CookieService.get("XSRF-TOKEN")
        const contentHeaders = {
            "X-XSRF-TOKEN": xsrfToken,
            "Accept": "application/json",
        }

        try {
            const finalOptions = Object.assign(contentHeaders)
            const response = await axios.post(ApiServices.signInApi(), credentials, finalOptions)
            return response.data
        } catch (error: any) {
            console.error("Error", error.response)
            return false
        }
    }

    createAccessTokenCookie(response: any) {
        try {
            const accessToken = response.data.token
            const options = {path: '/', secure: true, sameSite: 'none'}
    
            // Encrypt access token
            let encryptedAccessToken = Crypto.encryptDataUsingAES256(accessToken)
            CookieService.set(cookieNameForAccessToken, encryptedAccessToken, options)
            
            return true
        } catch (error: any) {
            console.error("Error", error.response)
            return false
        }
    }
}

export default new AuthenticationServices()