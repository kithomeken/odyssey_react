import axios from "axios"

import Crypto from "../encryption/Crypto"
import CookieServices from "./CookieServices"
import {API_DOMAIN_PREFIX} from "../api/ApiRegistry"
import {SANCTUM_COOKIE_NAME} from "../global/CookieNames"

const xsrfToken = CookieServices.get("XSRF-TOKEN")

class HttpServices {
    protected decryptSanctumTokenCookie() {
        const cipherText = CookieServices.get(SANCTUM_COOKIE_NAME)

        return (cipherText != null) 
            ? Crypto.decryptDataUsingAES256(cipherText) 
            : null
    }

    async httpGet(url: string) {
        try {
            const GET_API_URL = API_DOMAIN_PREFIX + url
            return await axios.get(GET_API_URL, this.axiosInstanceHeaders())
        } catch (error) {
            console.log("Could not fetch data", error)
            return error
        }
    }

    async httpPost(url:string, data: any, options: any = null) {
        try {
            const finalOptions = Object.assign(this.axiosInstanceHeaders(), options)
            const POST_API_URL = API_DOMAIN_PREFIX + url
            return await axios.post(POST_API_URL, data, finalOptions);
        } catch (error: any) {
            console.error("Could not post data", error);
            return (error.response !== undefined) ? error.response : error;
        }
    }

    async httpPostWithoutData(url:string, data: any = null, options: any = null) {
        try {
            const finalOptions = Object.assign(this.axiosInstanceHeaders(), options)
            const POST_API_URL = API_DOMAIN_PREFIX + url
            return await axios.post(POST_API_URL, data, finalOptions);
        } catch (error: any) {
            console.error("Could not post data", error);
            return (error.response !== undefined) ? error.response : error;
        }
    }

    axiosInstanceHeaders() {
        return {
            headers: {
                Authorization: "Bearer " + this.decryptSanctumTokenCookie(),
                "X-XSRF-TOKEN": xsrfToken,
            }
        }
    }
}

export default new HttpServices()