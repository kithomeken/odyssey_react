let apiDomain: string, domain = ''

if (process.env.NODE_ENV === 'production') {
    domain = "https://api.odyssey.kennedykitho.me"
    apiDomain = 'https://api.odyssey.kennedykitho.me/api/v1/'
} else {
    domain = 'http://localhost/project-0/public'
    apiDomain = 'http://localhost/project-0/public/api/'
}

class ApiService {
    static signInApi() {
        return apiDomain + 'auth/account/agent/authenticate'
    }

    static userProfileApi() {
        return apiDomain + 'auth/account/agent/details'
    }

    apiHeader() {
        return apiDomain
    }

    domainOnly() {
        return domain
    }
}

export default ApiService