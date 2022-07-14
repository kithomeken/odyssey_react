function ApiRegistry () {
    let FQDNdomain = null
    let apiDomain = null
    let mediaDomain = null

    if (process.env.NODE_ENV === 'production') {
        FQDNdomain = "https://project-0.kennedykitho.me"
        apiDomain = 'https://api.odyssey.kennedykitho.me/api/'
        mediaDomain = 'https://api.media.kennedykitho.me'
    } else {
        FQDNdomain = 'http://localhost/project-0/public'
        apiDomain = 'http://localhost/project-0/public/api/'
        mediaDomain = 'http://localhost/project-0/public/media'
    }

    return {
        'FQDN_DOMAIN': FQDNdomain,
        'API_DOMIAN': apiDomain,
        'MEDIA_API_DOMAIN': mediaDomain,
    }
}

// Declared API Registry exports
export const FULLY_QUALIFIED_DOMAIN_NAME = ApiRegistry().FQDN_DOMAIN
export const API_DOMAIN_PREFIX = ApiRegistry().API_DOMIAN
export const API_MEDIA_DOMAIN_PREFIX = ApiRegistry().MEDIA_API_DOMAIN
export const SIGN_IN_API_SUFFIX = API_DOMAIN_PREFIX + 'auth/account/agent/authenticate'