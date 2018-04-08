import axios from 'axios'
import { API_PROJECTS } from '../constants/apiUrls'


export const fetchProjectsData = (cb) => {
    axios({
        method: 'GET',
        url: API_PROJECTS,
    }).then(response => {
        cb(response.data)
    }).catch(error => {
        console.log(error)
    })
}
