function ApiRegistry () {
    let FQDN = null
    let apiDomain = null
    let mediaDomain = null

    if (process.env.NODE_ENV === 'production') {
        FQDN = "https://project-0.kennedykitho.me"
        apiDomain = 'https://api.odyssey.kennedykitho.me/api'
        mediaDomain = 'https://media.kennedykitho.me'
    } else {
        FQDN = 'http://localhost:81/project-0/public'
        apiDomain = 'http://localhost:81/project-0/public/api'
        mediaDomain = 'http://localhost:81/project-0/public/media'
    }

    return {
        'FQDN_DOMAIN': FQDN,
        'API_DOMAIN': apiDomain,
        'MEDIA_API_DOMAIN': mediaDomain,
    }
}

// Declared API Registry exports
export const FULLY_QUALIFIED_DOMAIN_NAME = ApiRegistry().FQDN_DOMAIN
export const API_DOMAIN_PREFIX = ApiRegistry().API_DOMAIN
export const API_MEDIA_DOMAIN_PREFIX = ApiRegistry().MEDIA_API_DOMAIN

/*New API Exports*/
export const API_DOMAIN = ApiRegistry().API_DOMAIN




/* 
* Authentication Routes 
*/

export const AUTHENTICATED_ACCOUNT_SIGN_OUT = API_DOMAIN_PREFIX + 'auth/u/account/sign-out'
export const AUTHENTICATED_ACCOUNT_INFO = API_DOMAIN_PREFIX + 'auth/u/account/info'

export const SIGN_IN_API_SUFFIX = API_DOMAIN_PREFIX + 'auth/account/agent/authenticate'


/* 
 * Account Routes
*/
export const AUTHENTICATED_ACCOUNT_EMAIL_HIST = 'u/auth/account/email/history'
export const CHANGE_ACCOUNT_EMAIL_ADDR = 'u/auth/account/email/change'
export const UNDO_CHANGE_ACCOUNT_EMAIL_ADDR = 'u/auth/account/email/undo-change'
export const RESEND_CHANGE_EMAIL_VERIFICATION = 'u/auth/account/email/verification/resend'
export const CHANGE_ACCOUNT_PASSWORD = 'u/auth/account/password/change'
export const ACCOUNT_PREFERENCES_ = 'u/auth/account/preferences'
export const SET_ACCOUNT_TIMEZONE_ = 'u/auth/account/preferences/timezone/set'
export const ACCOUNT_AUTH_TEAM_RIGHTS = 'u/auth/account/auth-team/rights'