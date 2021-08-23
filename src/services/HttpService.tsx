import axios from "axios"
import CookieService from "./CookieService"
import Crypto from "../encryption/Crypto"
import ConstantsRegistry from "../global/ConstantsRegistry"

class HttpService {
    protected decryptCkAcTx() {
        const cookieNameForAccessToken = ConstantsRegistry.cookieNameForAccessToken()
        const enActx = CookieService.get(cookieNameForAccessToken)
        const acTx = (enActx === null) ? null : Crypto.decryptUsingAES256(enActx)

        return acTx
    }

    async getData(url) {
        const acTx = this.decryptCkAcTx()
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + acTx,
            }
        }

        try {
            return await axios.get(url, authorizationBearer);
        } catch (error) {
            console.error("Not able to fetch data", error);
        }
    }

    async postData(url, data, options = null) {
        const acTx = this.decryptCkAcTx()
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + acTx,
            }
        }

        try {
            const finalOptions = Object.assign(authorizationBearer, options)
            return await axios.post(url, data, finalOptions);
        } catch (error) {
            console.error("Not able to fetch data", error);
            return error.response !== undefined ? error.response : error;
        }
    }

    async postWithNoData(url, data = null, options = null) {
        const acTx = this.decryptCkAcTx()
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + acTx,
            }
        }

        try {
            const finalOptions = Object.assign(authorizationBearer, options)
            return await axios.post(url, data, finalOptions);
        } catch (error) {
            console.error("Not able to fetch data", error);
            return error.response !== undefined ? error.response : error;
        }
    }

    axiosInstanceHeaders() {
        const acTx = this.decryptCkAcTx()
        const authorizationBearer = {
            Authorization: "Bearer " + acTx,
        }

        return authorizationBearer
    }
}

export default new HttpService()