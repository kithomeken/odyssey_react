import ApiService from "./ApiService"
import HttpService from "./HttpService"

class UserStateService {
    user = null

    async getCurrentUserProfile() {
        const url = ApiService.userProfileApi()

        try {
            const response = await HttpService.getData(url)
            this.user = response.data
            return response.data
        } catch (error) {
            console.error("Not able to fetch the user");
        }
    }
}

export default new UserStateService()