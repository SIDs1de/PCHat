export interface IAccessToken {
  access_token: string
}

export interface ISignInRequest {
  login: string
  password: string
}

export interface ISignUpRequest {
  name: string
  login: string
  password: string
}

export interface IId {
  id: number
}

export interface ILogOutResponse {
  status: string
}

export interface IUser {
  id: number | null
  name: string
  login: string
  accessToken: string
}
