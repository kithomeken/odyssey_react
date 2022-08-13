// Agent Accounts
export const AGENT_INVITATION_API_ROUTE = 'portal/a/site-master/accounts/users/agents/invitations'
export const AGENT_LIST_API_ROUTE = 'portal/a/site-master/accounts/users/agents/all'
export const AGENT_DETAILS_API_ROUTE = 'portal/a/site-master/accounts/users/agents'
export const AGENT_CHANGE_EMAIL_CHECK_API_ROUTE = 'portal/a/site-master/accounts/users/agents/invitations/change-email/check'
export const AGENT_CHANGE_EMAIL_INV_API_ROUTE = 'portal/a/site-master/accounts/users/agents/invitations/change-email'
export const AGENT_RESEND_EMAIL_INV_API_ROUTE = 'portal/a/site-master/accounts/users/agents/invitations/resend'

// Master Accounts
export const MASTER_ACCOUNTS_LIST_API_ROUTE = 'portal/a/site-master/accounts/users/master/all'

// Organizational Details
export const ORGANIZATION_FETCH_DETAILS_API_ROUTE = 'portal/a/site-master/general/organizational-details'
export const ORGANIZATION_LOGO_APPEND_API_ROUTE = 'portal/a/site-master/general/organizational-details/logo/append'
export const ORGANIZATION_LOGO_REMOVAL_API_ROUTE = 'portal/a/site-master/general/organizational-details/logo/remove'
export const ORGANIZATION_DETAILS_UPDATE_API_ROUTE = 'portal/a/site-master/general/organizational-details/update'

// Product Management
export const PRODUCT_CHECK_API_ROUTE = 'portal/a/site-master/general/products/check'
export const PRODUCT_ADD_API_ROUTE = 'portal/a/site-master/general/products/create'
export const PRODUCT_LIST_API_ROUTE = 'portal/a/site-master/general/products/all'
export const PRODUCT_VIEW_API_ROUTE = 'portal/a/site-master/general/products'
export const PRODUCT_DECOMMISSION_API_ROUTE = 'portal/a/site-master/general/products/decommission'
export const PRODUCT_REINSTATE_API_ROUTE = 'portal/a/site-master/general/products/reinstate'
export const PRODUCT_B4_CHECK_API_ROUTE = 'portal/a/site-master/general/products/check-b4-update'
export const PRODUCT_UPDATE_API_ROUTE = 'portal/a/site-master/general/products/update'

// Company Groups
export const COMPANY_GROUP_LIST_API_ROUTE = 'portal/a/site-master/general/company-groups/all'
export const COMPANY_GROUP_CHECK_API_ROUTE = 'portal/a/site-master/general/company-groups/check'
export const COMPANY_GROUP_CREATE_API_ROUTE = 'portal/a/site-master/general/company-groups/create'
export const COMPANY_GROUP_VIEW_API_ROUTE = 'portal/a/site-master/general/company-groups' // uuid
export const COMPANY_GROUP_PRODUCTS_SUBSCRIBED_API_ROUTE = 'portal/a/site-master/general/company-groups/products/subscribed' // uuid
export const COMPANY_GROUP_ALL_PRODUCTS_API_ROUTE = 'portal/a/site-master/general/company-groups/products/active'
export const COMPANY_GROUP_SUBSCRIBE_TO_PRODUCT_API_ROUTE = 'portal/a/site-master/general/company-groups/products/subscribe'
export const COMPANY_GROUP_UNSUBSCRIBE_TO_PRODUCT_API_ROUTE = 'portal/a/site-master/general/company-groups/products/unsubscribe'
export const COMPANY_GROUP_CONTACT_LIST_API_ROUTE = 'portal/a/site-master/general/company-groups/point-of-contacts' // uuid
export const COMPANY_GROUP_CONTACT_ADD_API_ROUTE = 'portal/a/site-master/general/company-groups/point-of-contact/add'
export const COMPANY_GROUP_CONTACT_REMOVE_API_ROUTE = 'portal/a/site-master/general/company-groups/point-of-contact/delete'
export const COMPANY_GROUP_LOGO_APPEND_API_ROUTE = 'portal/a/site-master/general/company-groups/logo/append'
export const COMPANY_GROUP_LOGO_REMOVAL_API_ROUTE = 'portal/a/site-master/general/company-groups/logo/remove'
export const COMPANY_GROUP_CHECK_B4_API_ROUTE = 'portal/a/site-master/general/company-groups/check-b4-update'
export const COMPANY_GROUP_UPDATE_API_ROUTE = 'portal/a/site-master/general/company-groups/update'

// Authorization Team
export const AUTH_TEAM_CHECK_NAME_UPDATE_API_ROUTE = 'portal/a/site-master/security/auth-teams/check'
export const AUTH_TEAM_CREATE_UPDATE_API_ROUTE = 'portal/a/site-master/security/auth-teams/create'
export const AUTH_TEAM_DETAILS_API_ROUTE = 'portal/a/site-master/security/auth-teams' // uuid
export const AUTH_TEAM_CONFIGURE_ADMIN_RIGHTS_API_ROUTE = 'portal/a/site-master/security/auth-teams/rights/administrative/configure'
export const AUTH_TEAM_TICKET_RIGHTS_API_ROUTE = 'portal/a/site-master/security/auth-teams/rights/tickets' // uuid
export const AUTH_TEAM_CONFIGURE_TICKETS_RIGHTS_API_ROUTE = 'portal/a/site-master/security/auth-teams/rights/tickets/configure'

// Ticket Types
export const TICKET_TYPES_LIST_API_ROUTE = 'portal/a/site-master/tickets/types/all'
export const TICKET_TYPES_CHECK_API_ROUTE = 'portal/a/site-master/tickets/types/check'
export const TICKET_TYPES_CREATE_API_ROUTE = 'portal/a/site-master/tickets/types/create'
export const TICKET_TYPES_SUSPEND_API_ROUTE = 'portal/a/site-master/tickets/types/suspend'
export const TICKET_TYPES_REINSTATE_API_ROUTE = 'portal/a/site-master/tickets/types/reinstate'

// Ticket Features
export const TICKET_FEATURES_LIST_API_ROUTE = 'portal/a/site-master/features/tickets/all'
export const TICKET_FEATURES_CONFIGURE_API_ROUTE = 'portal/a/site-master/features/tickets/configure'

// Support Features
export const SUPPORT_FEATURES_LIST_API_ROUTE = 'portal/a/site-master/features/support/all'
export const SUPPORT_FEATURES_CONFIGURE_API_ROUTE = 'portal/a/site-master/features/support/configure'
export const SUPPORT_FEATURES_AGENT_API_ROUTE = 'portal/a/site-master/features/support/agents'
export const SUPPORT_FEATURES_CLIENT_API_ROUTE = 'portal/a/site-master/features/support/clients'
export const SUPPORT_FEATURES_CLIENT_ACCESS_API_ROUTE = 'portal/a/site-master/features/support/clients/client-access'
export const SUPPORT_FEATURES_COMPANY_PROFILE_API_ROUTE = 'portal/a/site-master/features/support/clients/company-profile'
export const SUPPORT_FEATURES_FIELD_AGENT_API_ROUTE = 'portal/a/site-master/features/support/agents/field-agent'
export const SUPPORT_FEATURES_ANNOUCEMENTS_API_ROUTE = 'portal/a/site-master/features/support/announcements'
export const SUPPORT_FEATURES_ANNOUCEMENTS_ENABLE_API_ROUTE = 'portal/a/site-master/features/support/announcements/enable'
export const SUPPORT_FEATURES_ESC_MATRIX_API_ROUTE = 'portal/a/site-master/features/support/escalation-matrix'
export const SUPPORT_FEATURES_ESC_MATRIX_ENABLE_API_ROUTE = 'portal/a/site-master/features/support/escalation-matrix/enable'
export const SUPPORT_FEATURES_ESC_MATRIX_CLIENT_API_ROUTE = 'portal/a/site-master/features/support/escalation-matrix/client'

// Ticket Statuses
export const TICKET_STATUS_SCRM_CAT_API_ROUTE = 'portal/a/site-master/tickets/status/scrum-categories'
export const TICKET_STATUS_LIST_API_ROUTE = 'portal/a/site-master/tickets/status/all'
export const TICKET_STATUS_CHECK_API_ROUTE = 'portal/a/site-master/tickets/status/check'
export const TICKET_STATUS_CREATE_API_ROUTE = 'portal/a/site-master/tickets/status/create'