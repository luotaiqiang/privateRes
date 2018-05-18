import axios from 'axios'
import qs from 'qs'

let post = (url, data) => {
  return axios({
    method: 'post',
    url,
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
}

let get = (url, params) => {
  return axios({
    method: 'get',
    url,
    params
  })
}

export default {post, get}
