let apiDomain = ""
let domain = ""
let imagesDomain = ""

if (process.env.NODE_ENV === 'production') {
    domain = "https://project-0.kennedykitho.me"
    apiDomain = 'https://project-0.kennedykitho.me/api/'

    imagesDomain = 'https://images.kennedykitho.me/'
} else {
    domain = 'http://localhost/project-0/public'
    apiDomain = 'http://localhost/project-0/public/api/'

    // domain = "https://project-0.kennedykitho.me"
    // apiDomain = 'https://project-0.kennedykitho.me/api/'
}

// TODO: Convert the API Services methods into export constants
export const IMAGES_DOMAIN = imagesDomain

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