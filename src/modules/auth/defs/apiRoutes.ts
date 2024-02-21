const prefix = '/auth';
const ApiRoutes = {
  Login: prefix + '/login',
  Register: prefix + '/register',
  Logout: prefix + '/logout',
  Verify: '/email/verify?expires={expires}&hash={hash}&id={id}&signature={signature}',
  RequestPasswordReset: prefix + '/request-password-reset',
  ResetPassword: prefix + '/reset-password',
  Me: prefix + '/me',
};

export default ApiRoutes;
