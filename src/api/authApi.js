import axios from 'axios'

const baseUrl = 'http://localhost:3000'
const loginPath = '/login'
function generateAuthHeader(credentials){
    return `Basic ${window.btoa(`${credentials.username}:${credentials.password}`)}`
}
export async function login(credentials){
    return axios({
        url: loginPath,
        baseURL: baseUrl,
        method: 'GET',
        headers: {
            'Authorization': generateAuthHeader(credentials)
        }
    })
}
