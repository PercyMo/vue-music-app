import {mapGetters, mapMutations} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        }
    }
}

export const playerMixin = {
    computed: {
        iconMode() {
            const type = this.mode
            switch (type) {
                case playMode.sequence:
                    return 'icon-loop_all'
                    break
                case playMode.loop:
                    return 'icon-loop_single'
                    break
                case playMode.random:
                    return 'icon-random'
                    break
                default:
                    break
            }
        },
        ...mapGetters([
            'mode',
            'currentSong'
        ])
    },
    methods: {
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = []
            if (this.mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this._resetCurrentIndex(list)
            this.setPlayList(list)
        },
        _resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        ...mapMutations({
            setPlayMode: 'SET_PLAY_MODE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayList: 'SET_PLAYLIST'
        })
    }
}