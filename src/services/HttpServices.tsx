import axios from "axios"

import Crypto from "../encryption/Crypto"
import CookieServices from "./CookieServices"
import { API_DOMAIN_PREFIX } from "../api/ApiRegistry"
import { SANCTUM_COOKIE_NAME } from "../global/CookieNames"

const xsrfToken = CookieServices.get("XSRF-TOKEN")

class HttpServices {
    protected decryptSanctumTokenCookie() {
        const cipherText = CookieServices.get(SANCTUM_COOKIE_NAME)

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
            const GET_API_URL = API_DOMAIN_PREFIX + url
            return await axios.get(GET_API_URL, authorizationBearer)
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
            const POST_API_URL = API_DOMAIN_PREFIX + url
            return await axios.post(POST_API_URL, data, finalOptions);
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
            const POST_API_URL = API_DOMAIN_PREFIX + url
            return await axios.post(POST_API_URL, data, finalOptions);
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