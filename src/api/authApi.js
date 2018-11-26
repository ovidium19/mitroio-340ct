import axios from 'axios'

const baseUrl = 'http://localhost:3030'
const loginPath = '/api/v1/users/login'
function generateAuthHeader(credentials){
    return `Basic ${window.btoa(`${credentials.username}:${credentials.password}`)}`
}
export async function login(credentials){
    let header = generateAuthHeader(credentials)
    return axios({
        url: loginPath,
        baseURL: baseUrl,
        method: 'GET',
        headers: {
            'Authorization': generateAuthHeader(credentials)
        }
    }).then(res => {
        return Object.assign({},res.data,{header})
    })
}
