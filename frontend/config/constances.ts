export const API = process.env.API ?? "http://127.0.0.1:8000/";
//
export const accessTokenAge = 60 * 60 * 60;
export const refreshTokenAge = 60 * 60 * 60 * 24 * 35;
//api endpoints
// export const registrationsEndpoint = API + "api/v1/accounts/registration/";
// export const loginEndpoint = API + "api/v1/accounts/token/";

export const registrationsEndpoint = API + "api/v1/auth/users/";
export const loginEndpoint = API + "api/v1/auth/jwt/create/";
//token
// export const verifyEndpoint = API + "api/v1/accounts/token/verify/";
// export const refreshEndpoint = API + "api/v1/accounts/token/refresh/";
export const verifyEndpoint = API + "api/v1/auth/jwt/verify/";
export const refreshEndpoint = API + "api/v1/auth/jwt/refresh/";
//user
// export const currentUserEndpoint = API + "api/v1/accounts/me/";
export const currentUserEndpoint = API + "api/v1/auth/users/me/";
export const currentUserProfileEndpoint = API + "api/v1/accounts/profile/";

//locations
export const locationsEndpoint = API + "api/v1/locations";
//job
export const jobDetailEndpoint = API + "api/v1/jobs/"; //+slug
export const jobSearchEndpoint = API + "api/v1/jobs/"; //+queries

//profile
export const companyEndpoint = API + "api/v1/accounts/company/"; //+returns company open jobs
//reviews
export const companyReviewsEndpoint = API + "api/v1/reviews/company/"; //+returns company reviews
export const companyReviewEndpoint = API + "api/v1/reviews/company/"; //+returns company review
//
export const userTypeChangeEndpoint =
  API + "api/v1/accounts/profile/type/change/"; //+ change the user type
export const userPasswordChangeEndpoint =
  API + "api/v1/auth/users/set_password/"; //+ change the user password
