import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id,
        this.mid = mid,
        this.singer = singer,
        this.name = name,
        this.album = album,
        this.duration = duration,
        this.image = image,
        this.url = url
    }

    // 此处的 Promise 机制还不理解，日后细看
    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }

        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
        url: 'http://dl.stream.qqmusic.qq.com/C400000ryYx71hFmdF.m4a?vkey=52A2F0D14EE1C0EFBC8620A272790F2E0DED3D022E39F77D06719AD7FE5567CDBACBA2F4550F14B6351B6C385EB93ADE943A7AB90AB36554&guid=5603704467&uin=1418968663&fromtag=66'
    })
}

function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}