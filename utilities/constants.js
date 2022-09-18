let BASE_HOST_URL = 'https://test.eagleprocessingportal.com/';
if (process.browser && /.*localhost.*/.test(window.location.hostname)) {
    BASE_HOST_URL = 'https://localhost:44341/';
} else if (process.browser && /.*dev.*/.test(window.location.hostname)) {
    BASE_HOST_URL = 'http://dev.eagleprocessingportal.com/';
} else if (process.browser && /.*app.*/.test(window.location.hostname)) {
    BASE_HOST_URL = 'https://app.eagleprocessingportal.com/';
} else if (process.browser && /.*soar.*/.test(window.location.hostname)) {
    BASE_HOST_URL = 'https://soar.eagleprocessingportal.com/';
}
export { BASE_HOST_URL };

export const DASHBOARD_PAGE = '/';
export const VEHICLE_DETAILS_PAGE = '/cview/vehicle-details';
export const CARRIER_DETAILS_PAGE = '/cview/carrier-details';


export const WELCOME_PATH = '/';
export const TERMS_OF_SERVICE_PATH = '/terms-of-service';
export const PRIVACY_POLICY_PATH = '/privacy-policy';
export const SECURITY_RESET_PATH = '/security-reset';
export const PASSWORD_RESET_PATH = '/password-reset';
export const DASHBOARD_PATH = '/dashboard';
export const LOGIN_PATH = '/security/login';
export const PASSWORD_RESET_EMAIL_PATH = '/login';
export const MERCHANT_DETAIL_PATH = '/merchant/merchantdetail';
export const MERCHANT_SEARCH_PATH = '/merchant/merchantsearch';
export const ADMINISTRATOR_USER_PATH = '/administrator-user';

export const ISO_BREAKDOWN_DASHBOARD_PATH = '/eagle/dashboard/isolist';
export const ISO_MERCHANT_DASHBOARD_PATH = '/eagle/dashboard/merchantdashboard';

export const ISO_MERCHANT_BREAKDOWN_DASHBOARD_PATH = '/iso-merchant-breakdown-dashboard';

export const DAS_ISO_DASHBOARD_PATH = '/eagle/dashboard/isodashboard';
export const DAS_ISO_MERCHANT_LIST_COUNT_PATH = '/eagle/dashboard/iso-merchant-list-count';


export const MERCHANTS_LIST_PATH = '/:for/merchant/list/:status';

export const MERCHANT_PATH = '/merchant/';
export const MERCHANT_ADD_STEP_1_PATH = '/merchant/merchantadd/merchantaddstep1';
export const MERCHANT_ADD_STEP_2_PATH = '/merchant/merchantadd/merchantaddstep2';
export const MERCHANT_ADD_STEP_3_PATH = '/merchant/merchantadd/merchantaddstep3';
export const MERCHANT_ADD_STEP_4_PATH = '/merchant/merchantadd/merchantaddstep4';
export const MERCHANT_ADD_STEP_5_PATH = '/merchant/merchantadd/merchantaddstep5';

export const ISOPARAMETERS_PATH = '/isoparameters/';
export const ISOPARAMETERS_SEARCH_PATH = '/isoparameters/isoparameters-maintain/search';

export const MERCHANT_LIST_PATH = '/merchant/merchantlist';
export const MERCHANT_MAINTAIN_SEARCH_PATH = '/merchant/merchant-maintain/search';
export const MERCHANT_MAINTAIN_DETAIL_PATH = '/merchant/merchant-maintain/detail';
export const MERCHANT_MAINTAIN_USER_ADD_PATH = '/merchant/merchant-maintain/manage-user?add-user';


export const LEADS_PATH = '/leads/';
export const TICKETS_PATH = '/tickets/';
export const RESIDUALS_PATH = '/residuals/';
export const EQUIPMENT_ORDERS_PATH = '/equipment-orders/';
export const REPORTS_PATH = '/reports/';
export const SUPPORT_PATH = '/support/';

export const MY_PROFILE_PATH = '/my-profile/';
export const USER_LIST_PATH = '/user-management/list-users';
export const MY_INFO_PATH = '/my-profile/my-information';
export const MANAGE_USER_PATH = '/user-management/manage-user';
export const ADD_USER_PATH = '/user-management/manage-user?add-user';
export const MANAGE_ROLES_PATH = '/user-management/manage-roles';
export const MANAGE_PERMISSIONS_PATH = '/user-management/manage-permissions';
export const SECURITY_LOGS_PATH = '/user-management/security-logs';


export const ADMINISTRATOR_USER_LIST_PATH = '/administrator-user-list';
export const ADMINISTRATOR_USER_EDIT_PATH = '/administrator-user-edit';

export const ORGANIZATIONS_PATH = '/organization-management/';
export const LIST_ISOS_PATH = '/organization-management/list-isos';
export const LIST_SUB_ISOS_PATH = '/organization-management/list-subisos';
export const LIST_SALES_OFFICE_PATH = '/organization-management/list-sales-offices';
export const LIST_SALES_AGENTS_PATH = '/organization-management/list-sales-agents';


export const VIEW_ISOS_PATH = '/organization-management/view-iso';
export const VIEW_SUB_ISOS_PATH = '/organization-management/view-subiso';
export const VIEW_SALES_OFFICE_PATH = '/organization-management/view-sales-office';
export const VIEW_SALES_AGENT_PATH = '/organization-management/view-sales-agent';

export const MERCHANT_RISK_DETAIL_PATH = '/merchant/risk-detail';
export const EAGLE_RISK_DETAIL_PATH = '/eagle/risk-detail';
export const ISO_RISK_DETAIL_PATH = '/iso/risk-detail';

export const RISK_HISTORY_13_MONTH_PATH = '/risk/history/13-month-history';
export const MERCHANT_RESERVE_PATH = '/risk/merchant-reserve/merchant-reserve';

export const MERCHANT_MAINTAIN_USER_LIST_PATH = '/merchant/merchant-maintain/list-users';
export const MERCHANT_MAINTAIN_USER_PATH = '/merchant/merchant-maintain/manage-user';
export const MERCHANT_ADD_USER_PATH = '/merchant/merchant-maintain/manage-user?add-user';


export const ITEM_TYPES = { ISO: 'ISO', SUB_ISO: 'SUB_ISO', SALES_OFFICE: 'SALES_OFFICE', SALES_AGENT: 'SALES_AGENT' }