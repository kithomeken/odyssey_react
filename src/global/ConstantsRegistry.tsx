class ConstantsRegistry {
    projectApplicationName() {
        return 'Odyssey'
    }

    sanctumCookie() {
        return '._KO3rZlz0Zn'
    }
    
    accountNameCookie() {
        return '._z0QplQGhGm'
    }

    accountEmailCookie() {
        return '._08gNXSM5Nw'
    }

    uuidCookie() {
        return '.8mhx_uid'
    }
}

export default new ConstantsRegistry()

export const COOKIE_OPTIONS = {path: '/', secure: true, sameSite: 'none'}
export const HEADER_SECTION_BG = 'bg-green-50'