let apiDomain = ""
let domain = ""

if (process.env.NODE_ENV === 'production') {
    domain = "https://project-0.kennedykitho.me"
    apiDomain = 'https://project-0.kennedykitho.me/api/v1/'
} else {
    domain = 'http://localhost/project-0/public'
    apiDomain = 'http://localhost/project-0/public/api/'
}

class ApiServices {
    static apiDomain() {
        return apiDomain
    }

    static FQDN() {
        return domain
    }

    static signInApi() {
        return apiDomain + 'auth/account/agent/authenticate'
    }
}

export default ApiServices