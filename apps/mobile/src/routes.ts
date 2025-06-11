export const FLOWS = {
  authFlow: 'AuthFlow',
  tenantFlow: 'TenantFlow',
}

const AUTH_ROUTES = {
  login: 'Login',
  register: 'Register',
  verifyEmail: 'VerifyEmail',
  forgotPassword: 'ForgotPassword',
  resetPassword: 'ResetPassword',
}

const TENANT_ROUTES = {
  tenantHome: 'TenantHome',
  tenantExplore: 'TenantExplore',
  tenantSearch: 'TenantSearch',
  tenantPropertyDetail: 'TenantPropertyDetail'
}

export const ROUTES = {
  onboarding: 'Onboarding',
  ...AUTH_ROUTES,
  ...TENANT_ROUTES,
}
