// 推荐歌单
export const disc = state => state.disc

// 歌手列表
export const singer = state => state.singer

// 播放器
export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}

export const favoriteList = state => state.favoriteList

// 排行榜
export const topList = state => state.topList

// 搜索
export const searchHistory = state => state.searchHistory