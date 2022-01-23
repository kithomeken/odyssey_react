import axios from "axios"

import Crypto from "../encryption/Crypto"
import CookieServices from "./CookieServices"
import ConstantsRegistry from "../global/ConstantsRegistry"

const xsrfToken = CookieServices.get("XSRF-TOKEN")

class HttpServices {
    protected decryptSanctumTokenCookie() {
        const cookieNameForSanctumToken = ConstantsRegistry.cookieNameForSanctumToken()
        const cipherText = CookieServices.get(cookieNameForSanctumToken)

        return (cipherText != null) 
            ? Crypto.decryptDataUsingAES256(cipherText) 
            : null
    }

    async httpGet(url: string) {
        const accessToken = this.decryptSanctumTokenCookie()
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + accessToken,
                "X-XSRF-TOKEN": xsrfToken,
            }
        }

        try {
            return await axios.get(url, authorizationBearer)
        } catch (error) {
            console.log("Could not fetch data", error)
            return error
        }
    }

    async httpPost(url:string, data: any, options: any = null) {
        const accessToken = this.decryptSanctumTokenCookie()
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + accessToken,
                "X-XSRF-TOKEN": xsrfToken,
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
        const accessToken = this.decryptSanctumTokenCookie()
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + accessToken,
                "X-XSRF-TOKEN": xsrfToken,
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
        const accessToken = this.decryptSanctumTokenCookie()
        const authorizationBearer = {
            Authorization: "Bearer " + accessToken,
        }

        return authorizationBearer
    }
}

export default new HttpServices()