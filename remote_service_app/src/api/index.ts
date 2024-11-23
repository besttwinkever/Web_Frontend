import { Api } from './Api'

export const api = new Api({
    baseURL: 'http://192.168.1.8:3000/api',
    withCredentials: true
})