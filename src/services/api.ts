import axios from 'axios'

export async function Api<T>(
  method: string,
  url: string,
  params: object | null,
  body: object | null
) {
  return await axios.request<T>({
    method,
    url: url,
    baseURL: 'https://randomuser.me/api/',
    params: { inc: 'gender,name,email,id,picture,location', exc: 'login', ...params },
    data: body
  })
}
