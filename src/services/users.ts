import { Api } from './api'

export interface User {
  gender: string
  name: Name
  id: Id
}

interface UserApiResponse {
  results: User[]
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
