import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Recommend from 'components/recommend/recommend'
import Disc from 'components/disc/disc'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend' //首屏重定向
        },
        {
            path: '/recommend',
            component: Recommend,
            children: [
                {
                    path: ':id',
                    component: Disc
                }
            ]
        },
        {
            path: '/singer',
            component: Singer
        },
        {
            path: '/rank',
            component: Rank
        },
        {
            path: '/search',
            component: Search
        },
    ]
})