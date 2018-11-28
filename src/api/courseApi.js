import axios from 'axios'

const baseUrl = 'http://localhost:3031'
const coursesPath = '/api/v1/courses'

export async function getCourses(header, options){
    return axios({
        url: coursesPath,
        baseURL: baseUrl,
        method: 'GET',
        params: options,
        headers: {
            'Authorization': header
        }
    }).then(res => res.data)
}
export async function getCourseById(header, options){
    return axios({
        url: `${coursesPath}/${options.id}`,
        baseURL: baseUrl,
        method: 'GET',
        params: options,
        headers: {
            'Authorization': header
        }
    }).then(res => res.data[0])
}
