import axios from "axios"
import Crypto from "../encryption/Crypto"

import ConstantsRegistry from "../global/ConstantsRegistry"
import CookieService from "./CookieService"

class HttpServices {
    protected decryptAccessTokenCookie() {
        const cookieNameForAccessToken = ConstantsRegistry.cookieNameForAccessToken()
        const cipherText = CookieService.get(cookieNameForAccessToken)
        let accessToken = null

        if (cipherText != null) {
            accessToken = Crypto.decryptDataUsingAES256(cipherText)
        }

        return accessToken
    }

    async httpGet(url: string) {
        const accessToken = this.decryptAccessTokenCookie()
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + accessToken,
            }
        }

        try {
            return await axios.get(url, authorizationBearer)
        } catch (error) {
            console.log("Could not fetch data", error)
        }
    }

    async httpPost(url:string, data: any, options: any = null) {
        const accessToken = this.decryptAccessTokenCookie()
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + accessToken,
            }
        }

        try {
            const finalOptions = Object.assign(authorizationBearer, options)
            return await axios.post(url, data, finalOptions);
        } catch (error: any) {
            console.error("Could not post data", error);
            return (error.response !== undefined) ? error.response : error;
        }
    }

    async httpPostWithoutData(url:string, data: any = null, options: any = null) {
        const accessToken = this.decryptAccessTokenCookie()
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + accessToken,
            }
        }

        try {
            const finalOptions = Object.assign(authorizationBearer, options)
            return await axios.post(url, data, finalOptions);
        } catch (error: any) {
            console.error("Could not post data", error);
            return (error.response !== undefined) ? error.response : error;
        }
    }

    axiosInstanceHeaders() {
        const accessToken = this.decryptAccessTokenCookie()
        const authorizationBearer = {
            Authorization: "Bearer " + accessToken,
        }

        return authorizationBearer
    }
}

export default new HttpServices()