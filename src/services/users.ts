import { Api } from './api'

export interface User {
  gender: string
  name: Name
  id: Id
  email: string
  picture: Picture
  location: UserLocation
}

export interface UserApiResponse {
  results: User[]
}
interface UserLocation {
  city: string
}
interface Picture {
  large: string
  medium: string
  thumbnail: string
}
interface Name {
  first: string
  last: string
}
interface Id {
  name: string
  value: string
}

export const getUsers = (params?: object) => {
  return Api<UserApiResponse>('get', '', { ...params, results: 25 }, null)
}
