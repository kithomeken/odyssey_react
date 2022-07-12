function ApiRegistry () {
    let FQDNdomain = null
    let apiDomain = null
    let imagesDomain = null

    if (process.env.NODE_ENV === 'production') {
        FQDNdomain = "https://project-0.kennedykitho.me"
        apiDomain = 'https://project-0.kennedykitho.me/api/'
        imagesDomain = 'https://images.kennedykitho.me/'
    } else {
        FQDNdomain = 'http://localhost/project-0/public'
        apiDomain = 'http://localhost/project-0/public/api/'
        imagesDomain = 'http://localhost/project-0/public/uploads'
    }

    return {
        'FQDN_DOMAIN': FQDNdomain,
        'API_DOMIAN': apiDomain,
        'IMAGES_DOMAIN': imagesDomain,
    }
}

// Declared API Registry exports
export const FULLY_QUALIFIED_DOMAIN_NAME = ApiRegistry().FQDN_DOMAIN
export const API_DOMAIN_PREFIX = ApiRegistry().API_DOMIAN
export const IMG_API_DOMAIN_PREFIX = ApiRegistry().IMAGES_DOMAIN
export const SIGN_IN_API_SUFFIX = API_DOMAIN_PREFIX + 'auth/account/agent/authenticate'