import { commonParams, options } from './config'
import axios from 'axios'

export function getLyric(mid) {
    const url = '/api/getLyric'

    const data = Object.assign({}, commonParams, {
        pcachetime: +new Date(),
        songmid: mid,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        format: 'jsonp'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}