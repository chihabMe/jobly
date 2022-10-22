
export const API = process.env.API
//
export const accessTokenAge = 60*60*60
export const refreshTokenAge = 60*60*60*24*35
//api endpoints
export const registrationsEndpoint = API+"api/v1/accounts/registration/"
export const loginEndpoint = API+"api/v1/accounts/token/"
//token
export const verifyEndpoint = API+"api/v1/accounts/token/verify/"
export const refreshEndpoint = API+"api/v1/accounts/token/refresh/"
//user
export const currentUserEndpoint = API+"api/v1/accounts/me/"

//locations
export const locationsEndpoint = API+"api/v1/locations"