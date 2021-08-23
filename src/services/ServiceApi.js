import axios from 'axios'
import ApiService from './ApiService'

export default function api() {
    const apiService = new ApiService()
    const api = axios.create({
        baseURL: apiService.domainOnly(),
        withCredentials: true
    })

    

    return api
}