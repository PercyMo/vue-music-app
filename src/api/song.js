import { commonParams, options } from './config'
import axios from 'axios'
import jsonp from 'common/js/jsonp'

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

export function getVkey(songmid) {
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

    const data = Object.assign({}, commonParams, {
        format: 'json',
        loginUin: 1418968663,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 1418968663,
        songmid: songmid,
        filename: `C400${songmid}.m4a`,
        guid: _getGuid()
    })

    return jsonp(url, data, options)
}

var _guid = ""
function _getGuid() {
    if (_guid.length > 0) return _guid
    var t = (new Date).getUTCMilliseconds()
    return _guid = Math.round(2147483647 * Math.random()) * t % 1e10
}